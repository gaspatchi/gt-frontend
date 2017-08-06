import verifyToken from "../../../api/verificationBlock";

const verificationBlock = {
	namespaced: true,
	state: {
		loading: false,
		error: false,
		status: null,
		type: "",
		message: ""
	},
	mutations: {
		startFetch(store) {
			store.loading = true;
			store.error = false;
			store.message = "";
		},
		saveVerification(store, status) {
			store.loading = false;
			store.status = status;
		},
		showError(store, payload) {
			store.loading = false;
			store.error = true;
			store.message = payload.message;
			store.type = payload.type;
		},
		hideError(store) {
			store.error = false;
		}
	},
	actions: {
		async verifyToken(store, token) {
			try {
				store.commit("startFetch");
				let result = await verifyToken(token);
				store.commit("saveVerification", true);
				store.commit("showError", { type: "success", message: result });
				store.dispatch("hideError", 5000);
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", { type: "error", message: "Сервис верификации недоступен" });
					store.dispatch("hideError", 5000);
				} else if (error.response.status === 404) {
					store.commit("saveVerification", false);
					store.commit("showError", { type: "error", message: error.response.data.message });
					store.dispatch("hideError", 5000);
				} else {
					store.commit("showError", { type: "error", message: error.response.data.message });
					store.dispatch("hideError", 5000);
				}
			}
		},
		hideError(store, time) {
			setTimeout(() => store.commit("hideError"), time);
		}
	}
};

export default verificationBlock;