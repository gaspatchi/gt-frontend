<template>
	<div>
		<div class="hidden-md-up m-search" @click="toggleSearchMenu"></div>
		<div class="hidden-sm-down search-input" :class="{show: topSearchOpen}">
			<div class="search-icon"></div>
			<input type="search" placeholder="Поиск по сайту" v-model="searchItems" ref="searchInput" @click="toggleSearchMenu">
			<spinner v-if="topSearchLoading" :height="170" :mode="'s-result small'"></spinner>
			<div class="search-resultes" v-if="topSearchHasResults">
				<a href="#" class="s-result " v-for="result in topSearchResults" :key="result.id">
					<h1>{{result.title.rendered}}</h1>
					<p v-html="result.excerpt.rendered"></p>
				</a>
			</div>
		</div>
		<div :class="{'active-search': topSearchOpen}" @click="toggleSearchMenu"></div>
		<toast :state="topSearchError" messagetext="Невозможно получить результаты поиска" mode="error"></toast>
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
		toggleSearchMenu() {
			if (this.$store.state.topSearch.open === false) {
				this.$store.commit("topSearch/toggleSearchMenu");
				this.$nextTick(() => this.$refs.searchInput.focus());
			} else {
				this.$store.commit("topSearch/toggleSearchMenu");
			}
		}
	},
	computed: {
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
