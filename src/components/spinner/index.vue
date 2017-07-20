<template>
	<div class="spinner-wrapper" :class="this.$props.mode" :style="{height: this.$props.height + 'px'}">
		<div class="spinner">
			<div class="bounce1"></div>
			<div class="bounce2"></div>
			<div class="bounce3"></div>
		</div>
	</div>
</template>
<script>
export default {
	name: "spinner",
	props: ["height", "mode"]
};
</script>
