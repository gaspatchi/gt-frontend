<template>
	<div class="carousel">
		<spinner v-if="bigCarouselLoading" :height="200" :mode="'large'"></spinner>
		<img v-if="bigCarouselError" src="../../assets/img/cover-blur.jpg"></img>
		<swiper :options="swiperOption" v-if="!bigCarouselError">
			<swiper-slide v-for="image in slidesImages" :key="image.id" :style="{ 'background-image': 'url(' + image.source_url + ')' }" style="background-repeat: no-repeat;background-position: center;background-size: cover;">
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADAQMAAACUBtwLAAAAA1BMVEVHcEyC+tLSAAAAAXRSTlMAQObYZgAAAApJREFUCB1jAAMAAAYAAcXjo3IAAAAASUVORK5CYII=" style="width:100%; height:auto" />
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>

<script>
import store from "../../store/";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import spinner from "../spinner/";

export default {
	name: "bigCarousel",
	store,
	components: {
		swiper,
		swiperSlide,
		spinner
	},
	data() {
		return {
			swiperOption: {
				keyboardControl: true,
				pagination: ".swiper-pagination",
				paginationClickable: true,
				preloadImages: false,
				lazyLoading: true,
				autoplay: 5000
			}
		};
	},
	created() {
		store.dispatch("bigCarousel/fetchSlides");
	},
	computed: {
		slidesImages() {
			return this.$store.state.bigCarousel.slides;
		},
		bigCarouselLoading() {
			return this.$store.state.bigCarousel.loading;
		},
		bigCarouselError() {
			return this.$store.state.bigCarousel.error;
		}
	}
};
</script>
