import getResults from "../../../api/topSearch";

const topSearch = {
	namespaced: true,
	state: {
		loading: false,
		error: false,
		open: false,
		type: "posts",
		query: "",
		results: []
	},
	mutations: {
		openSearchMenu(store) {
			store.open = true;
		},
		closeSearchMenu(store) {
			store.open = false;
		},
		startFetch(store) {
			store.error = false;
			store.loading = true;
		},
		saveSearchResults(store, results) {
			store.loading = false;
			store.results = results;
		},
		changeSearchType(store, type) {
			store.type = type;
			store.query = "";
			store.results = [];
		},
		saveQuery(store, query) {
			store.query = query;
			store.results = [];			
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
				let results = await getResults(query, store.state.type);
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