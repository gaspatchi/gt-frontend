<template>
	<div class="container mobile-wp-container">
		<div class="all-news-row">
			<div class="container-wp-page">
				<div class="heading-wp-page">
					<spinner v-if="postBlockLoading" height="400" mode="large"></spinner>
					<div class="headline">
						<h1 v-if="!postBlockPostEmpty" v-html="postBlockPost.title.rendered"></h1>
					</div>
					<div class="date" v-if="!postBlockPostEmpty">
						<div class="date-icon"></div>{{postBlockPostDate}}</div>
				</div>
				<div class="content">
					<div v-if="!postBlockPostEmpty" v-html="postBlockPost.content.rendered"></div>
				</div>
			</div>
			<div class="news-widgets">
				<postsWidget :posts="postBlockPosts" @selectPost="selectPost">
					<spinner v-if="postBlockLoading" height="50" mode="large"></spinner>
				</postsWidget>
			</div>
		</div>
		<toast :state="postBlockError" :messagetext="postBlockMessage" mode="error"></toast>
	</div>
</template>
<script>
import store from "../../store/";
import spinner from "../spinner/";
import toast from "../toast/";
import postsWidget from "../postsWidget/";
import moment from "moment";
import _ from "lodash";
export default {
	name: "postBlock",
	store,
	components: {
		spinner,
		toast,
		postsWidget
	},
	created() {
		this.$store.dispatch("postBlock/getPost", this.postBlockCurrentPost);
	},
	methods: {
		selectPost(post_id) {
			window.scrollTo(0, 0);
			this.$router.push(`/post/${post_id}`);
			this.$store.dispatch("postBlock/getPost", post_id);
		}
	},
	computed: {
		postBlockPostEmpty() {
			return _.isEmpty(this.$store.state.postBlock.post);
		},
		postBlockPostsEmpty() {
			return _.isEmpty(this.$store.state.postBlock.posts);
		},
		postBlockPost() {
			return this.$store.state.postBlock.post;
		},
		postBlockPosts() {
			return this.$store.state.postBlock.posts;
		},
		postBlockLoading() {
			return this.$store.state.postBlock.loading;
		},
		postBlockError() {
			return this.$store.state.postBlock.error;
		},
		postBlockMessage() {
			return this.$store.state.postBlock.message;
		},
		postBlockPostDate() {
			return moment(this.postBlockPost.date).format("DD-MM-YYYY HH:mm");
		},
		postBlockCurrentPost() {
			return Number(this.$store.state.routerState.params.post_id);
		},
	},
	watch: {
		postBlockCurrentPost(post_id) {
			if (post_id !== this.postBlockPost.id) {
				this.$store.commit("mainMenu/hideMenu");
				this.$store.dispatch("postBlock/getPost", post_id);
			}
		}
	}
};
</script>

