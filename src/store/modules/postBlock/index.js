import { getPost, getlastPosts } from "../../../api/postBlock/";

const postBlock = {
	namespaced: true,
	state: {
		loading: false,
		error: false,
		message: false,
		category: null,
		post: {},
		posts: []
	},
	mutations: {
		startFetch(store) {
			store.loading = true;
			store.error = false;
			store.message = "";
			store.post = {};
			store.posts = [];
		},
		savePost(store, post) {
			store.loading = false;
			store.category = post.categories[0];
			store.post = post;
		},
		savePosts(store, posts) {
			store.posts = posts;
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
		async getPost(store, post_id) {
			try {
				store.commit("startFetch");
				let post = await getPost(post_id);
				store.commit("savePost", post);
				store.dispatch("getPosts");
			} catch (error) {
				if (!error.response) {
					store.commit("showError", "Не удаётся получить запись");
					store.dispatch("hideError", 5000);
				} else {
					store.commit("showError", error.response.data.message);
					store.dispatch("hideError", 5000);
				}
			}
		},
		async getPosts(store) {
			try {
				let posts = await getlastPosts(store.state.category);
				store.commit("savePosts", posts);
			} catch (error) {
				if (!error.response) {
					store.commit("showError", "Не удаётся получить последние записи");
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

export default postBlock;