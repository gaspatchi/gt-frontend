import { wp_api_endpoint, wp_slider_category } from "../config";
import _ from "lodash";
import axios from "axios";

export async function getPosts(category, page) {
	let posts = await axios.get(`${wp_api_endpoint}/wp/v2/posts`, { timeout: 6000, params: { categories: category, page: page } });

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
			posts.data[index].image = image.image;
		} else {
			let index = _.findIndex(posts.data, { "id": image.id });
			posts.data[index].image = image.image.data.source_url;
		}
	}
	let pages = Number(posts.headers["x-wp-totalpages"]);
	posts = _.map(posts.data, (post) => _.pick(post, ["id", "date", "title", "excerpt", "tag","image"]));

	return { pages: pages, page: Number(page), posts: posts };
}

export async function getCategories() {
	let categories = await axios.get(`${wp_api_endpoint}/wp/v2/categories`, { timeout: 6000, params: { exclude: wp_slider_category } });
	categories = _.map(categories.data, (category) => _.pick(category, ["id", "name"]));
	return categories;
}