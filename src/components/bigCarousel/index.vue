<template>
	<div class="carousel">
		<spinner v-if="bigCarouselLoading" :height="200" :mode="'large'"></spinner>
		<img v-if="bigCarouselSliderError" src="../../assets/img/flat_bldg.png" style="width: 100%; height: auto;"></img>
		<swiper :options="swiperOption" v-if="!bigCarouselError">
			<swiper-slide v-for="slide in slidesImages" :key="slide.image.id" :style="{ 'background-image': 'url(' + slide.image.source_url + ')' }" style="background-repeat: no-repeat; background-position: center center; background-size: cover; width: 100%;">
				<div class="coruecel-text">
					<div class="container">
						<div class="heading" v-if="slide.post.title.rendered">
							<h1 v-html="slide.post.title.rendered"></h1>
						</div>
						<div class="content" v-if="slide.post.content.rendered">
							<contentText :text="slide.post.content.rendered"></contentText>
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
import spinner from "../spinner/";
import contentText from "./contentText";
export default {
	name: "bigCarousel",
	store,
	components: {
		swiper,
		swiperSlide,
		spinner,
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
