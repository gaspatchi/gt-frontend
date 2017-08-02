<template>
	<div class="container mt-130 borderg rasp-page bg-white">
		<h3>Расписание занятий</h3>
		<scheduleSearch></scheduleSearch>
		<div class="current-rasp-header bbtn">
			<div class="col-4">
				<router-link to="/schedule" class="back-to-list-timetable">
					<div class="back-icon"></div> Назад
				</router-link>
			</div>
			<div class="col-4 currnet-name">Группа</div>
			<div class="col-4">
				<favoriteSubscription v-if="userAuthorized" type="group" :id="groupScheduleGroup" :subscriptions="userSubscriptions" @addSubscription="addUserSubscription" @deleteSubscription="deleteUserSubscription"></favoriteSubscription>
			</div>
		</div>
		<div class="primary-table d-flex">
			<div class="currnt-name">
				<h5>{{groupScheduleInfo.group}} группа</h5>
			</div>
			<div class="about-of-name">
				<div class="about-line" v-if="groupScheduleInfo.teacher">
					<div class="teaher-icon"></div>
					<div class="name-of-line">
						<span>Классный руководитель:</span>
						<br>{{groupScheduleInfo.teacher.lastname}} {{groupScheduleInfo.teacher.firstname}} {{groupScheduleInfo.teacher.patronymic}}
					</div>
				</div>
				<div class="about-line" v-if="groupScheduleInfo.speciality">
					<div class="specialty-icon"></div>
					<div class="name-of-line">
						<span>Специальность:</span>
						<br>{{groupScheduleInfo.speciality.speciality}}
					</div>
				</div>
				<div class="about-line" v-if="groupScheduleInfo.course">
					<div class="course-icon"></div>
					<div class="name-of-line">
						<span>Курс:</span>
						<br>{{groupScheduleCourse}}
					</div>
				</div>
			</div>
		</div>
		<div class="tab current-timetable">
			<div class="bbtn bg-white">
				<header id="tab-btn">
					<span class="active-tab">Занятия</span>
				</header>
				<datePicker :current="groupScheduleCurrentDate" :dates="groupScheduleDates" @selectDate="getGroupSchedule"></datePicker>
			</div>
			<section id="tab-page">
				<div class="active">
					<div class="primary-table rasp">
						<spinner v-if="groupScheduleLoading" :height="300" mode="large"></spinner>
						<table v-if="groupSchedule">
							<tbody v-if="!groupScheduleLoading">
								<tr class="p-table-header">
									<td class="numb">№</td>
									<td class="time">Время</td>
									<td class="name-lession">Предмет</td>
									<td class="teacher">Преподаватель</td>
									<td class="class-room">
										<div class="hidden-lg-up">Каб.</div>
										<div class="hidden-md-down">Кабиент</div>
									</td>
								</tr>
	
								<tr class="line-lession" v-for="pair in groupSchedule" :key="pair.index">
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
									<td class="teacher" v-if="pair.teacher.verified === true">{{pair.teacher.lastname}} {{pair.teacher.firstname[0]}}. {{pair.teacher.patronymic[0]}}.</td>
									<td class="teacher" v-else>{{pair.teacher.firstname}}</td>
									<td class="class-room">{{pair.cabinet.cabinet}}</td>
								</tr>
	
							</tbody>
						</table>
					</div>
					<div class="primary-table mobile-rasp">
						<div class="p-menu-table">
							<table v-if="groupSchedule">
								<tbody v-if="!groupScheduleLoading">
									<tr v-for="pair in groupSchedule" :key="pair.index">
										<td>
											<span class="btn-25 btn-primory">{{pair.index}}</span>
										</td>
										<td>{{getPairTime(pair.index).start}}
											<br>{{getPairTime(pair.index).end}}</td>
										<td>
											<div class="subject">{{pair.lesson.lesson}}</div>
											<div class="d-flex">
												<div class="teacher" v-if="pair.teacher.verified === true">{{pair.teacher.lastname}} {{pair.teacher.firstname[0]}}. {{pair.teacher.patronymic[0]}}.</div>
												<div class="teacher" v-else>{{pair.teacher.firstname}}</div>
												<div class="kab">{{pair.cabinet.cabinet}}</div>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
		</div>
		<toast :state="groupScheduleError" :messagetext="groupScheduleErrorMessage" mode="error"></toast>
	</div>
</template>

<script>
import store from "../../store/";
import spinner from "../spinner/";
import toast from "../toast/";
import scheduleSearch from "../scheduleSearch/";
import datePicker from "../datePicker/";
import favoriteSubscription from "../favoriteSubscription/";
export default {
	name: "groupSchedule",
	store,
	components: {
		spinner,
		toast,
		scheduleSearch,
		datePicker,
		favoriteSubscription
	},
	created() {
		this.$store.dispatch("groupSchedule/getGroupInfo", this.$store.state.routerState.params.group_id);
	},
	methods: {
		getGroupSchedule(date) {
			this.$store.dispatch("groupSchedule/getGroupSchedule", date);
		},
		addUserSubscription(payload) {
			this.$store.dispatch("groupSchedule/addUserSubscription", payload);
		},
		deleteUserSubscription(payload) {
			this.$store.dispatch("groupSchedule/deleteUserSubscription", payload);
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
		groupScheduleInfo() {
			return this.$store.state.groupSchedule.info;
		},
		groupScheduleGroup() {
			return this.$store.state.groupSchedule.group;
		},
		groupScheduleCourse() {
			switch (this.$store.state.groupSchedule.info.course) {
				case 1:
					return "Первый";
				case 2:
					return "Второй";
				case 3:
					return "Третий";
				case 4:
					return "Четвертый";
			}
		},
		groupSchedule() {
			return this.$store.state.groupSchedule.schedule;
		},
		groupScheduleCurrentDate() {
			return this.$store.state.groupSchedule.date;
		},
		groupScheduleDates() {
			return this.$store.state.groupSchedule.dates;
		},
		groupScheduleLoading() {
			return this.$store.state.groupSchedule.loading;
		},
		groupScheduleError() {
			return this.$store.state.groupSchedule.error;
		},
		groupScheduleErrorMessage() {
			return this.$store.state.groupSchedule.message;
		},
		userAuthorized() {
			return this.$store.getters["rightMenu/userAuthorized"];
		},
		userSubscriptions() {
			if (!store.getters["rightMenu/profileEmpty"]) {
				return this.$store.state.rightMenu.user.profile.subscription.schedule;
			}
		},
		groupScheduleCurrentGroup() {
			return Number(this.$store.state.routerState.params.group_id);
		}
	},
	watch: {
		groupScheduleCurrentGroup(group_id) {
			this.$store.commit("scheduleSearch/closeSearch");
			this.$store.dispatch("groupSchedule/getGroupInfo", group_id);
		}
	}
};
</script>
