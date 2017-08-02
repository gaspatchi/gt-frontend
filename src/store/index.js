import Vue from "vue";
import Vuex from "vuex";
import visuallyImpaired from "./modules/visuallyImpaired/";
import mainMenu from "./modules/mainMenu/";
import topSearch from "./modules/topSearch/";
import bigCarousel from "./modules/bigCarousel/";
import newsBlock from "./modules/newsBlock/";
import rightMenu from "./modules/rightMenu/";
import allNews from "./modules/allNews/";
import postBlock from "./modules/postBlock/";
import pageBlock from "./modules/pageBlock/";
import scheduleBlock from "./modules/scheduleBlock/";
import scheduleSearch from "./modules/scheduleSearch/";
import groupSchedule from "./modules/groupSchedule/";
import teacherSchedule from "./modules/teacherSchedule/";
import cabinetSchedule from "./modules/cabinetSchedule/";

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		visuallyImpaired,
		mainMenu,
		topSearch,
		bigCarousel,
		newsBlock,
		rightMenu,
		allNews,
		postBlock,
		pageBlock,
		scheduleBlock,
		scheduleSearch,
		groupSchedule,
		teacherSchedule,
		cabinetSchedule
	}
});

export default store;