<template>
	<div class="date cover" :class="{select:open}" @click="togglePicker">
		<div class="d-flex table-date" v-if="current">{{current | formatDate}}
			<div class="hidden-sm-down">{{current | formatDay}}</div>
			<div class="arrow-down">
			</div>
		</div>
		<div class="date-selector" v-if="open === true">
			<div class="date-list" v-if="dates">
				<div class="date-list-item" v-for="(day,index) in dates" :key="index" @click="selectDate(day.date)">
					{{day.date | formatDate}}
					<span class="hidden-sm-down">{{day.date | formatDay}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import moment from "moment";
export default {
	name: "datePicker",
	props: ["current", "dates"],
	data() {
		return {
			open: false
		};
	},
	methods: {
		togglePicker() {
			this.open = !this.open;
		},
		selectDate(date) {
			this.$emit("selectDate", date);
		}
	},
	filters: {
		formatDate(date) {
			return moment(date).format("DD.MM.YYYY");
		},
		formatDay(date) {
			moment.locale("ru");
			let day = moment(date).format("dddd");
			day = day[0].toUpperCase() + day.slice(1, 3) + ".";
			return day;
		}
	}
};
</script>
