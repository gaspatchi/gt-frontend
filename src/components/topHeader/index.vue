<template>
	<div class="gt-header" :class="{'head-border': !mainMenuOpen}" id="fadeborder">
		<div class="container">
			<div class="d-flex f-sb">
				<div class="h-left-part">
					<div class="spinner-master2">
						<input type="checkbox" id="spinner-form2" ref="gamburger" @click="toggleMainMenu" />
						<label for="spinner-form2" class="spinner-spin2">
							<div class="spinner2 diagonal part-1"></div>
							<div class="spinner2 horizontal"></div>
							<div class="spinner2 diagonal part-2"></div>
						</label>
					</div>
	
					<router-link :to="'/'" class="a-reset">
						<div class="logo t-shadow">
							<div class="name-gt">ГТМАУ</div>
						</div>
					</router-link>
				</div>
				<div class="h-right-part d-flex">
					<topSearch></topSearch>
					<a class="btn-40 button btn-white shadow" :class="{inactive: !userAuthorized}">
						<div class="hidden-md-up">ЛК</div>
						<div class="hidden-sm-down">Личный кабинет</div>
					</a>
					<button class="btn-40 btn-white shadow" @click="toggleRightMenu" v-if="!userAuthorized">
						Войти
					</button>
					<a class="avatar img-size-40" v-if="!rightMenuOpen && !rightMenuProfileEmpty" :class="{active: !rightMenuProfileEmpty}" :style="{ 'background: none;': !rightMenuOpen, 'background-image': 'url(' + rightMenuProfile.info.meta.image + ')' }" @click="toggleRightMenu"></a>
				</div>
			</div>
	
		</div>
	</div>
</template>

<script>
import store from "../../store/";
import topSearch from "../topSearch/";
export default {
	name: "topHeader",
	store,
	components: {
		topSearch
	},
	methods: {
		toggleMainMenu() {
			if (this.$store.state.mainMenu.open == false) {
				this.$store.commit("mainMenu/toggleMenu");
				this.$store.dispatch("mainMenu/fetchMainMenuItems");
			} else {
				this.$store.commit("mainMenu/toggleMenu");
			}
		},
		toggleRightMenu() {
			this.$store.commit("rightMenu/toggleMenu");
		}
	},
	computed: {
		mainMenuOpen() {
			return this.$store.state.mainMenu.open;
		},
		rightMenuOpen() {
			return this.$store.state.rightMenu.open;
		},
		rightMenuProfileEmpty() {
			return this.$store.getters["rightMenu/profileEmpty"];
		},
		rightMenuProfile() {
			return this.$store.getters["rightMenu/userProfile"];
		},
		userAuthorized() {
			return this.$store.getters["rightMenu/userAuthorized"];
		}
	},
	watch: {
		mainMenuOpen(open) {
			if (open === false) {
				this.$refs.gamburger.checked = false;
			}
		}
	}
};
</script>
