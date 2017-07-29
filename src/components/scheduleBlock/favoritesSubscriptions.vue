<template>
	<div class="primary-table">
		<div class="p-table-header">Избранные подписки</div>
		<div class="table-cont" v-if="groupsExists">
			<h6>Мои группы:</h6>
			<router-link :to="{path: '/schedule/group/'+ group.group_id}" class="btn" v-for="group in groups" :key="group.group_id">{{group.group}}</router-link>
		</div>
		<div class="table-cont" v-if="teachersExists">
			<h6>Мои преподаватели:</h6>
			<router-link :to="{path: '/schedule/teacher/'+ teacher.teacher_id}" class="btn" v-for="teacher in teachers" :key="teacher.teacher_id">{{teacher.lastname}} {{teacher.firstname[0]}}. {{teacher.patronymic[0]}}.</router-link>
		</div>
	</div>
</template>
<script>
export default {
	name: "favoritesSubscriptions",
	props: ["groups", "teachers"],
	computed: {
		groupsExists() {
			return this.$props.groups.length > 0 ? true : false;
		},
		teachersExists() {
			return this.$props.teachers.length > 0 ? true : false;
		}
	}
};
</script>
