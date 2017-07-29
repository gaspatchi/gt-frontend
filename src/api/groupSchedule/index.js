import { schedler_api_endpoint, inforer_api_endpoint, sucriber_api_endpoint } from "../config";
import axios from "axios";

export async function getGroupInfo(group_id) {
	let info = await axios.get(`${inforer_api_endpoint}/group/${group_id}`, { timeout: 3000 });
	return info.data.result.group;
}

export async function getScheduleDates(group_id) {
	let dates = await axios.get(`${schedler_api_endpoint}/group/${group_id}/dates`, { timeout: 3000 });
	return dates.data.dates;
}

export async function getGroupSchedule(group_id, date) {
	let schedule = await axios.get(`${schedler_api_endpoint}/group/${group_id}/${date}`, { timeout: 3000 });
	return schedule.data.schedule;
}

export async function addUserSubscription(token, payload) {
	let result = await axios.post(`${sucriber_api_endpoint}/schedule`, payload, {
		timeout: 3000,
		headers: { Authorization: `Bearer ${token}` }
	});
	return result.data;
}

export async function deleteUserSubscription(token, payload) {
	let result = await axios.delete(`${sucriber_api_endpoint}/schedule`, {
		data: payload,
		timeout: 3000,
		headers: { Authorization: `Bearer ${token}` }
	});
	return result.data;
}