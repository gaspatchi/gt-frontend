import { getPosts, getCategories } from "../../../api/allNews/";

const allNews = {
	namespaced: true,
	state: {
		loading: false,
		error: false,
		message: "",
		category: 1,
		pages: 1,
		page: 1,
		posts: [],
		categories: []
	},
	mutations: {
		startFetch(store) {
			store.error = false;
			store.loading = true;
			store.posts = [];
		},
		showError(store, message) {
			store.loading = false;
			store.error = true;
			store.message = message;
		},
		hideError(store) {
			store.error = false;
			store.message = "";
		},
		savePosts(store, posts) {
			store.loading = false;
			store.pages = posts.pages;
			store.page = posts.page;
			store.posts = posts.posts;
		},
		saveCategories(store, categories) {
			store.loading = false;
			store.categories = categories;
		},
		changeCategory(store, category) {
			store.category = category;
		}
	},
	actions: {
		async getPosts(store, page) {
			try {
				store.commit("startFetch");
				let posts = await getPosts(store.state.category, page);
				store.dispatch("getCategories", );
				store.commit("savePosts", posts);
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", "Невозможно получить список новостей");
					store.dispatch("hideError", 5000);
				} else {
					store.commit("showError", error.response.data.message);
					store.dispatch("hideError", 5000);
				}
			}
		},
		async getCategories(store) {
			try {
				let categories = await getCategories();
				store.commit("saveCategories", categories);
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", "Невозможно получить список категорий");
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

export default allNews;