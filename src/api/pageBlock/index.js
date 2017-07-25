import { wp_api_endpoint } from "../config";
import axios from "axios";
import _ from "lodash";

export async function getPage(page_id) {
	let post = await axios.get(`${wp_api_endpoint}/wp/v2/pages/${page_id}`, { timeout: 3000 });
	post = _.pick(post.data, ["id", "date", "title", "content"]);
	return post;
}

export default getPage;