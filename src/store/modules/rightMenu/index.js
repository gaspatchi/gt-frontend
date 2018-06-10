import { loginUser, resetPassword, registerUser, getUserProfile, getUserSubscriptions, getGroupSchedule, getTeacherSchedule } from "../../../api/rightMenu";
import _ from "lodash";

const rightMenu = {
	namespaced: true,
	state: {
		loading: false,
		error: false,
		open: false,
		screen: "login",
		message: "",
		type: "error",
		authorization: {
			authorized: false,
			token: false,
		},
		user: {
			profile: {}
		},
		schedule: {
			groups: [],
			group: {},
			teachers: [],
			teacher: {}
		}
	},
	mutations: {
		toggleMenu(store) {
			store.open = !store.open;
		},
		openMenu(store) {
			store.open = true;
		},
		closeMenu(store) {
			store.open = false;
		},
		changeScreen(store, screen) {
			store.screen = screen;
		},
		startFetch(store) {
			store.loading = true;
			store.error = false;
			store.message = "";
		},
		stopFetch(store) {
			store.loading = false;
		},
		saveUserToken(store, token) {
			store.authorization.authorized = true;
			store.authorization.token = token;
		},
		saveUserProfile(store, profile) {
			store.loading = false;
			store.user.profile = profile;
		},
		saveUserSubscriptions(store, subscriptions) {
			store.loading = false;
			store.schedule.groups = subscriptions.groups;
			store.schedule.group = {};
			store.schedule.teachers = subscriptions.teachers;
			store.schedule.teacher = {};
		},
		logoutUser(store) {
			store.authorization.authorized = false;
			store.authorization.token = false;
			store.user.profile = {};
			store.schedule.groups = {};
			store.schedule.group = {};
			store.schedule.teachers = {};
			store.schedule.teacher = {};
		},
		showError(store, payload) {
			store.loading = false;
			store.error = true;
			store.message = payload.message;
			store.type = payload.type;
		},
		hideError(store) {
			store.error = false;
		},
		saveGroupSchedule(store, schedule) {
			store.loading = false;
			store.schedule.group = schedule;
		},
		saveTeacherSchedule(store, schedule) {
			store.loading = false;
			store.schedule.teacher = schedule;
		}
	},
	actions: {
		async authorizeUser(store, loginData) {
			try {
				store.commit("startFetch");
				let result = await loginUser(loginData);
				localStorage.setItem("gtmau_token", result.data.token);
				store.commit("saveUserToken", result.data.token);
				store.dispatch("getUserProfile", result.data.token);
				store.dispatch("getUserSubscriptions", result.data.token);
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", { message: "Сервис авторизации недоступен", type: "error" });
					store.dispatch("hideError", 5000);
				} else if (error.response.status === 400) {
					store.commit("showError", { message: "При входе в профиль произошла ошибка", type: "error" });
					store.dispatch("hideError", 5000);
				} else if (error.response.status === 403) {
					store.commit("showError", { message: "Ваша сессия устарела", type: "warning" });
					store.dispatch("hideError", 5000);
					store.dispatch("logoutUser");
				} else {
					store.commit("showError", { message: error.response.data.message, type: "error" });
					store.dispatch("hideError", 5000);
				}
			}
		},
		async resetPassword(store, resetData) {
			try {
				store.commit("startFetch");
				let result = await resetPassword(resetData);
				store.commit("changeScreen", "login");
				store.commit("showError", { message: result.data.message, type: "success" });
				store.dispatch("hideError", 5000);
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", { message: "Сервис авторизации недоступен", type: "error" });
					store.dispatch("hideError", 5000);
				} else if (error.response.status === 400) {
					store.commit("showError", { message: "При сбросе пароля произошла ошибка", type: "error" });
					store.dispatch("hideError", 5000);
				} else {
					store.commit("showError", { message: error.response.data.message, type: "error" });
					store.dispatch("hideError", 5000);
				}
			}
		},
		async registerUser(store, registrationData) {
			try {
				store.commit("startFetch");
				await registerUser(registrationData);
				store.commit("stopFetch");
				store.commit("changeScreen", "congratulation");
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", { message: "Сервис регистрации недоступен", type: "error" });
					store.dispatch("hideError", 5000);
				} else if (error.response.status === 400) {
					store.commit("showError", { message: "Проверьте правильность заполнения полей", type: "warning" });
					store.dispatch("hideError", 5000);
				} else if (error.response.status === 403) {
					store.commit("showError", { message: "Ваша сессия устарела", type: "warning" });
					store.dispatch("hideError", 5000);
					store.dispatch("logoutUser");
				} else {
					store.commit("showError", { message: error.response.data.message, type: "error" });
					store.dispatch("hideError", 5000);
				}
			}
		},
		async getUserProfile(store, token) {
			try {
				let result = await getUserProfile(token);
				store.commit("saveUserProfile", result.data);
				store.commit("changeScreen", "profile");
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", { message: "Профиль недоступен", type: "error" });
					store.dispatch("hideError", 5000);
				} else if (error.response.status === 400) {
					store.commit("showError", { message: "При получении профиля произошла ошибка", type: "error" });
					store.dispatch("hideError", 5000);
				} else if (error.response.status === 403) {
					store.commit("showError", { message: "Ваша сессия устарела", type: "warning" });
					store.dispatch("hideError", 5000);
					store.dispatch("logoutUser");
				} else {
					store.commit("showError", { message: error.response.data.message, type: "error" });
					store.dispatch("hideError", 5000);
				}
			}
		},
		async getUserSubscriptions(store, token) {
			try {
				store.commit("startFetch");
				let result = await getUserSubscriptions(token);
				let groups = _.slice(_.concat(result.data.send.email.groups, result.data.view.groups), 0, 10);
				let teachers = _.slice(_.concat(result.data.send.email.teachers, result.data.view.teachers), 0, 10);

				store.commit("saveUserSubscriptions", { groups, teachers });
				if (_.size(groups) > 0) {
					store.dispatch("getGroupSchedule", groups[0].group_id);
				}
				if (_.size(teachers) > 0) {
					store.dispatch("getTeacherSchedule", teachers[0].teacher_id);
				}
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", { message: "Сервис подписок недоступен", type: "error" });
					store.dispatch("hideError", 5000);
				} else if (error.response.status === 400) {
					store.commit("showError", { message: "При получении подписок произошла ошибка", type: "error" });
					store.dispatch("hideError", 5000);
				} else if (error.response.status === 403) {
					store.commit("showError", { message: "Ваша сессия устарела", type: "warning" });
					store.dispatch("hideError", 5000);
					store.dispatch("logoutUser");
				} else {
					store.commit("showError", { message: error.response.data.message, type: "error" });
					store.dispatch("hideError", 5000);
				}
			}
		},
		async getGroupSchedule(store, group_id) {
			try {
				store.commit("startFetch");
				let result = await getGroupSchedule(group_id);
				result.data.group_id = group_id;
				result.data.schedule = _.sortBy(result.data.schedule, "index");
				store.commit("saveGroupSchedule", result.data);
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", { message: "Сервис расписания недоступен", type: "error" });
					store.dispatch("hideError", 5000);
				} else if (error.response.status === 400) {
					store.commit("showError", { message: "При получении расписания группы произошла ошибка", type: "error" });
					store.dispatch("hideError", 5000);
				} else if (error.response.status === 403) {
					store.commit("showError", { message: "Ваша сессия устарела", type: "warning" });
					store.dispatch("hideError", 5000);
					store.dispatch("logoutUser");
				} else {
					store.commit("showError", { message: error.response.data.message, type: "error" });
					store.dispatch("hideError", 5000);
				}
			}
		},
		async getTeacherSchedule(store, teacher_id) {
			try {
				store.commit("startFetch");
				let result = await getTeacherSchedule(teacher_id);
				result.data.schedule = _.sortBy(result.data.schedule, "index");
				store.commit("saveTeacherSchedule", result.data);
			} catch (error) {
				if (!error.response || error == "Error: Request failed with status code 502") {
					store.commit("showError", { message: "Сервис расписания недоступен", type: "error" });
					store.dispatch("hideError", 5000);
				} else if (error.response.status === 400) {
					store.commit("showError", { message: "При получении расписания преподавателя произошла ошибка", type: "error" });
					store.dispatch("hideError", 5000);
				} else if (error.response.status === 403) {
					store.commit("showError", { message: "Ваша сессия устарела", type: "warning" });
					store.dispatch("hideError", 5000);
					store.dispatch("logoutUser");
				} else {
					store.commit("showError", { message: error.response.data.message, type: "error" });
					store.dispatch("hideError", 5000);
				}
			}
		},
		logoutUser(store) {
			localStorage.removeItem("gtmau_token");
			store.commit("logoutUser");
			store.commit("changeScreen", "login");
		},
		hideError(store, time) {
			setTimeout(() => store.commit("hideError"), time);
		}
	},
	getters: {
		profileEmpty(store) {
			return _.isEmpty(store.user.profile);
		},
		userProfile(store, getters) {
			return getters.profileEmpty === true ? {} : store.user.profile;
		},
		userAuthorized(store) {
			try {
				return store.authorization.authorized && store.authorization.token.length > 0 ? true : false;
			} catch (error) {
				return false;
			}
		},
		UserSubscriptions(store) {
			return { groups: _.slice(store.schedule.groups, 0, 3), teachers: _.slice(store.schedule.teachers, 0, 1) };
		}
	}
};

export default rightMenu;