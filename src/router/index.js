import Vue from "vue";
import Router from "vue-router";
import Main from "../containers/Main";
import AllNews from "../containers/AllNews";
import Post from "../containers/Post";
import Page from "../containers/Page";

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
		}
	]
});
