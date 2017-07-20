<template>
	<div class="toast-buble-container" :class="{active: state}">
		<div class="toast-buble" :class="mode">
			<h5>{{messagetext}}</h5>
			<button @click="toggleAction" v-if="messageaction">
				{{messageaction}}
			</button>
		</div>
	</div>
</template>
<script>
export default {
	name: "toast",
	props: ["state", "messagetext", "messageaction", "mode"],
	methods: {
		toggleAction() {
			this.$emit("toast-action");
		}
	}
};
</script>
