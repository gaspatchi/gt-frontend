<template>
	<div class="registration active" v-if="active">
		<h6>Регистрация</h6>
		<input type="name" v-validate="'required|min:2|max:15'" data-vv-delay="1000" name="Имя" placeholder="Имя" v-model.trim="firstname" :class="{incorrect:errors.has('Имя')}">
		<input type="lastname" v-validate="'required|min:2|max:15'" data-vv-delay="1000" name="Фамилия" placeholder="Фамилия" v-model.trim="lastname" :class="{incorrect:errors.has('Фамилия')}">
		<input type="email" v-validate="'required|email|min:2|max:50'" data-vv-delay="2000" name="Email" placeholder="Email" spellcheck="false" v-model.trim="email" :class="{incorrect:errors.has('Email')}">
		<input type="password" v-validate="'required|min:4'" data-vv-delay="1000" name="Пароль" placeholder="Пароль" v-model.trim="password" :class="{incorrect:errors.has('Пароль')}">
		<div class="validation-massage shake" v-if="errors.has('Имя')">
			<span>{{ errors.first('Имя') }}</span>
		</div>
		<div class="validation-massage shake" v-if="errors.has('Фамилия')">
			<span>{{ errors.first('Фамилия') }}</span>
		</div>
		<div class="validation-massage shake" v-if="errors.has('Email')">
			<span>{{ errors.first('Email') }}</span>
		</div>
		<div class="validation-massage shake" v-if="errors.has('Пароль')">
			<span>{{ errors.first('Пароль') }}</span>
		</div>
		<div class="d-flex">
			<button class="t-grey btn-40" @click="changeScreen">Назад</button>
			<button class="btn-primory btn-40" @click="registerUser">Продолжить</button>
		</div>
	</div>
</template>

<script>
import punycode from "punycode";
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
		async registerUser() {
			let correct = await this.$validator.validateAll();
			if (correct) {
				this.$emit("registerUser", { firstname: this.firstname, lastname: this.lastname, email: punycode.toASCII(this.email), password: this.password });
			}
		},
		changeScreen() {
			this.$emit("changeScreen", "login");
		}
	}
};
</script>

