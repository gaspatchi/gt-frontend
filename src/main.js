import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";
import VeeValidate, { Validator } from "vee-validate";
import ru from "vee-validate/dist/locale/ru";

Validator.addLocale(ru);
Vue.config.productionTip = false;
sync(store, router, { moduleName: "routerState" });
Vue.use(VeeValidate, { locale: "ru" });

new Vue({
	el: "#app",
	store,
	router,
	template: "<App/>",
	components: { App }
});