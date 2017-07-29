<template>
	<div class="container mt-130 borderg rasp-page bg-white">
		<h3>Расписание занятий</h3>
		<scheduleSearch></scheduleSearch>
		<favoritesSubscriptions v-if="userAuthorized && userHasSubscriptions" :groups="userGroups" :teachers="userTeachers"></favoritesSubscriptions>
		<div class="tab">
			<div class="bbtn bg-white">
				<header id="tab-btn">
					<span :class="{'active-tab':scheduleBlockCurrentCourse===1}" @click="changeCourse(1)">1 Курс</span>
					<span :class="{'active-tab':scheduleBlockCurrentCourse===2}" @click="changeCourse(2)">2 Курс</span>
					<span :class="{'active-tab':scheduleBlockCurrentCourse===3}" @click="changeCourse(3)">3 Курс</span>
					<span :class="{'active-tab':scheduleBlockCurrentCourse===4}" @click="changeCourse(4)">4 Курс</span>
				</header>
			</div>
			<section id="tab-page">
				<div class="active">
					<spinner v-if="scheduleBlockLoading" height="200" mode="large"></spinner>
					<div class="primary-table" v-for="(specialty, index) in scheduleBlockSpecialties" :key="index" v-if="specialty[0] !== 'undefined' && scheduleBlockFilterCourse(specialty[1],scheduleBlockCurrentCourse).length > 0">
						<div class="p-table-header">{{specialty[0]}}</div>
						<div class="table-cont">
							<router-link :to="{path: '/schedule/group/'+ group.group_id}" class="btn" v-for="group in scheduleBlockFilterCourse(specialty[1],scheduleBlockCurrentCourse)" :key="group.group_id">{{group.group}}</router-link>
						</div>
					</div>
					<div class="primary-table" v-for="(specialty, index) in scheduleBlockSpecialties" :key="index" v-if="specialty[0] === 'undefined' && scheduleBlockFilterCourse(specialty[1],scheduleBlockCurrentCourse).length > 0">
						<div class="table-cont">
							<router-link :to="{path: '/schedule/group/'+ group.group_id}" class="btn" v-for="group in scheduleBlockFilterCourse(specialty[1],scheduleBlockCurrentCourse)" :key="group.group_id">{{group.group}}</router-link>
						</div>
					</div>
				</div>
			</section>
		</div>
		<toast :state="scheduleBlockError" :messagetext="scheduleBlockErrorMessage" mode="error"></toast>
	</div>
</template>

<script>
import store from "../../store/";
import spinner from "../spinner/";
import toast from "../toast/";
import scheduleSearch from "../scheduleSearch/";
import favoritesSubscriptions from "./favoritesSubscriptions";
import _ from "lodash";
export default {
	name: "scheduleBlock",
	store,
	components: {
		spinner,
		toast,
		scheduleSearch,
		favoritesSubscriptions
	},
	async created() {
		this.$store.dispatch("scheduleBlock/getGroups");
	},
	methods: {
		changeCourse(course) {
			this.$store.commit("scheduleBlock/changeCourse", course);
		},
		scheduleBlockFilterCourse(groups, course) {
			return _.filter(groups, ["course", course]);
		}
	},
	computed: {
		userAuthorized() {
			return this.$store.getters["rightMenu/userAuthorized"];
		},
		userHasSubscriptions() {
			return this.userGroups.length > 0 || this.userTeachers.length > 0 ? true : false;
		},
		userGroups() {
			return this.$store.state.rightMenu.schedule.groups;
		},
		userTeachers() {
			return this.$store.state.rightMenu.schedule.teachers;
		},
		scheduleBlockError() {
			return this.$store.state.scheduleBlock.error;
		},
		scheduleBlockErrorMessage() {
			return this.$store.state.scheduleBlock.message;
		},
		scheduleBlockLoading() {
			return this.$store.state.scheduleBlock.loading;
		},
		scheduleBlockSpecialties() {
			return _.toPairs(_.groupBy(this.$store.state.scheduleBlock.groups, "speciality.speciality"));
		},
		scheduleBlockCurrentCourse() {
			return this.$store.state.scheduleBlock.course;
		}
	}
};
</script>
