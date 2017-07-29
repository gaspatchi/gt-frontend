<template>
	<div>
		<div class="rasp-search-container" :class="{active:scheduleSearchOpen}">
			<div class="input-cover borderg">
				<div class="search-icon"></div>
				<input class="rasp-search-input" type="search" placeholder="Поисковой запрос" v-model="searchSchedule" @click="openSearch">
				<spinner v-if="scheduleSearchLoading" height="0" mode="very-small"></spinner>
			</div>
			<div class="search-setting">
				<div class="radio-select">
					<label class="r-button">
						<input type="radio" value="group" v-model="type" @click="changeSearchType">
						<div class="checkmark"></div>
						<span>Группа</span>
					</label>
					<label class="r-button">
						<input type="radio" value="teacher" v-model="type" @click="changeSearchType">
						<div class="checkmark"></div>
						<span>
							<div class="hidden-lg-up">Препод.</div>
							<div class="hidden-md-down">Преподаватель</div>
						</span>
					</label>
					<label class="r-button">
						<input type="radio" value="cabinet" v-model="type" @click="changeSearchType">
						<div class="checkmark"></div>
						<span>
							<div class="hidden-lg-up">Каб.</div>
							<div class="hidden-md-down">Кабинет</div>
						</span>
					</label>
				</div>
				<div class="rasp-results" v-if="scheduleSearchType === 'group'">
					<router-link :to="{path: '/schedule/group/'+ group.group_id}" class="rasp-result" v-for="group in scheduleSearchResults" :key="group.group_id">
						<h6>{{group.group}}</h6>
						<span v-if="group.speciality">{{group.speciality.speciality}}</span>
					</router-link>
				</div>
				<div class="rasp-results" v-else-if="scheduleSearchType === 'teacher'">
					<router-link :to="{path: '/schedule/teacher/'+ teacher.teacher_id}" class="rasp-result" v-for="teacher in scheduleSearchResults" :key="teacher.teacher_id">
						<h6>{{teacher.lastname}} {{teacher.firstname[0]}}. {{teacher.patronymic[0]}}.</h6>
					</router-link>
				</div>
				<div class="rasp-results" v-else-if="scheduleSearchType === 'cabinet'">
					<a href="#" class="rasp-result" v-for="cabinet in scheduleSearchResults" :key="cabinet.cabinet_id">
						<h6>{{cabinet.cabinet}}</h6>
					</a>
				</div>
			</div>
		</div>
		<div class="rasp-search-offside" :class="{active:scheduleSearchOpen}" @click="closeSearch"></div>
		<toast :state="scheduleSearchError" :messagetext="scheduleSearchErrorMessage" mode="error"></toast>
	</div>
</template>

<script>
import store from "../../store/";
import spinner from "../spinner/";
import toast from "../toast/";
export default {
	name: "scheduleSearch",
	store,
	components: {
		spinner,
		toast
	},
	data() {
		return {
			type: "group"
		};
	},
	methods: {
		openSearch() {
			this.$store.commit("scheduleSearch/openSearch");
		},
		closeSearch() {
			this.$store.commit("scheduleSearch/closeSearch");
		},
		changeSearchType() {
			this.$store.commit("scheduleSearch/changeSearchType", this.type);
		}
	},
	computed: {
		searchSchedule: {
			get() {
				return this.$store.state.scheduleSearch.query;
			},
			set(query) {
				this.$store.dispatch("scheduleSearch/searchSchedule", query);
			}
		},
		scheduleSearchOpen() {
			return this.$store.state.scheduleSearch.open;
		},
		scheduleSearchResults() {
			return this.$store.state.scheduleSearch.results;
		},
		scheduleSearchType() {
			return this.$store.state.scheduleSearch.type;
		},
		scheduleSearchLoading() {
			return this.$store.state.scheduleSearch.loading;
		},
		scheduleSearchError() {
			return this.$store.state.scheduleSearch.error;
		},
		scheduleSearchErrorMessage() {
			return this.$store.state.scheduleSearch.message;
		}
	}
};
</script>

