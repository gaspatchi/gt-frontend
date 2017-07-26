<template>
	<div class="primary-table">
		<div class="p-table-header">Избранные подписки</div>
		<div class="table-cont">
			<h6>Мои группы:</h6>
			<a class="btn" v-for="group in groups" :key="group.group_id">{{group.group}}</a>
		</div>
		<div class="table-cont">
			<h6>Мои преподаватели:</h6>
			<a class="btn" v-for="teacher in teachers" :key="teacher.teacher_id">{{teacher.lastname}} {{teacher.firstname[0]}}. {{teacher.patronymic[0]}}.</a>
		</div>
	</div>
</template>
<script>
export default {
	name: "favoritesSubscriptions",
	props: ["groups", "teachers"]
};
</script>
