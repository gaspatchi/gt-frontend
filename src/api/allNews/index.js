import { wp_api_endpoint, wp_slider_category } from "../config";
import _ from "lodash";
import axios from "axios";

export async function getPosts(category, page) {
	let posts = await axios.get(`${wp_api_endpoint}/wp/v2/posts`, {
		timeout: 6000,
		params: { categories: category, page: page }
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

	let pages = Number(posts.headers["x-wp-totalpages"]);
	posts = _.map(posts.data, post =>
		_.pick(post, [
			"id",
			"date",
			"title",
			"excerpt",
			"tag",
			"better_featured_image"
		])
	);

	return { pages: pages, page: Number(page), posts: posts };
}

export async function getCategories() {
	let categories = await axios.get(`${wp_api_endpoint}/wp/v2/categories`, {
		timeout: 6000,
		params: { exclude: wp_slider_category }
	});
	categories = _.map(categories.data, category =>
		_.pick(category, ["id", "name"])
	);
	return categories;
}
