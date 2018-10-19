import { wp_api_endpoint } from "../config";
import axios from "axios";
import _ from "lodash";

async function getResults(category) {
	let posts = await axios.get(`${wp_api_endpoint}/wp/v2/posts`, {
		timeout: 6000,
		params: { categories: category, per_page: 8 }
	});

	let tags = _.map(posts.data, async post => {
		if (post.tags.length === 1) {
			return {
				id: post.id,
				tag: await axios.get(`${wp_api_endpoint}/wp/v2/tags/${post.tags[0]}`, {
					timeout: 6000
				})
			};
		} else {
			return { id: post.id, tag: false };
		}
	});

	tags = await axios.all(tags);

	for (let tag of tags) {
		if (tag.tag === false) {
			let index = _.findIndex(posts.data, { id: tag.id });
			posts.data[index].tag = tag.tag;
		} else {
			let index = _.findIndex(posts.data, { id: tag.id });
			posts.data[index].tag = tag.tag.data.name;
		}
	}
	posts = _.map(posts.data, post =>
		_.pick(post, ["id", "title", "date", "tag", "better_featured_image"])
	);
	return posts;
}

export default getResults;
