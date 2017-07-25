import getResults from "../../../api/topSearch";

const topSearch = {
	namespaced: true,
	state: {
		loading: false,
		error: false,
		open: false,
		query: "",
		results: []
	},
	mutations: {
		toggleSearchMenu(store) {
			store.open = !store.open;
		},
		startFetch(store) {
			store.error = false;
			store.loading = true;
		},
		saveSearchResults(store, results) {
			store.loading = false;
			store.results = results;
		},
		saveQuery(store, query) {
			store.query = query;
		},
		showError(store) {
			store.loading = false;
			store.error = true;
		},
		hideError(store) {
			store.error = false;
		}
	},
	actions: {
		async searchItems(store, query) {
			try {
				store.commit("saveQuery", query);
				store.commit("startFetch");
				let results = await getResults(query);
				store.commit("saveSearchResults", results);
			} catch (error) {
				store.commit("showError");
				store.dispatch("hideError", 2500);
			}
		},
		hideError(store, time) {
			setTimeout(() => store.commit("hideError"), time);
		}
	}
};

export default topSearch;