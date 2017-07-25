<template>
	<div class="forget-box" v-if="active">
		<h6>Сбросить пароль</h6>
		<p>Для того чтобы сбросить пароль введите ниже email на который был зарегестрирован аккаунт.</p>
		<input type="login" placeholder="Email" spellcheck="false" v-model.trim="email">
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
		postReset() {
			this.$emit("postReset", { email: this.email });
		},
		changeScreen() {
			this.$emit("changeScreen", "login");
		}
	}
};
</script>
