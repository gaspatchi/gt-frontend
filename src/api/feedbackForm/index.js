import { feedbacker_api_endpoint } from "../config";
import axios from "axios";

export async function getFeedbackCount() {
	let info = await axios.get(`${feedbacker_api_endpoint}/count/feedback`, { timeout: 6000 });
	return info.data.count;
}

export async function postFeedbackForm(form) {
	let result = await axios.post(`${feedbacker_api_endpoint}/create`, {
		type: "feedback",
		firstname: form.firstname,
		lastname: form.lastname,
		number: form.number,
		email: form.email,
		text: form.text
	}, { timeout: 6000 });
	return result.data.id;
}