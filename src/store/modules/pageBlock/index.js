import getPage from "../../../api/pageBlock/";

const pageBlock = {
	namespaced: true,
	state: {
		loading: false,
		error: false,
		message: "",
		page: {}
	},
	mutations: {
		startFetch(store) {
			store.loading = true;
			store.error = false;
			store.message = "";
			store.page = {};
		},
		savePage(store, page) {
			store.loading = false;
			store.page = page;
		},
		showError(store, message) {
			store.loading = false;
			store.error = true;
			store.message = message;
		},
		hideError(store) {
			store.error = false;
		},
	},
	actions: {
		async getPage(store, page_id) {
			try {
				store.commit("startFetch");
				let page = await getPage(page_id);
				store.commit("savePage", page);
			} catch (error) {
				if (!error.response) {
					store.commit("showError", "Не удаётся получить страницу");
					store.dispatch("hideError", 5000);
				} else {
					store.commit("showError", error.response.data.message);
					store.dispatch("hideError", 5000);
				}
			}
		},
		hideError(store, time) {
			setTimeout(() => store.commit("hideError"), time);
		}
	}
};

export default pageBlock;
