import Vue from "vue";
import Router from "vue-router";
import Main from "../containers/Main";
import bigCarousel from "../components/bigCarousel";

Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "Главная",
			component: Main
		},
		{
			path: "/test",
			name: "test",
			component: bigCarousel
		}
	]
});
