import { wp_api_endpoint, wp_news_category, wp_ads_category } from "../config";
import axios from "axios";

async function getResults(query, type) {
	if (type === "posts") {
		let results = await axios.get(`${wp_api_endpoint}/wp/v2/posts`, { timeout: 6000, params: { search: query, categories: [wp_news_category, wp_ads_category] } });
		return results.data;
	} else {
		let results = await axios.get(`${wp_api_endpoint}/wp/v2/pages`, { timeout: 6000, params: { search: query, orderby: "relevance" } });
		return results.data;
	}
}

export default getResults;