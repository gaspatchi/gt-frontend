<template>
	<div class="info-settings">
		<img class="image-info" src="../../assets/img/green-done.svg">
		<h4>{{title}}</h4>
		<h6>{{description}}</h6>
		<button class="btn-primory btn-40 btn-pulse" @click="successClick">{{button}}</button>
	</div>
</template>
<script>
export default {
	name: "success",
	props: ["title", "description", "button"],
	methods: {
		successClick() {
			this.$emit("successClick");
		}
	}
};
</script>
