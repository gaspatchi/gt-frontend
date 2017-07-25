import { usver_api_endpoint, sucriber_api_endpoint, schedler_api_endpoint } from "../config";
import axios from "axios";

export async function loginUser(loginData) {
	let result = await axios.post(`${usver_api_endpoint}/login`, loginData, { timeout: 3000 });
	return result;
}

export async function resetPassword(resetData) {
	let result = await axios.post(`${usver_api_endpoint}/reset`, resetData, { timeout: 3000 });
	return result;
}

export async function registerUser(registrationData) {
	let result = await axios.post(`${usver_api_endpoint}/register`, registrationData, { timeout: 3000 });
	return result;
}

export async function getUserProfile(token) {
	let result = await axios.get(`${usver_api_endpoint}/`, {
		timeout: 3000,
		headers: { Authorization: `Bearer ${token}` }
	});
	return result;
}

export async function getUserSubscriptions(token) {
	let result = await axios.get(`${sucriber_api_endpoint}/schedule`, {
		timeout: 3000,
		headers: { Authorization: `Bearer ${token}` }
	});
	return result;
}

export async function getGroupSchedule(group_id) {
	let result = await axios.get(`${schedler_api_endpoint}/group/${group_id}`, { timeout: 3000 });
	return result;
}

export async function getTeacherSchedule(teacher_id) {
	let result = await axios.get(`${schedler_api_endpoint}/teacher/${teacher_id}`, { timeout: 3000 });
	return result;
}