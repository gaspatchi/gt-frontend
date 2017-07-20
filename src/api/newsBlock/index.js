import { wp_api_endpoint } from "../config";
import axios from "axios";

async function getResults(category) {
	let items = [];
	let posts = await axios.get(`${wp_api_endpoint}/wp/v2/posts`, { timeout: 3000, params: { categories: category, per_page: 8 } });
	for (let post in posts.data) {
		if (posts.data[post].featured_media !== 0) {
			let image = await axios.get(`${wp_api_endpoint}/wp/v2/media/${posts.data[post].featured_media}`, { timeout: 3000 });
			posts.data[post].hasImage = true;
			posts.data[post].image = image.data.source_url;
		} else {
			posts.data[post].hasImage = false;
		}
		if (posts.data[post].tags.length === 1) {
			let tag = await axios.get(`${wp_api_endpoint}/wp/v2/tags/${posts.data[post].tags[0]}`, { timeout: 3000 });
			posts.data[post].tag = tag.data.name;
		} else {
			posts.data[post].tag = false;
		}
		items.push(posts.data[post]);
	}
	return items;
}

export default getResults;