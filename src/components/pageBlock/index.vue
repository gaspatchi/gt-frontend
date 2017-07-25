<template>
	<div class="container mobile-wp-container">
		<div class="all-news-row">
			<div class="container-wp-page">
				<div class="heading-wp-page">
					<spinner v-if="pageBlockLoading" height="400" mode="large"></spinner>
					<div class="headline">
						<h1 v-if="!pageBlockPageEmpty" v-html="pageBlockPage.title.rendered"></h1>
					</div>
				</div>
				<div class="content">
					<div v-if="!pageBlockPageEmpty" v-html="pageBlockPage.content.rendered"></div>
				</div>
			</div>
		</div>
		<toast :state="pageBlockError" :messagetext="pageBlockMessage" mode="error"></toast>
	</div>
</template>
<script>
import store from "../../store/";
import spinner from "../spinner/";
import toast from "../toast/";
import _ from "lodash";
export default {
	name: "pageBlock",
	store,
	components: {
		spinner,
		toast
	},
	created() {
		this.$store.commit("mainMenu/hideMenu");
		this.$store.dispatch("pageBlock/getPage", this.pageBlockCurrentPage);
	},
	computed: {
		pageBlockPageEmpty() {
			return _.isEmpty(this.$store.state.pageBlock.page);
		},
		pageBlockPage() {
			return this.$store.state.pageBlock.page;
		},
		pageBlockLoading() {
			return this.$store.state.pageBlock.loading;
		},
		pageBlockError() {
			return this.$store.state.pageBlock.error;
		},
		pageBlockMessage() {
			return this.$store.state.pageBlock.message;
		},
		pageBlockCurrentPage() {
			return Number(this.$store.state.routerState.params.page_id);
		}
	},
	watch: {
		pageBlockCurrentPage(page_id) {
			if (page_id !== this.pageBlockPage.id) {
				this.$store.commit("mainMenu/hideMenu");
				this.$store.dispatch("pageBlock/getPage", page_id);
			}
		}
	}
};
</script>
