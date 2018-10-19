<template>
	<div class="tab">
		<div class="bbtn bg-white">
			<div class="container">
				<header id="tab-btn">
					<span :class="{'active-tab': currentSection==='news'}" @click="changeSection('news',newsCategory)">Новости</span>
					<span :class="{'active-tab': currentSection==='ads'}" @click="changeSection('ads',adsCategory)">Объявления</span>
				</header>
			</div>
		</div>
		<section id="tab-page">
			<div class="active">
				<section class="container max-width-90">
					<div class="row news-row">
						<div class="col-sm-12 col-md-6 col-lg-3 col-news content-placeholder" v-for="cap in 8" :key="cap" v-if="newsBlockLoading">
							<div class="news-prev">
								<img class="news-prew-size" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQcAAAClAQMAAABrxqq1AAAAA1BMVEUmTKgfeyxbAAAAHElEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAnAsV6gAB/QBKcQAAAABJRU5ErkJggg==">
							</div>
							<div class="news-info">
								<div class="content-placeholder">
									<div class="container-loading h-line-5">
										<div class="line width-40"></div>
									</div>
									<div class="container-loading">
										<div class="line"></div>
										<div class="line"></div>
									</div>
								</div>
							</div>
						</div>
						<router-link :to="{path: '/post/'+ news.id}" class="col-sm-12 col-md-6 col-lg-3 col-news" v-for="news in newsBlock" :key="news.id">
							<div v-if="news.better_featured_image" class="news-prev" :style="{ 'background-image': 'url(' +  news.better_featured_image.media_details.sizes['post-thumbnail'].source_url + ')' }">
								<img class="news-prew-size" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQcAAAClAQMAAABrxqq1AAAAA1BMVEUmTKgfeyxbAAAAHElEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAnAsV6gAB/QBKcQAAAABJRU5ErkJggg==">
							</div>
							<div v-else class="news-prev">
								<img class="news-prew-size" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQcAAAClAQMAAABrxqq1AAAAA1BMVEUmTKgfeyxbAAAAHElEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAnAsV6gAB/QBKcQAAAABJRU5ErkJggg==">
							</div>
							<div class="news-info">
								<div class="d-flex">
									<div class="data">{{news.date | formatNewsDate}}</div>
									<div class="category" v-if="news.tag">{{news.tag}}</div>
								</div>
								<div class="news-description h6" v-html="news.title.rendered"></div>
							</div>
						</router-link>
					</div>
					<div class="row">
						<router-link class="col-sm-12 col-md-6 col-lg-3 col-news all-news" :to="{path: '/news/'+ newsCategory + '/1'}" v-if="currentSection==='news'">
							<div class="news-description h6 justify-content-end">
								<div class="all-n-arrow"></div>Все новости
							</div>
						</router-link>
						<router-link class="col-sm-12 col-md-6 col-lg-3 col-news all-news" :to="{path: '/news/'+ adsCategory + '/1'}" v-else>
							<div class="news-description h6 justify-content-end">
								<div class="all-n-arrow"></div>Все объявления
							</div>
						</router-link>
					</div>
				</section>
			</div>
		</section>
		<toast :state="newsBlockError" messagetext="При загрузке новостей произошла ошибка" messageaction="Повторить" @toast-action="changeSection('news',1)" mode="error"></toast>
	</div>
</template>

<script>
import moment from "moment";
import store from "../../store/";
import toast from "../toast/";
import { wp_news_category, wp_ads_category } from "../../api/config.js";
export default {
	name: "newsBlock",
	store,
	components: {
		toast
	},
	created() {
		this.$store.commit("newsBlock/changeSection", "news");
		this.$store.dispatch("newsBlock/fetchAds", 1);
	},
	methods: {
		changeSection(section, section_id) {
			this.$store.commit("newsBlock/changeSection", section);
			this.$store.dispatch("newsBlock/fetchAds", section_id);
		}
	},
	computed: {
		newsBlock() {
			return this.$store.state.newsBlock.items;
		},
		currentSection() {
			return this.$store.state.newsBlock.section;
		},
		newsBlockLoading() {
			return this.$store.state.newsBlock.loading;
		},
		newsBlockError() {
			return this.$store.state.newsBlock.error;
		},
		newsCategory() {
			return wp_news_category;
		},
		adsCategory() {
			return wp_ads_category;
		}
	},
	filters: {
		formatNewsDate(date) {
			return moment(date).format("DD-MM-YYYY");
		}
	}
};
</script>
