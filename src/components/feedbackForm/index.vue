<template>
	<div class="container mobile-wp-container">
		<div class="all-news-row">
			<div class="container-wp-page">
				<div class="heading-wp-page">
					<div class="headline">
						<h1>Форма обратной связи</h1>
					</div>
					<p>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона.</p>
					<div class="feedback-cont">
						<div class="feedback-info">
							<input type="text" v-validate="'required|min:2'" data-vv-delay="1000" name="Имя" placeholder="Имя" v-model="firstname" :class="{incorrect:errors.has('Имя')}">
							<div class="validation-massage shake" v-if="errors.has('Имя')">
								<span>{{ errors.first('Имя') }}</span>
							</div>
							<input type="text" v-validate="'required|min:2'" data-vv-delay="1000" name="Фамилия" placeholder="Фамилия" v-model="lastname" :class="{incorrect:errors.has('Фамилия')}">
							<div class="validation-massage shake" v-if="errors.has('Фамилия')">
								<span>{{ errors.first('Фамилия') }}</span>
							</div>
							<input type="text" v-validate="'required|min:11|max:11'" data-vv-delay="2000" name="Телефон" placeholder="8 (___) __-__-___" v-model="number" :class="{incorrect:errors.has('Телефон')}">
							<div class="validation-massage shake" v-if="errors.has('Телефон')">
								<span>{{ errors.first('Телефон') }}</span>
							</div>
							<input type="text" v-validate="'required|email'" data-vv-delay="2000" name="Email" placeholder="Email" v-model="email" :class="{incorrect:errors.has('Email')}">
							<div class="validation-massage shake" v-if="errors.has('Email')">
								<span>{{ errors.first('Email') }}</span>
							</div>
						</div>
						<textarea v-validate="'required|min:10'" name="Текст" placeholder="Ваше сообщение..." v-model="text" :class="{incorrect:errors.has('Текст')}"></textarea>
					</div>
					<div class="after-feedback">
						<div class="feedback-stat">
							<span>{{feedbackFormCount}}</span> - столько человек уже воспользовались формой обратной связи</div>
						<button class="btn-40 btn-primory shadow" @click="postFeedbackForm">Отправить</button>
					</div>
					<spinner v-if="feedbackFormLoading" :height="50" mode="small"></spinner>
				</div>
			</div>
		</div>
		<toast :state="feedbackFormError" :messagetext="feedbackFormErrorMessage" mode="error"></toast>
		<toast :state="feedbackFormSuccess" :messagetext="'Номер вашего обращения - ' + feedbackFormSuccessMessage" mode="success"></toast>
	</div>
</template>
<script>
import store from "../../store/";
import spinner from "../spinner/";
import toast from "../toast/";
export default {
	name: "feedbackForm",
	store,
	components: {
		spinner,
		toast
	},
	data() {
		return {
			firstname: "",
			lastname: "",
			number: "",
			email: "",
			text: ""
		};
	},
	created() {
		this.$store.dispatch("feedbackForm/getFeedbackCount");
	},
	methods: {
		async postFeedbackForm() {
			let correct = await this.$validator.validateAll();
			if (correct) {
				this.$store.dispatch("feedbackForm/postFeedbackForm", {
					firstname: this.firstname,
					lastname: this.lastname,
					number: this.number,
					email: this.email,
					text: this.text
				});
			}
		}
	},
	computed: {
		feedbackFormCount() {
			return this.$store.state.feedbackForm.count;
		},
		feedbackFormError() {
			return this.$store.state.feedbackForm.error;
		},
		feedbackFormErrorMessage() {
			return this.$store.state.feedbackForm.message;
		},
		feedbackFormSuccess() {
			return this.$store.state.feedbackForm.success;
		},
		feedbackFormSuccessMessage() {
			return this.$store.state.feedbackForm.id;
		},
		feedbackFormLoading() {
			return this.$store.state.feedbackForm.loading;
		}
	}
};
</script>
