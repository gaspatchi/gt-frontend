import { schedler_api_endpoint } from "../config";
import axios from "axios";

async function getGroups() {
	let groups = await axios.get(`${schedler_api_endpoint}/groups`, { timeout: 6000 });
	return groups.data.groups;
}

export default getGroups;