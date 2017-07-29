import Vue from "vue";
import Router from "vue-router";
import Main from "../containers/Main";
import AllNews from "../containers/AllNews";
import Post from "../containers/Post";
import Page from "../containers/Page";
import Schedule from "../containers/Schedule";
import GroupSchedule from "../containers/GroupSchedule";
import TeacherSchedule from "../containers/TeacherSchedule";
import NotFound from "../containers/NotFound";

Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			component: Main
		},
		{
			path: "/news/:category/:page",
			component: AllNews
		},
		{
			path: "/post/:post_id",
			component: Post
		},
		{
			path: "/page/:page_id",
			component: Page
		},
		{
			path: "/schedule",
			component: Schedule
		},
		{
			path: "/schedule/group/:group_id",
			component: GroupSchedule
		},
		{
			path: "/schedule/teacher/:teacher_id",
			component: TeacherSchedule
		},
		{
			path: "*",
			component: NotFound
		}
	]
});
