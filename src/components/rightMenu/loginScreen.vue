<template>
	<div class="login active" v-if="active">
		<h6>Добро пожаловать</h6>
		<input type="login" placeholder="email" spellcheck="false" v-model.trim="email">
		<input type="password" placeholder="Пароль" v-model.trim="password">
		<div class="d-flex">
			<button class="btn-primory btn-40" @click="postLogin">Войти</button>
			<button class="t-grey btn-40" @click="changeScreen('registration')">Регистрация</button>
		</div>
		<a class="forget active" @click="changeScreen('reset')">Забыли пароль?</a>
	</div>
</template>
<script>
export default {
	name: "loginScreen",
	props: ["active"],
	data() {
		return {
			email: "",
			password: ""
		};
	},
	methods: {
		postLogin() {
			this.$emit("postLogin", { email: this.email, password: this.password });
		},
		changeScreen(screen) {
			this.$emit("changeScreen", screen);
		}
	}
};
</script>
