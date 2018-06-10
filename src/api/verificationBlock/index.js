import { usver_api_endpoint } from "../config";
import axios from "axios";

async function verifyToken(token) {
	let result = await axios.get(`${usver_api_endpoint}/verification/${token}`, { timeout: 6000 });
	return result.data.message;
}

export default verifyToken;