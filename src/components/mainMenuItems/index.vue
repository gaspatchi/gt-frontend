<template>
	<li v-if="itemHasChild(item)" class="dropdown" :class="{active: active}">
		<a href="#" @click="openItem">{{item.title}}
			<div class="icon-arrow"></div>
		</a>
		<ul class="dropdown-menu" :class="{show: active}">
			<li v-for="children in item.children" :key="children.id">
				<a href="">{{children.title}}</a>
			</li>
		</ul>
	</li>
	<li v-else>{{item.title}}
		<a href=""></a>
	</li>
</template>
<script>

export default {
	name: "mainMenuItems",
	props: ["item"],
	data() {
		return {
			active: false
		};
	},
	methods: {
		itemHasChild(item) {
			try {
				return item.children;
			} catch (error) {
				return false;
			}
		},
		openItem() {
			this.$data.active = !this.$data.active;
		}
	}
};
</script>

