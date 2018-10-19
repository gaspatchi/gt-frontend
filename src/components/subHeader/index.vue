<template>
	<div>
		<div class="h65"></div>
		<div class="sub-header-menu hidden-md-down">
			<div class="container">
				<router-link :to="{path: '/page/'+ one}">Абитуриентам</router-link>
				<router-link :to="{path: '/page/'+ two}">Студентам</router-link>
				<router-link :to="{path: '/page/'+ three}">Документы</router-link>
				<router-link to="/feedback">Обратная связь</router-link>
				<router-link :to="{path: '/page/'+ four}">Расписание занятий</router-link>
				<button id="visually-impaired-mode-on" @click="toggleVim" v-if="!vimOpen">
					<div class="eye-img"></div>Версия для слабовидящих
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import store from "../../store/";
import { th_one, th_two, th_three, th_four } from "../../api/config.js";
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
		},
		one() {
			return th_one;
		},
		two() {
			return th_two;
		},
		three() {
			return th_three;
		},
		four() {
			return th_four;
		}
	}
};
</script>
