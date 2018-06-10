import { inforer_api_endpoint } from "../config";
import axios from "axios";

export async function searchSchedule(type, query) {
	let results = await axios.post(`${inforer_api_endpoint}/${type}/find`, { query }, { timeout: 6000 });
	return results.data.result;
}

export default searchSchedule;