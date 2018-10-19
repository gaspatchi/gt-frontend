<template>
	<div class="tab">
		<div class="bbtn bg-white">
			<div class="container">
				<header id="tab-btn">
					<span :class="{'active-tab': allNewsCurrentCategory===newsCategory}" @click="allNewsChangeCategory(newsCategory)">Новости</span>
					<span :class="{'active-tab': allNewsCurrentCategory===adsCategory}" @click="allNewsChangeCategory(adsCategory)">Объявления</span>
				</header>
			</div>
		</div>
		<div class="container">
			<div class="all-news-row">
				<div class="news-container">
					<section id="tab-page">
						<div class="active">
							<div class="col-news-all content-placeholder" v-for="cap in 10" :key="cap" v-if="allNewsLoading">
								<div class="news-prev">
									<img class="news-prew-size" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQcAAAClAQMAAABrxqq1AAAAA1BMVEUmTKgfeyxbAAAAHElEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAnAsV6gAB/QBKcQAAAABJRU5ErkJggg==">
								</div>
								<div class="news-info">
									<div class="content-placeholder">
										<div class="container-loading h-line-5">
											<div class="line width-20"></div>
										</div>
										<div class="container-loading h-line-3">
											<div class="line width-40"></div>
										</div>
										<div class="container-loading">
											<div class="line"></div>
											<div class="line"></div>
										</div>
									</div>
								</div>
							</div>
							<div v-if="allNewsLoading === false && allNewsTotalPages === 0" class="gt-center">
								<div class="animated-gt-logo">
									<img class="collectors" src="../../assets/img/animated_logo/collectors.svg">
									<img class="logo-without-collectors" src="../../assets/img/animated_logo/track.svg">
									<img class="cover-1x1" src="../../assets/img/animated_logo/1x1-cover.svg">
								</div>
								<h6>В настоящее время отсутствует актуальная информация в данной категории</h6>
								<br>
								<button class="btn-primory btn-40" @click="allNewsChangeCategory(newsCategory)">Перейти к новостям</button>
							</div>
							<router-link :to="{path: '/post/'+ post.id}" class="col-news-all" v-for="post in allNewsPosts" :key="post.id">
								<div class="news-prev" v-if="post.better_featured_image" :style="{ 'background-image': 'url(' + post.better_featured_image.media_details.sizes['post-thumbnail'].source_url + ')' }">
									<img class="news-prew-size" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQcAAAClAQMAAABrxqq1AAAAA1BMVEUmTKgfeyxbAAAAHElEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAnAsV6gAB/QBKcQAAAABJRU5ErkJggg==">
								</div>
								<div class="news-prev" v-else>
									<img class="news-prew-size" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQcAAAClAQMAAABrxqq1AAAAA1BMVEUmTKgfeyxbAAAAHElEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAnAsV6gAB/QBKcQAAAABJRU5ErkJggg==">
								</div>
								<div class="news-info">
									<div class="d-flex">
										<div class="data">{{post.date | formatPostDate}}</div>
										<div class="category" v-if="post.tag">{{post.tag}}</div>
									</div>
									<div class="news-head-line h6" v-html="post.title.rendered">
									</div>
									<div class="news-description" v-html="post.excerpt.rendered"></div>
								</div>
							</router-link>
							<paginationBar :pages="allNewsTotalPages" :page="allNewsCurrentPage" @changePage="changePage"></paginationBar>
						</div>
					</section>
				</div>
				<div class="news-widgets">
					<categoriesWidget :categories="allNewsCategories" :current="allNewsCurrentCategory" @changeCategory="allNewsChangeCategory"></categoriesWidget>
				</div>
			</div>
		</div>
		<toast :state="allNewsError" :messagetext="allNewsErrorMessage" mode="error"></toast>
	</div>
</template>
<script>
import store from "../../store/";
import moment from "moment";
import toast from "../toast/";
import paginationBar from "../paginationBar/";
import categoriesWidget from "../categoriesWidget/";
import { wp_news_category, wp_ads_category } from "../../api/config.js";
export default {
	name: "allNews",
	store,
	components: {
		toast,
		paginationBar,
		categoriesWidget
	},
	created() {
		this.$store.commit("allNews/changeCategory", this.allNewsUrlCategory);
		this.$store.dispatch("allNews/getPosts", this.$route.params.page);
	},
	methods: {
		allNewsChangeCategory(category) {
			this.$router.push(`/news/${category}/1`);
			this.$store.commit("allNews/changeCategory", this.allNewsUrlCategory);
			this.$store.dispatch("allNews/getPosts", 1);
		},
		changePage(page) {
			this.$router.push(`/news/${this.allNewsUrlCategory}/${page}`);
			this.$store.dispatch("allNews/getPosts", page);
		}
	},
	computed: {
		allNewsPosts() {
			return this.$store.state.allNews.posts;
		},
		allNewsCategories() {
			return this.$store.state.allNews.categories;
		},
		allNewsTotalPages() {
			return this.$store.state.allNews.pages;
		},
		allNewsCurrentPage() {
			return this.$store.state.allNews.page;
		},
		allNewsCurrentCategory() {
			return this.$store.state.allNews.category;
		},
		allNewsUrlCategory() {
			return Number(this.$store.state.routerState.params.category);
		},
		allNewsLoading() {
			return this.$store.state.allNews.loading;
		},
		allNewsError() {
			return this.$store.state.allNews.error;
		},
		allNewsErrorMessage() {
			return this.$store.state.allNews.message;
		},
		newsCategory() {
			return wp_news_category;
		},
		adsCategory() {
			return wp_ads_category;
		}
	},
	filters: {
		formatPostDate(date) {
			return moment(date).format("DD-MM-YYYY HH:mm");
		}
	}
};
</script>

