<template>
	<div class="login active" v-if="active">
		<h6>Добро пожаловать</h6>
		<input type="login" v-validate="'required|email|min:2|max:50'" data-vv-delay="2000" placeholder="Email" name="Email" spellcheck="false" v-model.trim="email" :class="{incorrect:errors.has('Email')}">
		<input type="password" v-validate="'required|min:4'" data-vv-delay="1000" name="Пароль" placeholder="Пароль" v-model.trim="password" :class="{incorrect:errors.has('Пароль')}">
		<div class="validation-massage shake" v-if="errors.any()">
			<span>{{ errors.first('Email') }}
				<br>{{ errors.first('Пароль') }}</span>
		</div>
		<div class="d-flex">
			<button class="btn-primory btn-40" @click="postLogin">Войти</button>
			<button class="t-grey btn-40" @click="changeScreen('registration')">Регистрация</button>
		</div>
		<a class="forget active" @click="changeScreen('reset')">Забыли пароль?</a>
	</div>
</template>
<script>
import punycode from "punycode";
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
		async postLogin() {
			let correct = await this.$validator.validateAll();
			if (correct) {
				this.$emit("postLogin", { email: punycode.toASCII(this.email), password: this.password });
			}
		},
		changeScreen(screen) {
			this.$emit("changeScreen", screen);
		}
	}
};
</script>
