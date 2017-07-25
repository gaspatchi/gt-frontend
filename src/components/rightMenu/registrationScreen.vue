<template>
	<div class="registration active" v-if="active">
		<h6>Регистрация</h6>
		<input type="name" placeholder="Имя" v-model.trim="firstname">
		<input type="lastname" placeholder="Фамилия" v-model.trim="lastname">
		<input type="email" placeholder="Email" spellcheck="false" v-model.trim="email">
		<input type="password" placeholder="Пароль" v-model.trim="password">
		<div class="d-flex">
			<button class="t-grey btn-40" @click="changeScreen">Назад</button>
			<button class="btn-primory btn-40" @click="registerUser">Продолжить</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "registrationScreen",
	props: ["active"],
	data() {
		return {
			firstname: "",
			lastname: "",
			email: "",
			password: ""
		};
	},
	methods: {
		registerUser() {
			this.$emit("registerUser", { firstname: this.firstname, lastname: this.lastname, email: this.email, password: this.password });
		},
		changeScreen() {
			this.$emit("changeScreen", "login");
		}
	}
};
</script>

