import searchSchedule from "../../../api/scheduleSearch";

const scheduleSearch = {
	namespaced: true,
	state: {
		open: false,
		loading: false,
		error: false,
		message: "",
		type: "group",
		query: "",
		results: []
	},
	mutations: {
		openSearch(store) {
			store.open = true;
		},
		closeSearch(store) {
			store.open = false;
		},
		startSearch(store) {
			store.loading = true;
		},
		changeSearchType(store, type) {
			store.type = type;
			store.query = "";
			store.results = [];
		},
		saveSearchQuery(store, query) {
			store.query = query;
		},
		saveSearchResults(store, results) {
			store.loading = false;
			store.results = results;
		},
		showError(store, message) {
			store.loading = false;
			store.error = true;
			store.message = message;
		},
		hideError(store) {
			store.error = false;
		}
	},
	actions: {
		async searchSchedule(store, query) {
			try {
				store.commit("startSearch");
				store.commit("saveSearchQuery", query);
				let results = await searchSchedule(store.state.type, store.state.query);
				store.commit("saveSearchResults", results);
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", "Сервис поиска недоступен");
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

export default scheduleSearch;