<template>
	<div class="container mt-130 borderg rasp-page bg-white account-settings">
		<successRegistration v-if="verificationBlockType==='registration' && verificationBlockStatus===true"></successRegistration>
		<success v-if="verificationBlockType!=='registration' && verificationBlockStatus===true" :title="verificationBlockSuccessTitle" :description="verificationBlockSuccessDescription" button="Войти в аккаунт" @successClick="successClick"></success>
		<error v-if="verificationBlockStatus===false" :title="verificationBlockErrorTitle" :description="verificationBlockErrorDescription" button="Повторить" @errorClick="errorClick"></error>
		<spinner v-if="verificationBlockLoading" :height="100" mode="large"></spinner>
		<toast :state="verificationBlockError" :messagetext="verificationBlockErrorMessage" :mode="verificationBlockErrorType"></toast>
	</div>
</template>
<script>
import store from "../../store/";
import spinner from "../spinner/";
import toast from "../toast/";
import successRegistration from "./successRegistration";
import success from "./success";
import error from "./error";

export default {
	name: "verificationBlock",
	store,
	components: {
		spinner,
		toast,
		successRegistration,
		success,
		error
	},
	created() {
		this.$store.dispatch("verificationBlock/verifyToken", this.$store.state.routerState.params.token);
	},
	methods: {
		successClick() {
			this.$store.commit("rightMenu/changeScreen", "login");
			this.$store.commit("rightMenu/openMenu");
		},
		errorClick() {
			this.$store.dispatch("verificationBlock/verifyToken", this.$store.state.routerState.params.token);
		}
	},
	computed: {
		verificationBlockType() {
			return this.$store.state.routerState.params.type;
		},
		verificationBlockStatus() {
			return this.$store.state.verificationBlock.status;
		},
		verificationBlockLoading() {
			return this.$store.state.verificationBlock.loading;
		},
		verificationBlockError() {
			return this.$store.state.verificationBlock.error;
		},
		verificationBlockErrorMessage() {
			return this.$store.state.verificationBlock.message;
		},
		verificationBlockErrorType() {
			return this.$store.state.verificationBlock.type;
		},
		verificationBlockSuccessTitle() {
			return this.verificationBlockType === "reset" ? "Успешный сброс пароля" : "Успешная верификация";
		},
		verificationBlockSuccessDescription() {
			return this.verificationBlockType === "reset" ? "Войдите в аккаунт с паролем, отправленным в пиьсме" : "Войдите чтобы воспользоваться нашим сервисом";
		},
		verificationBlockErrorTitle() {
			return this.verificationBlockType === "registration" ? "Невозможно произвести регистрацию" : "Невозможно произвести верификацию";
		},
		verificationBlockErrorDescription() {
			return this.verificationBlockType === "registration" ? "Подтверждение регистрации не было выполнено" : "Верификация не была выполнена";
		}
	}
};
</script>
