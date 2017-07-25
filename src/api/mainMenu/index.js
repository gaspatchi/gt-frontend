import { wp_api_endpoint, wp_menu_id } from "../config";
import axios from "axios";

async function getLinks() {
	let links = await axios.get(`${wp_api_endpoint}/wp-api-menus/v2/menus/${wp_menu_id}`, { timeout: 2000 });
	return links.data.items;
}

export default getLinks;