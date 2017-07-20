<template>
	<div class="tab">
		<div class="bbtn bg-white">
			<div class="container">
				<header id="tab-btn">
					<span :class="{'active-tab': currentSection==='news'}" @click="changeSection('news',1)">Новости</span>
					<span :class="{'active-tab': currentSection==='ads'}" @click="changeSection('ads',14)">Объявления</span>
				</header>
			</div>
		</div>
		<section id="tab-page">
			<div class="active">
				<section class="container max-width-90">
					<spinner v-if="newsBlockLoading" :height="200" :mode="'large'"></spinner>
					<div class="row news-row">
						<a class="col-sm-12 col-md-6 col-lg-3 col-news" v-for="news in newsBlock" :key="news.id">
							<div v-if="news.hasImage" class="news-prev" :style="{ 'background-image': 'url(' + news.image + ')' }">
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
								<div class="news-description h6">
									{{news.title.rendered}}
								</div>
							</div>
						</a>
					</div>
					<div class="row">
						<a href="all-news.html" class="col-sm-12 col-md-6 col-lg-3 col-news all-news">
							<div class="news-description h6 justify-content-end" v-if="currentSection==='news'">
								<div class="all-n-arrow"></div>Все новости
							</div>
							<div class="news-description h6 justify-content-end" v-else>
								<div class="all-n-arrow"></div>Все объявления
							</div>
						</a>
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
import spinner from "../spinner/";
import toast from "../toast/";

export default {
	name: "newsBlock",
	store,
	components: {
		spinner,
		toast
	},
	created() {
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
		}
	},
	filters: {
		formatNewsDate(date) {
			return moment(date).format("DD-MM-YYYY");
		}
	}
};
</script>
