<template>
	<div class="congratulations active" v-if="active">
		<h6>Готово!</h6>
		<p>Ссылка на подтверждение аккаунта отправлена на указанный email адрес.</p>
		<div class="d-flex">
			<button class=" btn-primory btn-40" @click="changeScreen">Выполнить вход</button>
		</div>
	</div>
</template>
<script>
export default {
	name: "congratulationScreen",
	props: ["active"],
	methods: {
		changeScreen() {
			this.$emit("changeScreen", "login");
		}
	}
};
</script>
