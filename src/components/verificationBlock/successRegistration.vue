<template>
	<div>
		<div class="info-settings">
			<img class="image-info" src="../../assets/img/green-done.svg" alt="">
			<h4>Регистрация успешно подтверждена</h4>
			<h6>Войдите чтобы воспользоваться нашим сервисом</h6>
			<button class="btn-primory btn-40 btn-pulse" @click="successClick">{{button}}</button>
		</div>
		<div class="bg-white bttn bbtn advantages-header">
			<div class="container text-center line-heading">Теперь вам доступно:</div>
		</div>
		<div class="advantages">
			<div class="item col-9 col-md-7 col-lg-3">
				<h6>Избранные подписки</h6>
				<img src="../../assets/img/advantages/1.png" alt="">
				<img src="../../assets/img/advantages/4.png" alt="">
				<p>После регистрации на нашем сайте вам доступны избранные подписки, которые будут очень удобны для быстрого доступа к расписанию выбранной группы или преподавателя. Имеющийся функционал предоставляет возможности просмотра расписания для преподавателя, группы, и кабинета</p>
			</div>
			<div class="item col-9 col-md-7 col-lg-3">
				<h6>Email оповещения</h6>
				<img src="../../assets/img/advantages/2.png" alt="">
				<p>Так же имеется возможность получать расписание занятий на email</p>
			</div>
			<div class="item col-9 col-md-7 col-lg-3">
				<h6>Персональное меню</h6>
				<img src="../../assets/img/advantages/3.png" alt="">
				<p>Благодаря персональному меню у вас есть быстрый доступ расписанию избранных групп из любого раздела сайта</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "successRegistration",
	props: ["button"],
	methods: {
		successClick() {
			this.$emit("successClick");
		}
	}
};
</script>
