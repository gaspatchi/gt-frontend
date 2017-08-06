<template>
	<div id="fmenu" class="full-menu" :class="{opend: mainMenuState}">
		<div class="poor-eyesight  hidden-lg-up">
			<div class="container ">
				<button class="shadow" id="visually-impaired-mode-on-mobile" @click="toggleVimPanel" v-if="!vimOpen">
					<div class="eye-img"></div>Версия для слабовидящих</button>
			</div>
		</div>
		<div class="container">
			<h1 class="f-menu-heading">
				<span>Список разделов сайта
					<br>
					<h4 class="mt-10">ГБПОУ ГТМАУ</h4>
				</span>
			</h1>
			<div class="row justify-content-center pb-10">
				<div class="col-xs-12 col-md-8 ">
					<div class="sub-full-menu">
						<ul class="site-sections lb ">
							<li>
								<a href="#">Абитуриентам</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<spinner v-show="mainMenuLoading" :height="200" :mode="'large'"></spinner>
			<div class="row justify-content-center">
				<div class="col-xs-12 col-md-4">
					<ul class="site-sections">
						<mainMenuItems :item="item" v-for="item in mainMenuLeftItems" :key="item.id"></mainMenuItems>
					</ul>
				</div>
				<div class="col-xs-12 col-md-4">
					<ul class="site-sections">
						<mainMenuItems :item="item" v-for="item in mainMenuRightItems" :key="item.id"></mainMenuItems>
					</ul>
				</div>
			</div>
		</div>
		<toast :state="mainMenuError" messagetext="При загрузке меню произошла ошибка" messageaction="Повторить" @toast-action="fetchMainMenuLinks" mode="error"></toast>
	</div>
</template>

<script>
import store from "../../store/";
import mainMenuItems from "../mainMenuItems/";
import spinner from "../spinner/";
import toast from "../toast/";
export default {
	name: "mainMenu",
	store,
	components: {
		mainMenuItems,
		spinner,
		toast
	},
	methods: {
		toggleVimPanel() {
			store.commit("visuallyImpaired/togglePanel");
		},
		fetchMainMenuLinks() {
			window.console.log("open");
			if (this.$store.state.mainMenu.open == true) {
				store.dispatch("mainMenu/fetchMainMenuItems");
			}
		}
	},
	computed: {
		vimOpen() {
			return this.$store.state.visuallyImpaired.open;
		},
		mainMenuState() {
			return this.$store.state.mainMenu.open;
		},
		mainMenuLoading() {
			return this.$store.state.mainMenu.loading;
		},
		mainMenuError() {
			return this.$store.state.mainMenu.error;
		},
		mainMenuLeftItems() {
			return this.$store.state.mainMenu.links.left;
		},
		mainMenuRightItems() {
			return this.$store.state.mainMenu.links.right;
		}

	}
};
</script>

