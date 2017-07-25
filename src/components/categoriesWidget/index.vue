<template>
	<div class="widget categories">
		<div class="heading">Категории</div>
		<div class="category-items">
			<button v-for="category in categories" :key="category.id" :class="{checked: category.id === current}" @click="changeCategory(category.id)">{{category.name}}</button>
		</div>
	</div>
</template>
<script>
export default {
	name: "categoriesWidget",
	props: ["categories", "current"],
	methods: {
		changeCategory(category) {
			this.$emit("changeCategory", category);
		}
	}
};
</script>

