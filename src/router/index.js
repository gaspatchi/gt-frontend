import Vue from "vue";
import Router from "vue-router";
import Store from "../store/";
import Main from "../containers/Main";
import AllNews from "../containers/AllNews";
import Post from "../containers/Post";
import Page from "../containers/Page";
import Schedule from "../containers/Schedule";
import GroupSchedule from "../containers/GroupSchedule";
import TeacherSchedule from "../containers/TeacherSchedule";
import CabinetSchedule from "../containers/CabinetSchedule";
import Feedback from "../containers/Feedback";
import UserProfile from "../containers/UserProfile";
import VerificationPage from "../containers/VerificationPage";
import NotFound from "../containers/NotFound";

Vue.use(Router);

let router = new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			component: Main,
			meta: {
				title: "Главная"
			}
		},
		{
			path: "/news/:category/:page",
			component: AllNews,
			meta: {
				title: "Все записи"
			}
		},
		{
			path: "/post/:post_id",
			component: Post,
			meta: {
				title: "Запись"
			}
		},
		{
			path: "/page/:page_id",
			component: Page,
			meta: {
				title: "Страница"
			}
		},
		{
			path: "/schedule",
			component: Schedule,
			meta: {
				title: "Расписание занятий"
			}
		},
		{
			path: "/schedule/group/:group_id",
			component: GroupSchedule,
			meta: {
				title: "Расписание группы"
			}
		},
		{
			path: "/schedule/teacher/:teacher_id",
			component: TeacherSchedule,
			meta: {
				title: "Расписание преподавателя"
			}
		},
		{
			path: "/schedule/cabinet/:cabinet_id",
			component: CabinetSchedule,
			meta: {
				title: "Расписание кабинета"
			}
		},
		{
			path: "/feedback",
			component: Feedback,
			meta: {
				title: "Обратная связь"
			}
		},
		{
			path: "/profile",
			component: UserProfile,
			meta: {
				title: "Личный кабинет"
			}
		},
		{
			path: "/verification/:type/:token",
			component: VerificationPage,
			meta: {
				title: "Верификация"
			}
		},
		{
			path: "*",
			component: NotFound,
			meta: {
				title: "Ничего не найдено"
			}
		}
	],
	scrollBehavior() {
		return { x: 0, y: 0 };
	}
});

router.beforeResolve((to, from, next) => {
	Store.commit("topSearch/closeSearchMenu");
	Store.commit("mainMenu/hideMenu");
	document.title = to.meta.title;
	next();
});

export default router;