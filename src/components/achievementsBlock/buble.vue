<template>
	<div :class="[{active: showInfo},'more_info_buble']">
		<div class="more_info_container">
			<div class="more_info_heading">
				<span v-html="heading"></span>
				<span class="close_btn" @click="toggleInfo">
					✖
				</span>
			</div>
			<div class="more_info_description" v-html="description">
			</div>
		</div>
		<div class="buble_background">
			<div class="info_icon" @click="toggleInfo"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: "buble",
	props: ["heading", "description"],
	data() {
		return { showInfo: false };
	},
	methods: {
		toggleInfo() {
			this.showInfo = !this.showInfo;
		}
	}
};
</script>
