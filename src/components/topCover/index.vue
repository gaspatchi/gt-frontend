<template>
	<div class="cover-blur" :class="mode">
		<div class="container">
			<h1 v-if="text">{{text}}</h1>
		</div>
	</div>
</template>
<script>
export default {
	name: "topCover",
	props: ["mode", "text"]
};
</script>
