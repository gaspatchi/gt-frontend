<template>
	<li v-if="itemHasChild(item)" class="dropdown" :class="{active: active}">
		<a @click="openItem">{{item.title}}
			<div class="icon-arrow"></div>
		</a>
		<ul class="dropdown-menu" :class="{show: active}">
			<li v-for="children in item.children" :key="children.id">
				<router-link :to="{path: '/page/'+ children.object_id}" v-html="children.title"></router-link>
			</li>
		</ul>
	</li>
	<li v-else>
		<router-link :to="{path: '/page/'+ item.object_id}" v-html="item.title"></router-link>
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

