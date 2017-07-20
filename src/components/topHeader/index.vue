<template>
	<div class="gt-header" :class="{'head-border': !mainMenuOpen}" id="fadeborder">
		<div class="container">
			<div class="d-flex f-sb">
				<div class="h-left-part">
					<div class="spinner-master2">
						<input type="checkbox" id="spinner-form2" @click="toggleMainMenu" />
						<label for="spinner-form2" class="spinner-spin2">
							<div class="spinner2 diagonal part-1"></div>
							<div class="spinner2 horizontal"></div>
							<div class="spinner2 diagonal part-2"></div>
						</label>
					</div>
	
					<router-link :to="'/test'" class="a-reset">
						<div class="logo t-shadow">
							<div class="name-gt">ГТМАУ</div>
						</div>
					</router-link>
				</div>
				<div class="h-right-part d-flex">
					<topSearch></topSearch>
					<a class="btn-40 button btn-white shadow inactive" href="account-settings.html" id="personalpage">
						<div class="hidden-md-up">ЛК</div>
						<div class="hidden-sm-down">Личный кабинет</div>
					</a>
					<button class="btn-40 btn-white shadow " id="go-login">
						Войти
					</button>
					<a class="avatar img-size-40">
						<div class="profile-img" id="p-m-o"></div>
					</a>
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
				store.commit("mainMenu/toggleMenu");
				store.dispatch("mainMenu/fetchMainMenuItems");
			} else {
				store.commit("mainMenu/toggleMenu");
			}
		}
	},
	computed: {
		mainMenuOpen() {
			return this.$store.state.mainMenu.open;
		}
	}
};
</script>
