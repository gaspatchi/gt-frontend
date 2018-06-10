<template>
	<div>
		<div class="bg-white bbtn">
			<div class="container text-center line-heading">Дополнительное образование</div>
		</div>
		<div class="courses">
			<div class="container">
				<div class="row text-center">
					<div class="col-12 col-sm-4">
						<router-link :to="{path: '/page/'+ one}" class="course c-shadow">
							<h5>Курсы вождения</h5>
							<div class="car-icon"></div>
						</router-link>
					</div>
					<div class="col-12 col-sm-4 ">
						<router-link :to="{path: '/page/'+ two}" class="course sm c-shadow">
							<h5>Курсы тракториста</h5>
							<div class="tractor-icon"></div>
						</router-link>
					</div>
					<div class="col-12 col-sm-4">
						<router-link :to="{path: '/page/'+ three}" class="course  c-shadow">
							<h5 class="bold">Курсы парикмахера</h5>
							<div class="cut-icon"></div>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ae_one, ae_two, ae_three } from "../../api/config.js";
export default {
	name: "additionalEducation",
	computed: {
		one() {
			return ae_one;
		},
		two() {
			return ae_two;
		},
		three() {
			return ae_three;
		}
	}
};
</script>
