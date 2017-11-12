import { wp_api_endpoint } from "../config";
import axios from "axios";
import _ from "lodash";

async function getResults(category) {
	let posts = await axios.get(`${wp_api_endpoint}/wp/v2/posts`, { timeout: 6000, params: { categories: category, per_page: 8 } });

	let tags = _.map(posts.data, async (post) => {
		if (post.tags.length === 1) {
			return { id: post.id, tag: await axios.get(`${wp_api_endpoint}/wp/v2/tags/${post.tags[0]}`, { timeout: 6000 }) };
		} else {
			return { id: post.id, tag: false };
		}
	});

	let images = _.map(posts.data, async (post) => {
		if (post.featured_media !== 0) {
			return { id: post.id, image: await axios.get(`${wp_api_endpoint}/wp/v2/media/${post.featured_media}`, { timeout: 6000 }) };
		} else {
			return { id: post.id, image: false };
		}
	});

	tags = await axios.all(tags);
	images = await axios.all(images);

	for (let tag of tags) {
		if (tag.tag === false) {
			let index = _.findIndex(posts.data, { "id": tag.id });
			posts.data[index].tag = tag.tag;
		} else {
			let index = _.findIndex(posts.data, { "id": tag.id });
			posts.data[index].tag = tag.tag.data.name;
		}
	}

	for (let image of images) {
		if (image.image === false) {
			let index = _.findIndex(posts.data, { "id": image.id });
			posts.data[index].hasImage = false;
			posts.data[index].image = image.image;
		} else {
			let index = _.findIndex(posts.data, { "id": image.id });
			posts.data[index].hasImage = true;
			posts.data[index].image = image.image.data.source_url;
		}
	}

	return posts.data;
}

export default getResults;