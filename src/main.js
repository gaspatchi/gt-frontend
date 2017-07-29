import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";

Vue.config.productionTip = false;

sync(store, router, { moduleName: "routerState" });

new Vue({
	el: "#app",
	store,
	router,
	template: "<App/>",
	components: { App }
});