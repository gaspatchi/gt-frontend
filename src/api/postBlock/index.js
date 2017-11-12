import { wp_api_endpoint } from "../config";
import axios from "axios";
import _ from "lodash";

export async function getPost(post_id) {
	let post = await axios.get(`${wp_api_endpoint}/wp/v2/posts/${post_id}`, { timeout: 6000 });
	post = _.pick(post.data, ["id", "date", "title", "content", "excerpt", "categories"]);
	return post;
}

export async function getlastPosts(category) {
	let posts = await axios.get(`${wp_api_endpoint}/wp/v2/posts`, { timeout: 6000, params: { categories: category, per_page: 4 } });
	posts = _.map(posts.data, (post) => _.pick(post, ["id", "title", "excerpt"]));
	return posts;
}