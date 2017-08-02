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
			<div class="col-4 currnet-name">Кабинет</div>
		</div>
		<div class="primary-table d-flex" v-if="cabinetScheduleInfo">
			<div class="currnt-name">
				<h5>Кабинет {{cabinetScheduleInfo.cabinet}}</h5>
			</div>
			<div class="about-of-name">
				<div class="about-line" v-if="cabinetScheduleHousing">
					<div class="location-icon-grey"></div>
					<div class="name-of-line">
						<span>Корпус</span>
						<br>{{cabinetScheduleHousing}}
					</div>
				</div>
				<div class="about-line" v-if="cabinetScheduleFloor">
					<div class="layer-icon"></div>
					<div class="name-of-line">
						<span>Этаж</span>
						<br>{{cabinetScheduleFloor}}
					</div>
				</div>
				<div class="about-line" v-if="cabinetScheduleDescription">
					<div class="description-icon"></div>
					<div class="name-of-line">
						<span>Описание</span>
						<br>{{cabinetScheduleDescription}}
					</div>
				</div>
			</div>
		</div>
		<div class="tab current-timetable">
			<div class="bbtn bg-white">
				<header id="tab-btn">
					<span class="active-tab">Занятия</span>
				</header>
			</div>
			<section id="tab-page">
				<div class="active">
					<div class="primary-table rasp">
						<spinner v-if="cabinetScheduleLoading" :height="300" mode="large"></spinner>
						<table v-if="cabinetSchedule">
							<tbody v-if="!cabinetScheduleLoading">
								<tr class="p-table-header">
									<td class="numb">№</td>
									<td class="time">Время</td>
									<td class="name-lession">Предмет</td>
									<td class="teacher">
										<div class="hidden-lg-up">Преп.</div>
										<div class="hidden-md-down">Преподаватель</div>
									</td>
									<td class="class-room">Группа</td>
								</tr>
								<tr class="line-lession" v-for="pair in cabinetSchedule" :key="pair.index">
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
									<td class="teacher">{{pair.teacher.lastname}} {{pair.teacher.firstname[0]}}. {{pair.teacher.patronymic[0]}}.</td>
									<td class="class-room">{{pair.group.group}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="primary-table mobile-rasp">
						<div class="p-menu-table">
							<table v-if="cabinetSchedule">
								<tbody v-if="!cabinetScheduleLoading">
									<tr v-for="pair in cabinetSchedule" :key="pair.index">
										<td>
											<span class="btn-25 btn-primory">{{pair.index}}</span>
										</td>
										<td>{{getPairTime(pair.index).start}}
											<br>{{getPairTime(pair.index).end}}</td>
										<td>
											<div class="subject">{{pair.lesson.lesson}}</div>
											<div class="d-flex">
												<div class="teacher">{{pair.teacher.lastname}} {{pair.teacher.firstname[0]}}. {{pair.teacher.patronymic[0]}}.</div>
												<div class="kab">{{pair.group.group}}</div>
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
		<toast :state="cabinetScheduleError" :messagetext="cabinetScheduleErrorMessage" mode="error"></toast>
	</div>
</template>
<script>
import store from "../../store/";
import spinner from "../spinner/";
import toast from "../toast/";
import scheduleSearch from "../scheduleSearch/";
import datePicker from "../datePicker/";
export default {
	name: "cabinetSchedule",
	store,
	components: {
		spinner,
		toast,
		scheduleSearch,
		datePicker,
	},
	created() {
		this.$store.dispatch("cabinetSchedule/getCabinetInfo", this.$store.state.routerState.params.cabinet_id);
	},
	methods: {
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
		cabinetScheduleLoading() {
			return this.$store.state.cabinetSchedule.loading;
		},
		cabinetScheduleError() {
			return this.$store.state.cabinetSchedule.error;
		},
		cabinetScheduleErrorMessage() {
			return this.$store.state.cabinetSchedule.message;
		},
		cabinetScheduleInfo() {
			return this.$store.state.cabinetSchedule.info;
		},
		cabinetSchedule() {
			return this.$store.state.cabinetSchedule.schedule;
		},
		cabinetScheduleDescription() {
			return this.$store.state.cabinetSchedule.info.description;
		},
		cabinetScheduleHousing() {
			switch (this.$store.state.cabinetSchedule.info.housing) {
				case 1:
					return "Первый";
				case 2:
					return "Второй";
				case 3:
					return "Третий";
				case 4:
					return "Четвертый";
				case 5:
					return "Пятый";
			}
		},
		cabinetScheduleFloor() {
			switch (this.$store.state.cabinetSchedule.info.floor) {
				case 1:
					return "Первый";
				case 2:
					return "Второй";
				case 3:
					return "Третий";
				case 4:
					return "Четвертый";
				case 5:
					return "Пятый";
			}
		},
		cabinetScheduleCurrentCabinet() {
			return Number(this.$store.state.routerState.params.cabinet_id);
		}
	},
	watch: {
		cabinetScheduleCurrentCabinet(cabinet_id) {
			this.$store.commit("scheduleSearch/closeSearch");
			this.$store.dispatch("cabinetSchedule/getCabinetInfo", cabinet_id);
		}
	}
};
</script>
