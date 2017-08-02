<template>
	<div class="container mt-130 borderg rasp-page bg-white">
		<h3>Расписание занятий</h3>
		<scheduleSearch></scheduleSearch>
		<div class="current-rasp-header bbtn">
			<div class="col-4">
				<router-link to="/schedule" class="back-to-list-timetable">
					<div class="back-icon"></div>Назад
				</router-link>
			</div>
			<div class="col-4 currnet-name">
				<span class="hidden-sm-down">Преподаватель</span>
			</div>
			<div class="col-4">
				<favoriteSubscription v-if="userAuthorized" type="teacher" :id="teacherScheduleTeacher" :subscriptions="userSubscriptions" @addSubscription="addUserSubscription" @deleteSubscription="deleteUserSubscription"></favoriteSubscription>
			</div>
		</div>
		<div class="primary-table d-flex" v-if="!teacherScheduleInfoEmpty">
			<div class="currnt-name teacher">
				<div class="teacher-photo" :style="{ 'background-image': 'url(' + teacherScheduleInfo.teacher.image + ')' }"></div>
				<h5 v-if="teacherScheduleInfo.teacher.verified === true">{{teacherScheduleInfo.teacher.lastname}}
					<br>{{teacherScheduleInfo.teacher.firstname}} {{teacherScheduleInfo.teacher.patronymic}}</h5>
				<h5 v-else>{{teacherScheduleInfo.teacher.firstname}}</h5>
			</div>
			<div class="about-of-name">
				<div class="about-line" v-if="teacherScheduleInfo.teacher.email">
					<div class="mail-icon-grey"></div>
					<div class="name-of-line">
						<span>Электронная почта:</span>
						<br>{{teacherScheduleInfo.teacher.email}}
					</div>
				</div>
				<div class="about-line" v-if="teacherScheduleInfo.teacher.email">
					<div class="specialty-icon"></div>
					<div class="name-of-line">
						<span>Должность:</span>
						<br>{{teacherScheduleInfo.teacher.post}}
					</div>
				</div>
			</div>
		</div>
		<div class="tab current-timetable">
			<div class="bbtn bg-white">
				<header id="tab-btn">
					<span :class="{'active-tab':teacherScheduleScreen==='schedule'}" @click="changeScreen('schedule')">Занятия</span>
					<span :class="{'active-tab':teacherScheduleScreen==='activity'}" @click="changeScreen('activity')">Деятельность</span>
				</header>
				<datePicker v-if="teacherScheduleScreen==='schedule'" :current="teacherScheduleDate" :dates="teacherScheduleDates" @selectDate="getTeacherSchedule"></datePicker>
			</div>
			<section id="tab-page">
				<div class="active" v-if="teacherScheduleScreen==='schedule'">
					<div class="primary-table rasp">
						<spinner v-if="teacherScheduleLoading" :height="300" mode="large"></spinner>
						<table v-if="teacherSchedule">
							<tbody v-if="!teacherScheduleLoading">
								<tr class="p-table-header">
									<td class="numb">№</td>
									<td class="time">Время</td>
									<td class="name-lession">Предмет</td>
									<td class="teacher">Группа</td>
									<td class="class-room">
										<div class="hidden-lg-up">Каб.</div>
										<div class="hidden-md-down">Кабиент</div>
									</td>
								</tr>
								<tr class="line-lession" v-for="pair in teacherSchedule" :key="pair.index">
									<td class="numb">
										<div class="cover">{{pair.index}}</div>
									</td>
									<td class="time">
										<div class="d-flex">
											<div class="time-icon"></div>
											{{getPairTime(pair.index).start}}
											<br>{{getPairTime(pair.index).end}}
										</div>
									</td>
									<td class="name-lession">
										{{pair.lesson.lesson}}
									</td>
									<td class="teacher">{{pair.group.group}}</td>
									<td class="class-room">{{pair.cabinet.cabinet}}</td>
								</tr>
	
							</tbody>
						</table>
					</div>
					<div class="primary-table mobile-rasp">
						<div class="p-menu-table">
							<table v-if="teacherSchedule">
								<tbody v-if="!teacherScheduleLoading">
									<tr v-for="pair in teacherSchedule" :key="pair.index">
										<td>
											<span class="btn-25 btn-primory">{{pair.index}}</span>
										</td>
										<td>{{getPairTime(pair.index).start}}
											<br>{{getPairTime(pair.index).end}}</td>
										<td>
											<div class="subject">{{pair.lesson.lesson}}</div>
											<div class="d-flex">
												<div class="teacher">{{pair.group.group}}</div>
												<div class="kab">{{pair.cabinet.cabinet}}</div>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div class="active" v-if="teacherScheduleScreen==='activity'">
					<div class="two-primory-tables-inline" v-if="!teacherScheduleInfoEmpty">
						<div class="primary-table">
							<div class="p-table-header">Предметы</div>
							<div class="table-cont" v-for="lesson in teacherScheduleInfo.lessons" :key="lesson.lesson.lesson_id">
								<h6>{{lesson.lesson.lesson}}</h6>
							</div>
						</div>
						<div class="primary-table">
							<div class="p-table-header">Группы</div>
							<div class="table-cont">
								<router-link :to="{path: '/schedule/group/'+ group.group.group_id}" class="btn" v-for="group in teacherScheduleInfo.groups" :key="group.group.group_id">{{group.group.group}}</router-link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
		<toast :state="teacherScheduleError" :messagetext="teacherScheduleErrorMessage" mode="error"></toast>
	</div>
