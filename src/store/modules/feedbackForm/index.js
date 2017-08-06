import { getFeedbackCount, postFeedbackForm } from "../../../api/feedbackForm";

const feedbackForm = {
	namespaced: true,
	state: {
		loading: false,
		error: false,
		message: "",
		count: 0,
		success: false,
		id: null
	},
	mutations: {
		startFetch(store) {
			store.loading = true;
			store.error = false;
			store.message = "";
		},
		saveCount(store, count) {
			store.loading = false;
			store.count = count;
		},
		saveResult(store, id) {
			store.loading = false;
			store.success = true;
			store.id = id;
		},
		showError(store, message) {
			store.loading = false;
			store.error = true;
			store.message = message;
		},
		hideError(store) {
			store.error = false;
		},
		hideSuccess(store) {
			store.success = false;
			store.id = null;
		}
	},
	actions: {
		async getFeedbackCount(store) {
			try {
				store.commit("startFetch");
				let count = await getFeedbackCount();
				store.commit("saveCount", count);
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", "Сервис обратной связи недоступен");
					store.dispatch("hideError", 5000);
				} else {
					store.commit("showError", error.response.data.message);
					store.dispatch("hideError", 5000);
				}
			}
		},
		async postFeedbackForm(store, form) {
			try {
				store.commit("startFetch");
				let id = await postFeedbackForm(form);
				store.commit("saveResult", id);
				store.dispatch("hideSuccess", 8000);
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", "Сервис обратной связи недоступен");
					store.dispatch("hideError", 5000);
				} else {
					store.commit("showError", error.response.data.message);
					store.dispatch("hideError", 5000);
				}
			}
		},
		hideError(store, time) {
			setTimeout(() => store.commit("hideError"), time);
		},
		hideSuccess(store, time) {
			setTimeout(() => store.commit("hideSuccess"), time);
		}
	}
};

export default feedbackForm;