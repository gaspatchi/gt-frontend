import { wp_api_endpoint } from "../config";
import axios from "axios";

async function getResults(query) {
	let results = await axios.get(`${wp_api_endpoint}/wp/v2/posts`, { timeout: 2000, params: { search: query, categories: [1, 14] } });
	return results.data;
}

export default getResults;