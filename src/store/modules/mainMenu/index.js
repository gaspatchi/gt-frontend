import getLinks from "../../../api/mainMenu";
import _ from "lodash";

const mainMenu = {
	namespaced: true,
	state: {
		loading: false,
		error: false,
		open: false,
		links: {
			left: [],
			right: []
		}
	},
	mutations: {
		startFetch(store) {
			store.error = false;
			store.loading = true;
			store.links.left = [];
			store.links.right = [];
		},
		toggleMenu(store) {
			store.open = !store.open;
		},
		saveLinks(store, payload) {
			store.error = false;
			store.loading = false;
			store.links.left = payload.left;
			store.links.right = payload.right;
		},
		showError(store) {
			store.loading = false;
			store.error = true;
		},
		hideError(store) {
			store.error = false;
		},
	},
	actions: {
		async fetchMainMenuItems(store) {
			try {
				store.commit("startFetch");
				let items = await getLinks();
				let floor = Math.floor(items.length / 2);
				let left = _.map(_.slice(items, 0, floor), (item) => { item.dropdown = false; return item; });
				let right = _.map(_.slice(items, floor, items.length), (item) => { item.dropdown = false; return item; });
				store.commit("saveLinks", { left, right });
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

export default mainMenu;