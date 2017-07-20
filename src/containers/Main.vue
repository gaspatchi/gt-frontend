<template>
	<div>
		<Vim></Vim>
		<topHeader></topHeader>
		<mainMenu></mainMenu>
		<rightMenu></rightMenu>
		<subHeader></subHeader>
		<bigCarousel></bigCarousel>
		<newsBlock></newsBlock>
		<achievementsBlock></achievementsBlock>
		<additionalEducation></additionalEducation>
		<resourceBlock></resourceBlock>
		<bottomFooter></bottomFooter>
	</div>
</template>

<script>
import Vim from "../components/vim/";
import topHeader from "../components/topHeader/";
import mainMenu from "../components/mainMenu/";
import rightMenu from "../components/rightMenu/";
import subHeader from "../components/subHeader/";
import bigCarousel from "../components/bigCarousel/";
import newsBlock from "../components/newsBlock/";
import achievementsBlock from "../components/achievementsBlock/";
import additionalEducation from "../components/additionalEducation/";
import resourceBlock from "../components/resourceBlock/";
import bottomFooter from "../components/bottomFooter/";

export default {
	name: "Main",
	components: {
		Vim,
		topHeader,
		mainMenu,
		rightMenu,
		subHeader,
		bigCarousel,
		newsBlock,
		achievementsBlock,
		additionalEducation,
		resourceBlock,
		bottomFooter
	}
};
</script>

