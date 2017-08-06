<template>
	<div class="forget-box" v-if="active">
		<h6>Сбросить пароль</h6>
		<p>Для того чтобы сбросить пароль введите ниже email на который был зарегистрирован аккаунт.</p>
		<input type="login" v-validate="'required|email'" data-vv-delay="2000" placeholder="Email" name="Email" spellcheck="false" v-model.trim="email" :class="{incorrect:errors.has('Email')}">
		<div class="validation-massage shake" v-if="errors.has('Email')"><span>{{ errors.first('Email') }}</span></div>
		<div class="d-flex">
			<button class="t-grey btn-40" @click="changeScreen">Отмена</button>
			<button class="btn-primory btn-40" @click="postReset">Сбросить</button>
		</div>
	</div>
</template>
<script>
export default {
	name: "resetScreen",
	props: ["active"],
	data() {
		return {
			email: ""
		};
	},
	methods: {
		async postReset() {
			let correct = await this.$validator.validateAll();
			if (correct) {
				this.$emit("postReset", { email: this.email });
			}
		},
		changeScreen() {
			this.$emit("changeScreen", "login");
		}
	}
};
</script>
