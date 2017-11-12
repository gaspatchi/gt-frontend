<template>
	<div class="sub-slider-menu">
		<div class="container">
			<div class="shadow-more hidden-sm-up"></div>
			<div class="row">
				<router-link :to="{path: '/page/'+ one}" class="sub-item">
					<div class="info-icon"></div>
					<span>Сведения об образовательной
						<br> организации</span>
				</router-link>
				<router-link :to="{path: '/page/'+ two}" class="sub-item">
					<div class="museum-icon"></div>
					<span>Музей техникума</span>
				</router-link>
				<router-link :to="{path: '/page/'+ three}" class="sub-item">
					<div class="work-icon"></div>
					<span>Трудоустройство</span>
				</router-link>
				<router-link :to="{path: '/page/'+ four}" class="sub-item">
					<div class="edu-icon"></div>
					<span>Образование</span>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
import { sn_one, sn_two, sn_three, sn_four } from "../../api/config.js";
export default {
	name: "subNavigation",
	computed: {
		one() {
			return sn_one;
		},
		two() {
			return sn_two;
		},
		three() {
			return sn_three;
		},
		four() {
			return sn_four;
		}
	}
};
</script>
