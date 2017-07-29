import { getTeacherInfo, getScheduleDates, getTeacherSchedule, addUserSubscription, deleteUserSubscription } from "../../../api/teacherSchedule";
import _ from "lodash";

const teacherSchedule = {
	namespaced: true,
	state: {
		loading: false,
		error: false,
		message: "",
		screen: "schedule",
		teacher: null,
		date: null,
		info: {},
		dates: [],
		schedule: []
	},
	mutations: {
		startFetch(store) {
			store.loading = true;
			store.error = false;
			store.message = "";
		},
		changeScreen(store, screen) {
			store.screen = screen;
		},
		saveTeacher(store, teacher_id) {
			store.teacher = teacher_id;
		},
		saveInfo(store, info) {
			store.info = info;
		},
		saveDates(store, dates) {
			store.dates = dates;
		},
		saveSchedule(store, payload) {
			store.loading = false;
			store.date = payload.date;
			store.schedule = payload.schedule;
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
		async getTeacherInfo(store, teacher_id) {
			try {
				store.commit("startFetch");
				let info = await getTeacherInfo(teacher_id);
				store.commit("saveTeacher", Number(teacher_id));
				store.commit("saveInfo", info);
				store.dispatch("getScheduleDates");
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
		async getScheduleDates(store) {
			try {
				store.commit("startFetch");
				let dates = await getScheduleDates(store.state.teacher);
				dates = _.reverse(_.sortBy(dates, "date"));
				store.commit("saveDates", dates);
				store.dispatch("getTeacherSchedule", dates[0].date);
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", "Сервис расписания недоступен");
					store.dispatch("hideError", 5000);
				} else {
					store.commit("showError", error.response.data.message);
					store.dispatch("hideError", 5000);
				}
			}
		},
		async getTeacherSchedule(store, date) {
			try {
				store.commit("startFetch");
				let schedule = await getTeacherSchedule(store.state.teacher, date);
				schedule = _.sortBy(schedule, "index");
				store.commit("saveSchedule", { date, schedule });
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", "Сервис расписания недоступен");
					store.dispatch("hideError", 5000);
				} else {
					store.commit("showError", error.response.data.message);
					store.dispatch("hideError", 5000);
				}
			}
		},
		async addUserSubscription(store, payload) {
			try {
				await addUserSubscription(store.rootState.rightMenu.authorization.token, payload);
				store.dispatch("rightMenu/getUserProfile", store.rootState.rightMenu.authorization.token, { root: true });
				store.dispatch("rightMenu/getUserSubscriptions", store.rootState.rightMenu.authorization.token, { root: true });
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", "Сервис подписок недоступен");
					store.dispatch("hideError", 5000);
				} else {
					store.commit("showError", error.response.data.message);
					store.dispatch("hideError", 5000);
				}
			}
		},
		async deleteUserSubscription(store, payload) {
			try {
				await deleteUserSubscription(store.rootState.rightMenu.authorization.token, payload);
				store.dispatch("rightMenu/getUserProfile", store.rootState.rightMenu.authorization.token, { root: true });
				store.dispatch("rightMenu/getUserSubscriptions", store.rootState.rightMenu.authorization.token, { root: true });
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", "Сервис подписок недоступен");
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

export default teacherSchedule;