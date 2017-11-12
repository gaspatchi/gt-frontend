<template>
	<div class="container mt-130 borderg rasp-page bg-white account-settings" v-if="userAuthorized">
		<div class="user-info">
			<div class="avatar active img-size-40" :class="{'avatar-pulse':errors.has('Аватар')}" :style="{'background-image': 'url(' + userProfileImage + ')' }">
				<div class="profile-img">
					<div class="add-pofile-img">
						<input type="file" v-validate="'image|dimensions:200,200'" name="Аватар" @change="updateProfileImage">
						<div class="add-img-icon"></div>
					</div>
				</div>
				<spinner v-if="userProfileLoading" :height="30" mode="large"></spinner>
			</div>
			<div class="user-names">
				<span class="firstname" v-if="!userProfileEmpty">{{userProfile.info.profile.firstname}}</span>
				<br>
				<span class="lastname" v-if="!userProfileEmpty">{{userProfile.info.profile.lastname}}</span>
			</div>
		</div>
		<div class="tab current-timetable">
			<div class="bbtn bg-white">
				<header id="tab-btn">
					<span :class="{'active-tab': userProfileCurrentScreen==='settings'}" @click="userProfileChangeScreen('settings')">Личные данные</span>
					<span :class="{'active-tab': userProfileCurrentScreen==='subscriptions'}" @click="userProfileChangeScreen('subscriptions')">Подписки</span>
				</header>
			</div>
			<section id="tab-page">
				<settingsScreen v-if="userProfileCurrentScreen==='settings' && !userProfileEmpty" :profile="userProfile" @updateProfile="updateProfile"></settingsScreen>
				<subscriptionsScreen v-if="userProfileCurrentScreen==='subscriptions'" :userProfileGroups="userProfileGroups" :userProfileTeachers="userProfileTeachers" :dispatch="userProfileDispatch" @postDispatch="postDispatch"></subscriptionsScreen>
			</section>
		</div>
		<toast :state="userProfileToast" :messagetext="userProfileToastMessage" :mode="userProfileToastType"></toast>
		<toast :state="errors.has('Аватар')" :messagetext="errors.first('Аватар')" mode="warning"></toast>

	</div>
	<div class="container mt-130 borderg rasp-page bg-white account-settings" v-else>
		<div class="info-settings">
			<div class="animated-gt-logo">
				<img class="collectors" src="../../assets/img/animated_logo/collectors.svg">
				<img class="logo-without-collectors" src="../../assets/img/animated_logo/track.svg">
				<img class="cover-1x1" src="../../assets/img/animated_logo/1x1-cover.svg">
			</div>
			<h4>Вы не вошли в аккаунт</h4>
			<h6>Войдите чтобы воспользоваться возможностями нашего сервиса </h6>
			<button class="btn-primory btn-40 btn-pulse" @click="openRightMenu">Войти в профиль</button>
		</div>
	</div>
</template>

<script>
import store from "../../store/";
import spinner from "../spinner/";
import toast from "../toast/";
import settingsScreen from "./settingsScreen";
import subscriptionsScreen from "./subscriptionsScreen";
export default {
	name: "userProfile",
	store,
	components: {
		spinner,
		toast,
		settingsScreen,
		subscriptionsScreen
	},
	created() {
		this.$store.dispatch("userProfile/getDispatch");
	},
	methods: {
		userProfileChangeScreen(screen) {
			this.$store.commit("userProfile/changeScreen", screen);
		},
		postDispatch(payload) {
			this.$store.dispatch("userProfile/postDispatch", payload);
		},
		updateProfile(payload) {
			this.$store.dispatch("userProfile/updateProfile", payload);
		},
		async updateProfileImage(event) {
			let correct = await this.$validator.validateAll();
			let file = event.target.files || event.dataTransfer.files;
			if (correct && file.length === 1) {
				let reader = new FileReader();
				reader.onloadend = () => {
					this.$store.dispatch("userProfile/updateProfile", { image: reader.result });
				};
				reader.readAsDataURL(file[0]);
			}
		},
		openRightMenu() {
			this.$store.commit("rightMenu/changeScreen", "login");
			this.$store.commit("rightMenu/openMenu");
		}
	},
	computed: {
		userProfileImage() {
			return this.userProfileEmpty === true ? null : this.userProfile.info.meta.image;
		},
		userProfileCurrentScreen() {
			return this.$store.state.userProfile.screen;
		},
		userProfileEmpty() {
			return this.$store.getters["rightMenu/profileEmpty"];
		},
		userProfile() {
			return this.$store.getters["rightMenu/userProfile"];
		},
		userSubscriptions() {
			return this.$store.getters["rightMenu/UserSubscriptions"];
		},
		userProfileDispatch() {
			return this.$store.state.userProfile.dispatch;
		},
		userAuthorized() {
			return this.$store.getters["rightMenu/userAuthorized"];
		},
		userProfileLoading() {
			return this.$store.state.userProfile.loading;
		},
		userProfileGroups() {
			return this.$store.state.rightMenu.schedule.groups;
		},
		userProfileTeachers() {
			return this.$store.state.rightMenu.schedule.teachers;
		},
		userProfileToast() {
			return this.$store.state.userProfile.error;
		},
		userProfileToastType() {
			return this.$store.state.userProfile.type;
		},
		userProfileToastMessage() {
			return this.$store.state.userProfile.message;
		}
	}
};
</script>
