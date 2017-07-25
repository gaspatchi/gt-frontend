<template>
	<div class="congratulations active" v-if="active">
		<h6>Готово!</h6>
		<p>Письмо с подтверждением регистрации отправлено на ваш email адрес, следуйте инструкциям.</p>
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
