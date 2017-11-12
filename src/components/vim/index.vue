<template>
	<nav class="visually-impaired-mode">
		<div class="container">
			<div class="choose-fz">
				<label class="hidden-sm-down">Размер шрифта: </label>
				<div class="size-group">
					<input type="radio" id="text-mode1" name="radio" :checked="modeVim === 'default'" @click="changeVimMode('default')"/>
					<label for="text-mode1">
						<span>А</span>
					</label>
					<input type="radio" id="text-mode2" name="radio" :checked="modeVim === 'medium'"  @click="changeVimMode('medium')"/>
					<label for="text-mode2">
						<span>А</span>
					</label>
					<input type="radio" id="text-mode3" name="radio" :checked="modeVim === 'large'" @click="changeVimMode('large')"/>
					<label for="text-mode3">
						<span>А</span>
					</label>
				</div>
			</div>
			<div class="choose-color">
				<label class="hidden-sm-down">Цветовая схема: </label>
				<div class="color-group">
					<button class="color-mode1" @click="toggleVimBlack(false)"></button>
					<button class="color-mode2" @click="toggleVimBlack(true)"></button>
				</div>
			</div>
			<button class="normal-mode" @click="toggleVim">
				<div class="eye-img "></div>
				<span class="hidden-sm-down">Обычная версия</span>
				<span class="hidden-md-up">Отмена</span>
			</button>
		</div>
	</nav>
</template>

<script>
import store from "../../store/";
export default {
	name: "Vim",
	store,
	methods: {
		toggleVim() {
			store.commit("visuallyImpaired/togglePanel");
		},
		toggleVimBlack(state) {
			store.commit("visuallyImpaired/toggleBlack", { state });
		},
		changeVimMode(mode) {
			this.$store.commit("visuallyImpaired/changeMode", { mode });
		}
	},
	computed: {
		openVim() {
			return this.$store.state.visuallyImpaired.open;
		},
		blackVim() {
			return this.$store.state.visuallyImpaired.black;
		},
		modeVim() {
			return this.$store.state.visuallyImpaired.mode;
		}
	},
	watch: {
		openVim(state) {
			let body = document.querySelector("#vim");
			if (state === true) {
				body.classList.toggle("vim-on");
			} else {
				body.classList.remove("vim-on");
			}
		},
		blackVim(state) {
			let body = document.querySelector("#vim");
			if (state === true) {
				body.classList.add("black");
			} else {
				body.classList.remove("black");
			}
		},
		modeVim(state) {
			let body = document.querySelector("#vim");
			if (state === "default") {
				body.classList.remove("large-text");
				body.classList.remove("more-large-text");
			} else if (state === "medium") {
				body.classList.remove("more-large-text");
				body.classList.add("large-text");
			} else if (state === "large") {
				body.classList.remove("large-text");
				body.classList.add("more-large-text");
			}
		}
	}
};
</script>
