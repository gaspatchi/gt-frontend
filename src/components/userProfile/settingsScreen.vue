<template>
	<div class="active">
		<div class="two-primory-tables-inline">
			<div class="primary-table">
				<div class="p-table-header">Имя и фамилия</div>
				<div class="table-cont" :class="{incorrect:errors.has('Имя')}">
					<h6>Имя:</h6>
					<input class="edit-input" type="text" v-validate="'min:2|max:15'" name="Имя" v-model.trim="data.firstname" :readonly="!state.firstname">
					<div class="edit-icon" v-if="state.firstname === false" @click="toggleInput('firstname',true)"></div>
					<div class="edit-icon save" v-else @click="updateProfile('firstname')"></div>
				</div>
				<div class="table-cont" :class="{incorrect:errors.has('Фамилия')}">
					<h6>Фамилия:</h6>
					<input class="edit-input" type="text" v-validate="'min:2|max:15'" name="Фамилия" v-model.trim="data.lastname" :readonly="!state.lastname">
					<div class="edit-icon" v-if="state.lastname === false" @click="toggleInput('lastname',true)"></div>
					<div class="edit-icon save" v-else @click="updateProfile('lastname')"></div>
				</div>
			</div>
			<div class="primary-table">
				<div class="p-table-header">Контакты</div>
				<div class="table-cont">
					<h6>Email:</h6>
					<input class="edit-input" type="text" :value="data.email" readonly>
				</div>
				<div class="table-cont" :class="{incorrect:errors.has('Номер')}">
					<h6>Телефон:</h6>
					<input class="edit-input" type="text" v-validate="'digits:11'" name="Номер" v-model.trim="listenNumber" :readonly="!state.number">
					<div class="edit-icon" v-if="state.number === false" @click="toggleInput('number',true)"></div>
					<div class="edit-icon save" v-else @click="updateProfile('number')"></div>
				</div>
			</div>
		</div>
		<div class="two-primory-tables-inline">
			<div class="primary-table">
				<div class="p-table-header">Изменить пароль</div>
				<div class="table-cont new-password show" v-if="state.password==='start'">
					<p>Придумайте длинный пароль из букв и цифр, который вам будет легко запомнить, а другим - сложно угадать.
					</p>
					<button class="btn-40 btn-primory shadow new-pass" @click="toggleInput('password','change')">Новый пароль</button>
				</div>
				<div class="table-cont write-new-password show" v-if="state.password==='change'" :class="{incorrect:errors.has('Пароль')}">
					<h6 class="hidden-md-down">Новый пароль:</h6>
					<input type="password" placeholder="Новый пароль" v-validate="'required|min:4'" v-model.trim="data.password" name="Пароль">
					<button class="btn-40 btn-primory shadow new-pass" @click="updateProfile('password')">Далее</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import punycode from "punycode";
export default {
	name: "settingsScreen",
	props: ["empty", "profile"],
	data() {
		return {
			state: {
				firstname: false,
				lastname: false,
				number: false,
				password: "start"
			},
			data: {
				firstname: this.$props.profile.info.profile.firstname,
				lastname: this.$props.profile.info.profile.lastname,
				email: punycode.toUnicode(this.$props.profile.info.contacts.email),
				number: this.$props.profile.info.contacts.number,
				password: ""
			}
		};
	},
	methods: {
		toggleInput(key, value) {
			this.state[key] = value;
		},
		async updateProfile(key) {
			let correct = await this.$validator.validateAll();
			if (correct) {
				this.toggleInput(key, false);
				this.$emit("updateProfile", { [key]: this.data[key] });
			}
		}
	},
	computed: {
		listenNumber: {
			get() {
				if (this.data.number === false) {
					return "";
				} else {
					return this.data.number;
				}
			},
			set(value) {
				this.data.number = value;
			}
		}
	}
};
</script>
