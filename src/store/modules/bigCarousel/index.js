import getSlides from "../../../api/bigCarousel";

const bigCarousel = {
	namespaced: true,
	state: {
		loading: false,
		error: false,
		sliderError: false,
		slides: []
	},
	mutations: {
		startFetch(store) {
			store.error = false;
			store.sliderError = false;
			store.loading = true;
			store.slides = [];
		},
		saveSlides(store, slides) {
			store.error = false;
			store.sliderError = false;
			store.loading = false;
			store.slides = slides;
		},
		showError(store) {
			store.loading = false;
			store.error = true;
			store.sliderError = true;		
		},
		hideError(store) {
			store.error = false;
		},
	},
	actions: {
		async fetchSlides(store) {
			try {
				store.commit("startFetch");
				let slides = await getSlides();
				store.commit("saveSlides", slides);
			} catch (error) {
				store.commit("showError");
				store.dispatch("hideError", 5000);
			}
		},
		hideError(store, time) {
			setTimeout(() => store.commit("hideError"), time);
		}
	}
};

export default bigCarousel;