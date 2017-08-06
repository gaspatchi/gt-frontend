<template>
	<div class="active">
		<div class="primary-table">
			<div class="p-table-header">Email подписки</div>
			<div class="table-cont" v-if="groupsExists">
				<h6>Группы:</h6>
				<router-link :to="{path: '/schedule/group/'+ group.group_id}" class="btn" v-for="group in groups" :key="group.group_id">{{group.group}}</router-link>
			</div>
			<div class="table-cont" v-else>
				<h6>Группы:</h6>
				<router-link class="btn-25 btn-primory shadow-sm btn-plus" to="/schedule">+</router-link>
			</div>
			<div class="table-cont" v-if="teachersExists">
				<h6>Преподаватели:</h6>
				<router-link :to="{path: '/schedule/teacher/'+ teacher.teacher_id}" class="btn" v-for="teacher in teachers" :key="teacher.teacher_id">{{teacher.lastname}} {{teacher.firstname[0]}}. {{teacher.patronymic[0]}}.</router-link>
			</div>
			<div class="table-cont" v-else>
				<h6>Преподаватели:</h6>
				<router-link class="btn-25 btn-primory shadow-sm btn-plus" to="/schedule">+</router-link>
			</div>
		</div>
	
		<div class="two-primory-tables-inline">
			<div class="primary-table">
				<div class="p-table-header">Способы получения</div>
				<div class="table-cont">
					<h6>
						<span class="hidden-md-down">Получать на </span>Email
					</h6>
					<div class="ml-auto" :class="{'subscription-ok':emailDispatch, 'subscription-checkbox':!emailDispatch}" id="sub-check" @click="postDispatch(!emailDispatch)"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "subscriptionsScreen",
	props: ["subscriptions", "dispatch"],
	methods: {
		postDispatch(email) {
			this.$emit("postDispatch", { email, sms: false });
		}
	},
	computed: {
		groups() {
			return this.$props.subscriptions.groups;
		},
		teachers() {
			return this.$props.subscriptions.teachers;
		},
		groupsExists() {
			return this.$props.subscriptions.groups.length > 0 ? true : false;
		},
		teachersExists() {
			return this.$props.subscriptions.teachers.length > 0 ? true : false;
		},
		emailDispatch() {
			return this.$props.dispatch.email;
		}
	}
};
</script>
