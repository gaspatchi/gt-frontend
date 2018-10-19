<template>
	<div>
		<div class="bg-white bttn">
			<div class="container text-center line-heading">Нам есть чем гордиться!</div>
		</div>
		<div class="bg-primary gt-stat">
			<div class="container">
				<div class="row text-center">
					<div class="col-12 col-sm-4">
						<div class="sm-line">Обучение по</div>
						<div class="b-line">24</div>
						<div class="sm-line">специальностям и профессиям</div>
						<buble heading="Лучшее образование" description="В техникуме созданы уникальные условия для обучения различным специальностям и профессиям. Обучение в ГТМАУ даёт студентам шансы на получение образования на бюджетной основе, проживания в общежитии и гарантированное трудоустройство со стабильной заработной платой, полным социальным пакетом и возможностью карьерного роста после окончания обучения."></buble>
					</div>
					<div class="col-12 col-sm-4">
						<div class="sm-line">Лауреат трёх золотых медалей</div>
						<div class="b-line">100</div>
						<div class="sm-line">лучших ссузов России</div>
						<buble heading="В Топ-100 лучших" description="Основным критерием оценки стало соответствие предоставляемого образования потребностям будущих работодателей. Эффективность и качество деятельности учебного заведения определялись его способностью продуцировать новые ценности, цели и стандарты в сфере образования и науки."></buble>
					</div>
					<div class="col-12 col-sm-4">
						<div class="sm-line">Активный участник</div>
						<div class="b-line">9</div>
						<div class="sm-line">чемпионатов WorldSkills Russia</div>
						<buble heading="Worldskills" description="Международное некоммерческое движение, целью которого является повышение престижа рабочих профессий и развитие профессионального образования. В чемпионатах 'Молодые профессионалы' принимают участие молодые квалифицированные рабочие, студенты университетов и колледжей. Результаты участников показывают уровень профессиональной подготовки и качество услуг регионов."></buble>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import buble from "./buble";
export default {
	name: "achievementsBlock",
	components: {
		buble
	}
};
</script>
