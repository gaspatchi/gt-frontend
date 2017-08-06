<template>
	<div class="info-settings">
		<img class="image-info" src="../../assets/img/res-cross.svg">
		<h4>{{title}}</h4>
		<h6>{{description}}</h6>
		<button class="btn-primory btn-40 btn-pulse" @click="errorClick">{{button}}</button>
	</div>
</template>
<script>
export default {
	name: "error",
	props: ["title", "description", "button"],
	methods: {
		errorClick() {
			this.$emit("errorClick");
		}
	}
};
</script>
