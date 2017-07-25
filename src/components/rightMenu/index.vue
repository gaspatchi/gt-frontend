<template>
	<div class="personal-menu" :class="{opend: rightMenuOpen}">
		<div class="p-header">
			<h6 class="pheding active" v-if="rightMenuLoginState">Личный кабинет</h6>
			<div class="user-info-min" :class="{active: rightMenuProfileActive}">
				<div class="avatar img-size-40 active" v-if="!rightMenuProfileEmpty" :style="{'background-image': 'url(' + rightMenuProfile.info.meta.image + ')' }"></div>
				<div class="user-names">
					<span class="firstname" v-if="!rightMenuProfileEmpty">{{rightMenuProfile.info.profile.firstname}}</span>
					<br>
					<span class="lastname" v-if="!rightMenuProfileEmpty">{{rightMenuProfile.info.profile.lastname}}</span>
				</div>
			</div>
			<div class="p-close" @click="toggleRightMenu"></div>
		</div>
		<div class="login-cont active" v-if="rightMenuLoginState">
			<loginScreen :active="rightMenuLoginActive" @postLogin="authorizeUser" @changeScreen="changeRightMenuScreen"></loginScreen>
			<resetScreen :active="rightMenuResetActive" @postReset="resetPassword" @changeScreen="changeRightMenuScreen"></resetScreen>
			<registrationScreen :active="rightMenuRegistrationActive" @registerUser="registerUser" @changeScreen="changeRightMenuScreen"></registrationScreen>
			<congratulationScreen :active="rightMenuCongratulationActive" @changeScreen="changeRightMenuScreen"></congratulationScreen>
			<spinner v-if="rightMenuLoading" :height="120" :mode="'s-result small'"></spinner>
		</div>
		<div class="rasp-cont active" v-if="rightMenuProfileActive">
			<profileScreen :active="rightMenuProfileActive" :profile="rightMenuProfile" :subscriptions="rightMenuSubscriptions" :groupSchedule="rightMenuCurrentGroup" :teacherSchedule="rightMenuCurrentTeacher" @fetchGroup="fetchGroup" @logoutUser="logoutUser"></profileScreen>
		</div>
		<toast :state="rightMenuError" :messagetext="rightMenuErrorMessage" :mode="rightMenuErrorType"></toast>
	</div>
</template>

<script>
import _ from "lodash";
import store from "../../store/";
import spinner from "../spinner/";
import toast from "../toast/";
import loginScreen from "./loginScreen";
import resetScreen from "./resetScreen";
import registrationScreen from "./registrationScreen";
import congratulationScreen from "./congratulationScreen";
import profileScreen from "./profileScreen";
export default {
	name: "rightMenu",
	store,
	components: {
		spinner,
		toast,
		loginScreen,
		resetScreen,
		registrationScreen,
		congratulationScreen,
		profileScreen
	},
	methods: {
		toggleRightMenu() {
			this.$store.commit("rightMenu/toggleMenu");
		},
		changeRightMenuScreen(screen) {
			this.$store.commit("rightMenu/changeScreen", screen);
		},
		authorizeUser(loginData) {
			this.$store.dispatch("rightMenu/authorizeUser", loginData);
		},
		resetPassword(resetData) {
			this.$store.dispatch("rightMenu/resetPassword", resetData);
		},
		registerUser(registrationData) {
			this.$store.dispatch("rightMenu/registerUser", registrationData);
		},
		logoutUser() {
			this.$store.dispatch("rightMenu/logoutUser");
		},
		fetchGroup(group_id) {
			this.$store.dispatch("rightMenu/getGroupSchedule", group_id);
		}
	},
	computed: {
		rightMenuProfileEmpty() {
			return this.$store.getters["rightMenu/profileEmpty"];
		},
		rightMenuSubscriptionsEmpty() {
			return _.isEmpty(this.$store.state.rightMenu.subscriptions);
		},
		rightMenuProfile() {
			return this.$store.getters["rightMenu/userProfile"];
		},
		rightMenuLoading() {
			return this.$store.state.rightMenu.loading;
		},
		rightMenuError() {
			return this.$store.state.rightMenu.error;
		},
		rightMenuErrorMessage() {
			return this.$store.state.rightMenu.message;
		},
		rightMenuErrorType() {
			return this.$store.state.rightMenu.type;
		},
		rightMenuOpen() {
			return this.$store.state.rightMenu.open;
		},
		rightMenuScreen() {
			return this.$store.state.rightMenu.screen;
		},
		rightMenuLoginState() {
			return this.rightMenuProfileActive !== true;
		},
		rightMenuProfileActive() {
			return this.$store.state.rightMenu.screen === "profile";
		},
		rightMenuLoginActive() {
			return this.$store.state.rightMenu.screen === "login";
		},
		rightMenuResetActive() {
			return this.$store.state.rightMenu.screen === "reset";
		},
		rightMenuRegistrationActive() {
			return this.$store.state.rightMenu.screen === "registration";
		},
		rightMenuCongratulationActive() {
			return this.$store.state.rightMenu.screen === "congratulation";
		},
		rightMenuSubscriptions() {
			return this.$store.getters["rightMenu/UserSubscriptions"];
		},
		rightMenuCurrentGroup() {
			return this.$store.state.rightMenu.schedule.group;
		},
		rightMenuCurrentTeacher() {
			return this.$store.state.rightMenu.schedule.teacher;
		}
	},
	created() {
		let token = localStorage.getItem("gtmau_token");
		if (token !== null) {
			this.$store.commit("rightMenu/saveUserToken", token);
			this.$store.dispatch("rightMenu/getUserProfile", token);
			this.$store.dispatch("rightMenu/getUserSubscriptions", token);
		}
	}
};
</script>
