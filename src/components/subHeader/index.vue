<template>
	<div>
		<div class="h65">
		</div>
		<div class="sub-header-menu hidden-md-down">
			<div class="container">
				<a href="#">Абитуриентам</a>
				<a href="">Студентам</a>
				<a href="">Газета</a>
				<a href="">Карта сайта</a>
				<router-link to="/schedule">Расписание</router-link>
				<button id="visually-impaired-mode-on" @click="toggleVim" v-if="!vimOpen">
					<div class="eye-img"></div>Версия для слабовидящих
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import store from "../../store/";

export default {
	name: "subHeader",
	store,
	methods: {
		toggleVim() {
			store.commit("visuallyImpaired/togglePanel");
		}
	},
	computed: {
		vimOpen() {
			return this.$store.state.visuallyImpaired.open;
		}
	}
};
</script>
