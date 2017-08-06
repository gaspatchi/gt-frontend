import getCabinetInfo from "../../../api/cabinetSchedule";
import _ from "lodash";

const cabinetSchedule = {
	namespaced: true,
	state: {
		loading: false,
		error: false,
		message: "",
		info: {},
		schedule: []
	},
	mutations: {
		startFetch(store) {
			store.loading = true;
			store.error = false;
			store.message = "";
		},
		saveCabinet(store, payload) {
			store.loading = false;
			store.info = payload.info;
			store.schedule = payload.schedule;
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
		async getCabinetInfo(store, cabinet_id) {
			try {
				let info = await getCabinetInfo(cabinet_id);
				let schedule = _.sortBy(info.lessons, "index");
				store.commit("saveCabinet", { info: info.cabinet, schedule });
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", "Сервис информации недоступен");
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

export default cabinetSchedule;