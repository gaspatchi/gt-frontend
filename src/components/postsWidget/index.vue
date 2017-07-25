<template>
	<div class="widget last-news">
		<div class="heading">Последние записи</div>
		<slot></slot>
		<div class="last-news-items">
			<div class="last-news-item" v-for="post in posts" :key="post.id" @click="selectPost(post.id)">
				<div class="headline">{{post.title.rendered}}</div>
				<div class="description" v-html="post.excerpt.rendered"></div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "postsWidget",
	props: ["posts"],
	methods: {
		selectPost(post_id) {
			this.$emit("selectPost", post_id);
		}
	}
};
</script>

