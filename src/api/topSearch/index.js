import { wp_api_endpoint, wp_news_category, wp_ads_category } from "../config";
import axios from "axios";

async function getResults(query) {
	let results = await axios.get(`${wp_api_endpoint}/wp/v2/posts`, { timeout: 2000, params: { search: query, categories: [wp_news_category, wp_ads_category] } });
	return results.data;
}

export default getResults;