<template>
	<div>
		<h5 class="title bbtn" v-if="!groupScheduleEmpty">Расписание на
			<router-link :to="{path: '/schedule/group/'+ groupSchedule.group_id}"> {{groupScheduleDate}}</router-link>
		</h5>
		<h5 class="title bbtn" v-else>Расписание занятий</h5>
		<div>
			<div class="not-a-rasp" v-if="subscriptionsEmpty">
				<h6>Сейчас тут пусто</h6>
				<p>На этом месте будут оторбаражться избранные группы и преподаватели, вы можете легко добавить их, просто нажмите на кнопку ниже.</p>
				<div class="d-flex">
					<router-link class="btn-primory btn-40 btn-pulse" tag="button" to="/schedule">Выбрать расписание</router-link>
				</div>
			</div>
			<div class="select-box-wrapper" v-if="!groupScheduleEmpty">
				<div class="select-box">
					<button class="s-item" v-for="group in subscriptions.groups" :key="group.group_id" :class="{selected: groupSchedule.group_id === group.group_id}" @click="fetchGroup(group.group_id)">{{group.group}}</button>
				</div>
				<router-link class="btn-25 btn-primory shadow-sm btn-plus" to="/schedule">+</router-link>
			</div>
			<div class="p-menu-table">
				<table>
					<tbody>
						<tr v-for="pair in groupSchedule.schedule" :key="pair.index">
							<td>
								<span class="btn-25 btn-primory ">{{pair.index}}</span>
							</td>
							<td>{{getPairTime(pair.index).start}}
								<br>{{getPairTime(pair.index).end}}</td>
							<td>
								<div class="subject ">{{pair.lesson.lesson}}</div>
								<div class="d-flex ">
									<div class="teacher" v-if="pair.teacher.verified === true">{{pair.teacher.lastname}} {{pair.teacher.firstname[0]}}. </div>
									<div class="teacher" v-else>{{pair.teacher.firstname}}</div>
									<div class="kab ">{{pair.cabinet.cabinet}}</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div v-if="!teacherScheduleEmpty">
			<div class="select-box-wrapper">
				<div class="select-box">
					<button class="s-item selected">{{subscriptions.teachers[0].lastname}} {{subscriptions.teachers[0].firstname[0]}}. {{subscriptions.teachers[0].patronymic[0]}}.</button>
				</div>
				<router-link to="/schedule" class="btn-25 btn-primory shadow-sm btn-plus">
					<div class="arrow-to-right"></div>
				</router-link>
			</div>
			<div class="p-menu-table">
				<table>
					<tbody>
						<tr v-for="pair in teacherSchedule.schedule" :key="pair.index">
							<td>
								<span class="btn-25 btn-primory ">{{pair.index}}</span>
							</td>
							<td>{{getPairTime(pair.index).start}}
								<br>{{getPairTime(pair.index).start}}</td>
							<td>
								<div class="subject">{{pair.index}}</div>
								<div class="d-flex">
									<div class="teacher">{{pair.lesson.lesson}}</div>
									<div class="kab">{{pair.cabinet.cabinet}}</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="exit-btn" @click="logoutUser">Выйти</div>
	</div>
</template>
<script>
import _ from "lodash";
import moment from "moment";
export default {
	name: "profileScreen",
	props: ["active", "profile", "subscriptions", "groupSchedule", "teacherSchedule"],
	methods: {
		logoutUser() {
			this.$emit("logoutUser");
		},
		fetchGroup(group_id) {
			this.$emit("fetchGroup", group_id);
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
		subscriptionsEmpty() {
			if (this.$props.subscriptions.groups.length === 0 && this.$props.subscriptions.teachers.length === 0) {
				return true;
			} else {
				return false;
			}
		},
		groupScheduleEmpty() {
			return _.isEmpty(this.$props.groupSchedule);
		},
		teacherScheduleEmpty() {
			return _.isEmpty(this.$props.teacherSchedule);
		},
		groupScheduleDate() {
			if (!this.groupScheduleEmpty) {
				return moment(this.$props.groupSchedule.schedule[0].date).format("DD.MM.YYYY");
			}
		}
	}
};
</script>

