import { usver_api_endpoint, sucriber_api_endpoint } from "../config";
import axios from "axios";

export async function updateProfile(token, profile) {
	let result = await axios.patch(`${usver_api_endpoint}/`, profile, {
		timeout: 6000,
		headers: { Authorization: `Bearer ${token}` }
	});
	return result.data.message;
}

export async function getDispatch(token) {
	let result = await axios.get(`${sucriber_api_endpoint}/dispatch`, {
		timeout: 6000,
		headers: { Authorization: `Bearer ${token}` },
		responseType: "json"
	});
	return result.data;
}

export async function postDispatch(token, payload) {
	let result = await axios.post(`${sucriber_api_endpoint}/dispatch`, payload, {
		timeout: 6000,
		headers: { Authorization: `Bearer ${token}` },
		responseType: "json"
	});
	return result.data.message;
}