</template>
<script>
import store from "../../store/";
import spinner from "../spinner/";
import toast from "../toast/";
import scheduleSearch from "../scheduleSearch/";
import datePicker from "../datePicker/";
import favoriteSubscription from "../favoriteSubscription/";
import _ from "lodash";
export default {
	name: "teacherSchedule",
	store,
	components: {
		spinner,
		toast,
		scheduleSearch,
		datePicker,
		favoriteSubscription
	},
	created() {
		this.$store.dispatch("teacherSchedule/getTeacherInfo", this.$store.state.routerState.params.teacher_id);
	},
	methods: {
		changeScreen(screen) {
			this.$store.commit("teacherSchedule/changeScreen", screen);
		},
		getTeacherSchedule(date) {
			this.$store.dispatch("teacherSchedule/getTeacherSchedule", date);
		},
		addUserSubscription(payload) {
			this.$store.dispatch("teacherSchedule/addUserSubscription", payload);
		},
		deleteUserSubscription(payload) {
			this.$store.dispatch("teacherSchedule/deleteUserSubscription", payload);
		},
		getPairTime(index) {
			switch (index) {
				case 1:
					return { start: "8:30", end: "9:55" };
				case 2:
					return { start: "10:10", end: "11:30" };
				case 3:
					return { start: "12:15", end: "13:50" };
				case 4:
					return { start: "14:10", end: "15:30" };
				case 5:
					return { start: "16:15", end: "17:50" };
			}
		}
	},
	computed: {
		teacherScheduleTeacher() {
			return this.$store.state.teacherSchedule.teacher;
		},
		teacherScheduleInfoEmpty() {
			return _.isEmpty(this.$store.state.teacherSchedule.info);
		},
		teacherScheduleInfo() {
			return this.$store.state.teacherSchedule.info;
		},
		teacherSchedule() {
			return this.$store.state.teacherSchedule.schedule;
		},
		teacherScheduleDate() {
			return this.$store.state.teacherSchedule.date;
		},
		teacherScheduleDates() {
			return this.$store.state.teacherSchedule.dates;
		},
		teacherScheduleScreen() {
			return this.$store.state.teacherSchedule.screen;
		},
		teacherScheduleLoading() {
			return this.$store.state.teacherSchedule.loading;
		},
		teacherScheduleError() {
			return this.$store.state.teacherSchedule.error;
		},
		teacherScheduleErrorMessage() {
			return this.$store.state.teacherSchedule.message;
		},
		userAuthorized() {
			return this.$store.getters["rightMenu/userAuthorized"];
		},
		userSubscriptions() {
			if (!store.getters["rightMenu/profileEmpty"]) {
				return this.$store.state.rightMenu.user.profile.subscription.schedule;
			}
		},
		teacherScheduleCurrentTeacher() {
			return Number(this.$store.state.routerState.params.teacher_id);
		}
	},
	watch: {
		teacherScheduleCurrentTeacher(teacher_id) {
			this.$store.commit("scheduleSearch/closeSearch");
			this.$store.dispatch("teacherSchedule/getTeacherInfo", teacher_id);
		}
	}
};
</script>
