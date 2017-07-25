<template>
	<nav class="pagination">
		<div class="prev" v-if="prev" @click="selectPage(page-1)">
			<svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
				<path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
				<path d="M0-.5h24v24H0z" fill="none" />
			</svg>
		</div>
		<div class="prev-disable" v-else></div>
		<div v-for="prev in prevPages" :key="prev" @click="selectPage(prev)">{{prev}}</div>
		<span>{{page}}</span>
		<div v-for="next in nextPages" :key="next" @click="selectPage(next)">{{next}}</div>
		<div class="next" v-if="next" @click="selectPage(page+1)">
			<svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
				<path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
				<path d="M0-.25h24v24H0z" fill="none" />
			</svg>
		</div>
		<div class="next-disable" v-else></div>
	</nav>
</template>
<script>
import _ from "lodash";
export default {
	name: "paginationBar",
	props: ["pages", "page"],
	computed: {
		prev() {
			return this.$props.page === 1 ? false : true;
		},
		next() {
			return this.$props.page === this.$props.pages ? false : true;
		},
		prevPages() {
			return _.reverse(_.sortedUniq(_.filter(_.range(this.$props.page - 1, this.$props.page - 5), (page) => page <= 0 ? false : true)));
		},
		nextPages() {
			return _.sortedUniq(_.filter(_.range(this.$props.page + 1, this.$props.page + 5), (page) => page > this.$props.pages ? false : true));
		}
	},
	methods: {
		selectPage(page) {
			this.$emit("changePage", page);
		}
	}
};
</script>
