import getResults from "../../../api/newsBlock/";

const newsBlock = {
	namespaced: true,
	state: {
		loading: false,
		error: false,
		section: "news",
		items: []
	},
	mutations: {
		startFetch(store) {
			store.loading = true;
			store.items = [];
		},
		throwError(store) {
			store.error = true;
			store.loading = false;
		},
		hideError(store) {
			store.error = false;
		},
		saveItems(store, items) {
			store.error = false;
			store.loading = false;
			store.items = items;
		},
		changeSection(store, section) {
			store.section = section;
		}
	},
	actions: {
		async fetchAds(store, category) {
			try {
				store.commit("startFetch");
				let items = await getResults(category);
				store.commit("saveItems", items);
			} catch (error) {
				store.commit("throwError");
				store.dispatch("hideError");
			}
		},
		hideError(store) {
			setTimeout(() => store.commit("hideError"), 5000);
		}
	}
};

export default newsBlock;