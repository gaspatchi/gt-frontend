<template>
	<div>
		<div class="hidden-md-up m-search" @click="toggleSearchMenu"></div>
		<div class="hidden-sm-down search-input" :class="{show: topSearchOpen}">
			<div class="search-icon"></div>
			<input type="search" :placeholder="topSearchPlaceholder" v-model="searchItems" ref="searchInput" @click="openSearchMenu">
			<spinner v-if="topSearchLoading" mode="spinner-search-custom very-small"></spinner>
			<div class="search-resultes">
				<div class="search-type">
					<span class="search-type-item" :class="{selected: topSearchSearchType==='posts'}" @click="changeSearchType('posts')">Записи</span>
					<span class="search-type-item" :class="{selected: topSearchSearchType==='media'}" @click="changeSearchType('media')">Документы</span>
				</div>
				<div class="s-result default" v-if="!topSearchHasResults && !topSearchLoading">Начните вводить поисковой запрос</div>
				<div v-if="topSearchSearchType==='posts'">
					<router-link class="s-result" :to="{path: '/post/'+ result.id}" v-for="result in topSearchResults" :key="result.id">
						<h1 v-html="result.title.rendered"></h1>
						<p v-html="result.excerpt.rendered"></p>
					</router-link>
				</div>
				<div v-else>
					<a class="s-result" v-for="result in topSearchResults" :key="result.id" :href="result.source_url" :title="result.title.rendered" target="_blank">
						<h1 v-html="result.title.rendered"></h1>
					</a>
				</div>
			</div>
		</div>
		<div :class="{'active-search': topSearchOpen}" @click="closeSearchMenu"></div>
		<toast :state="topSearchError" messagetext="Не удалось загрузить результаты поиска" mode="warning"></toast>
	</div>
</template>

<script>
import store from "../../store/";
import spinner from "../spinner/";
import toast from "../toast/";
export default {
	name: "topSearch",
	store,
	components: {
		spinner,
		toast
	},
	methods: {
		openSearchMenu() {
			this.$store.commit("topSearch/openSearchMenu");
			this.$nextTick(() => this.$refs.searchInput.focus());
		},
		closeSearchMenu() {
			this.$store.commit("topSearch/closeSearchMenu");
			this.$nextTick(() => this.$refs.searchInput.blur());
		},
		toggleSearchMenu() {
			this.$store.state.topSearch.open === false ? this.openSearchMenu() : this.closeSearchMenu();
		},
		changeSearchType(type) {
			this.$store.commit("topSearch/changeSearchType", type);
		}
	},
	computed: {
		topSearchSearchType() {
			return this.$store.state.topSearch.type;
		},
		topSearchPlaceholder() {
			return this.$store.state.topSearch.type === "posts" ? "Поиск по записям" : "Поиск по документам";
		},
		searchItems: {
			get() {
				return this.$store.state.topSearch.query;
			},
			set(query) {
				this.$store.dispatch("topSearch/searchItems", query);
			}
		},
		topSearchResults() {
			return this.$store.state.topSearch.results;
		},
		topSearchHasResults() {
			return this.$store.state.topSearch.results.length > 0;
		},
		topSearchOpen() {
			return this.$store.state.topSearch.open;
		},
		topSearchError() {
			return this.$store.state.topSearch.error;
		},
		topSearchLoading() {
			return this.$store.state.topSearch.loading;
		}
	}
};
</script>
