<template>
	<div :class="{'hidden-text-slider': open}" @click="toggleContent">
		<p class="line-clamp line-clamp-4" v-html="text"></p>
	</div>
</template>
<script>
export default {
	name: "contentText",
	props: ["text"],
	data() {
		return {
			open: true
		};
	},
	methods: {
		toggleContent() {
			this.open = !this.open;
		}
	}
};
</script>
