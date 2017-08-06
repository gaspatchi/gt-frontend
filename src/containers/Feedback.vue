<template>
	<div>
		<Vim></Vim>
		<topHeader></topHeader>
		<mainMenu></mainMenu>
		<rightMenu></rightMenu>
		<subHeader></subHeader>
		<feedbackForm></feedbackForm>
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
import feedbackForm from "../components/feedbackForm/";
import resourceBlock from "../components/resourceBlock/";
import bottomFooter from "../components/bottomFooter/";
export default {
	name: "Feedback",
	components: {
		Vim,
		topHeader,
		mainMenu,
		rightMenu,
		subHeader,
		feedbackForm,
		resourceBlock,
		bottomFooter
	}
};
</script>

