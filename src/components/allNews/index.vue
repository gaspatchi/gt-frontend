<template>
	<div class="tab">
		<div class="bbtn bg-white">
			<div class="container">
				<header id="tab-btn">
					<span :class="{'active-tab': allNewsCurrentCategory===1}" @click="allNewsChangeCategory(1)">Новости</span>
					<span :class="{'active-tab': allNewsCurrentCategory===14}" @click="allNewsChangeCategory(14)">Объявления</span>
				</header>
			</div>
		</div>
		<div class="container">
			<div class="all-news-row">
				<div class="news-container">
					<section id="tab-page">
						<div class="active">
							<spinner v-if="allNewsLoading" height="500" mode="large"></spinner>
							<router-link :to="{path: '/post/'+ post.id}" class="col-news-all" v-for="post in allNewsPosts" :key="post.id">
								<div class="news-prev" v-if="post.image" :style="{ 'background-image': 'url(' + post.image + ')' }">
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
import spinner from "../spinner/";
import toast from "../toast/";
import paginationBar from "../paginationBar/";
import categoriesWidget from "../categoriesWidget/";
export default {
	name: "allNews",
	store,
	components: {
		spinner,
		toast,
		paginationBar,
		categoriesWidget
	},
	created() {
		window.scrollTo(0, 0);
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
			window.scrollTo(0, 0);
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
		}
	},
	watch: {
		allNewsTotalPages(pages) {
			if (pages === 0) {
				this.allNewsChangeCategory(1);
			}
		}
	},
	filters: {
		formatPostDate(date) {
			return moment(date).format("DD-MM-YYYY HH:mm");
		}
	}
};
</script>

