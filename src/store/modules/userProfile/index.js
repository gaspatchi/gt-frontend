import { getDispatch, updateProfile, postDispatch } from "../../../api/userProfile";

const userProfile = {
	namespaced: true,
	state: {
		loading: false,
		error: false,
		screen: "settings",
		message: "",
		type: "error",
		dispatch: {
			email: false,
			sms: false
		}
	},
	mutations: {
		changeScreen(store, screen) {
			store.screen = screen;
		},
		startFetch(store) {
			store.loading = true;
			store.error = false;
			store.message = "";
		},
		saveDispatch(store, payload) {
			store.loading = false;
			store.dispatch.email = payload.email;
			store.dispatch.sms = payload.sms;
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
		async getDispatch(store) {
			try {
				store.commit("startFetch");
				let result = await getDispatch(store.rootState.rightMenu.authorization.token);
				store.commit("saveDispatch", result);
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", { type: "error", message: "Сервис подписок недоступен" });
					store.dispatch("hideError", 5000);
				} else {
					store.commit("showError", { type: "error", message: error.response.data.message });
					store.dispatch("hideError", 5000);
				}
			}
		},
		async updateProfile(store, payload) {
			try {
				store.commit("startFetch");
				let result = await updateProfile(store.rootState.rightMenu.authorization.token, payload);
				store.dispatch("rightMenu/getUserProfile", store.rootState.rightMenu.authorization.token, { root: true });
				store.commit("showError", { type: "success", message: result });
				store.dispatch("hideError", 5000);
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", { type: "error", message: "Сервис профиля недоступен" });
					store.dispatch("hideError", 5000);
				} else {
					store.commit("showError", { type: "error", message: error.response.data.message });
					store.dispatch("hideError", 5000);
				}
			}
		},
		async postDispatch(store, payload) {
			try {
				store.commit("startFetch");
				let result = await postDispatch(store.rootState.rightMenu.authorization.token, payload);
				store.dispatch("getDispatch");
				store.commit("showError", { type: "success", message: result });
				store.dispatch("hideError", 5000);
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", { type: "error", message: "Сервис подписок недоступен" });
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

export default userProfile;