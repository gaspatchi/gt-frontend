import { inforer_api_endpoint } from "../config";
import axios from "axios";

async function getCabinetInfo(cabinet_id) {
	let info = await axios.get(`${inforer_api_endpoint}/cabinet/${cabinet_id}`, { timeout: 3000 });
	return info.data.result;
}

export default getCabinetInfo;