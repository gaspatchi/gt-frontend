import getGroups from "../../../api/scheduleBlock";

const scheduleBlock = {
	namespaced: true,
	state: {
		loading: false,
		error: false,
		message: "",
		course: 1,
		groups: [],
	},
	mutations: {
		startFetch(store) {
			store.loading = true;
		},
		saveGroups(store, groups) {
			store.loading = false;
			store.groups = groups;
		},
		changeCourse(store, course) {
			store.course = course;
		},
		showError(store, message) {
			store.loading = false;
			store.error = true;
			store.message = message;
		},
		hideError(store) {
			store.error = false;
			store.message = "";
		}
	},
	actions: {
		async getGroups(store) {
			try {
				store.commit("startFetch");
				let groups = await getGroups();
				store.commit("saveGroups", groups);
			} catch (error) {
				window.console.log(error);
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", "Сервис расписания недоступен");
					store.dispatch("hideError", 5000);
				} else {
					window.console.log(error);
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

export default scheduleBlock;