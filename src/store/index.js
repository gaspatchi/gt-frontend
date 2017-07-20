import Vue from "vue";
import Vuex from "vuex";
import visuallyImpaired from "./modules/visuallyImpaired/";
import mainMenu from "./modules/mainMenu/";
import topSearch from "./modules/topSearch/";
import bigCarousel from "./modules/bigCarousel/";
import newsBlock from "./modules/newsBlock/";

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		visuallyImpaired,
		mainMenu,
		topSearch,
		bigCarousel,
		newsBlock
	}
});

export default store;