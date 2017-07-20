<template>
	<!-- Боковое меню -->
	<div id="personal-menu" class="personal-menu">
	
		<div class="p-header">
			<!-- шапка бокового меню -->
	
			<!-- 1 отображать когда не выполнен вход -->
			<h6 class="pheding active">Личный кабинет</h6>
	
			<div class="user-info-min">
				<div class="avatar active img-size-40">
					<div class="profile-img"></div>
				</div>
				<div class="user-names">
					<span class="firstname">Александр</span>
					<br>
					<span class="lastname">Зеленский</span>
				</div>
			</div>
			<div id="p-close"></div>
		</div>
		<div class="login-cont active">
			<div class="login active">
				<h6>Добро пожаловать</h6>
				<input type="login" placeholder="email" spellcheck="false">
				<input type="password" placeholder="Пароль">
				<a class="forget">Забыли пароль?</a>
				<!--класс active для показа (после неверного ввода) -->
				<div class="d-flex">
					<button class="btn-primory btn-40" id="enter-to">Войти</button>
					<button class="t-grey btn-40" id="registration">Регистрация</button>
				</div>
			</div>
			<div class="registration">
				<h6>Регистрация</h6>
				<input type="name" placeholder="Имя">
				<input type="lastname" placeholder="Фамилия">
				<input type="emal" placeholder="email" spellcheck="false">
				<input type="password" placeholder="Пароль">
				<div class="d-flex">
					<button class="t-grey btn-40" id="back-to-enter">Назад</button>
					<button class="btn-primory btn-40" id="next-reg-step">Продолжить</button>
				</div>
	
			</div>
			<div class="congratulations">
				<h6>Готово!</h6>
				<p>Письмо с подтверждением регистрации отправлено на ваш email адрес, следуйте инструкциям.</p>
				<div class="d-flex">
					<button class=" btn-primory btn-40" id="back-to-enter2">Выполнить вход</button>
				</div>
			</div>
	
		</div>
		<!-- контейнер с датой и распианием -->
		<div class="rasp-cont">
			<h5 class="title bbtn">Расписание на
				<a href="">25.03.17</a>
			</h5>
			<div class="select-box-wrapper">
				<div class="select-box">
					<button class="s-item selected">124</button>
					<button class="s-item">321</button>
					<button class="s-item">332</button>
				</div>
				<a class="btn-25 btn-primory shadow-sm btn-plus" href="">+</a>
	
			</div>
			<div class="p-menu-table">
				<table>
					<tbody>
						<tr>
							<td>
								<span class="btn-25 btn-primory">1</span>
							</td>
							<td>8:30
								<br>9:55</td>
							<td>
								<div class="subject">Русский язык</div>
								<div class="d-flex">
									<div class="teacher">Куликов В.А</div>
									<div class="kab">123 каб.</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<span class="btn-25 btn-primory">2</span>
							</td>
							<td>10:10
								<br>11:30</td>
							<td>
								<div class="subject">ОС и среды</div>
								<div class="d-flex">
									<div class="teacher">Куликов В.А</div>
									<div class="kab">123 каб.</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<span class="btn-25 btn-primory">3</span>
							</td>
							<td>12:15
								<br>13:50</td>
							<td>
								<div class="subject">ОС и среды</div>
								<div class="d-flex">
									<div class="teacher">Куликов В.А</div>
									<div class="kab">123 каб.</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
	
			</div>
			<div class="exit-btn">Выйти</div>
		</div>
	
	</div>
	<!--конец бокового меню-->
</template>

<script>
export default {
	name: "rightMenu"
};
</script>
