<template>
	<div class="carousel">
		<div class="swiper-slide" v-if="bigCarouselLoading">
			<div class="coruecel-text content-placeholder">
				<div class="container">
					<div class="heading">
						<div class="container-loading h-line-1">
							<div class="line width-40"></div>
						</div>
					</div>
					<div class="content">
						<div class="container-loading p-lines-18">
							<div class="line"></div>
							<div class="line"></div>
							<div class="line"></div>
						</div>
					</div>
				</div>
			</div>
			<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADAQMAAACUBtwLAAAAA1BMVEVHcEyC+tLSAAAAAXRSTlMAQObYZgAAAApJREFUCB1jAAMAAAYAAcXjo3IAAAAASUVORK5CYII=" style="width: 100%; height: auto;">
		</div>
		<img v-if="bigCarouselSliderError" src="../../assets/img/flat_bldg.png" style="width: 100%; height: auto;">
		<swiper :options="swiperOption" v-if="!bigCarouselError">
			<swiper-slide v-for="slide in slidesImages" :key="slide.id" :style="{ 'background-image': 'url(' + slide.better_featured_image.source_url + ')' }" style="background-repeat: no-repeat; background-position: center center; background-size: cover; width: 100%;">
				<div class="coruecel-text">
					<div class="container">
						<div class="heading" v-if="slide.title.rendered">
							<h1 v-html="slide.title.rendered"></h1>
						</div>
						<div class="content" v-if="slide.content.rendered">
							<contentText :text="slide.content.rendered"></contentText>
						</div>
					</div>
				</div>
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADAQMAAACUBtwLAAAAA1BMVEVHcEyC+tLSAAAAAXRSTlMAQObYZgAAAApJREFUCB1jAAMAAAYAAcXjo3IAAAAASUVORK5CYII=" style="width: 100%; height: auto;"> </swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>

<script>
import store from "../../store/";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import contentText from "./contentText";
export default {
	name: "bigCarousel",
	store,
	components: {
		swiper,
		swiperSlide,
		contentText
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
		bigCarouselSliderError() {
			return this.$store.state.bigCarousel.sliderError;
		},
		bigCarouselError() {
			return this.$store.state.bigCarousel.error;
		}
	}
};
</script>
