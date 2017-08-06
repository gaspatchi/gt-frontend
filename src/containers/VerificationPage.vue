<template>
	<div>
		<Vim></Vim>
		<topHeader></topHeader>
		<mainMenu></mainMenu>
		<rightMenu></rightMenu>
		<subHeader></subHeader>
		<topCover></topCover>
		<verificationBlock></verificationBlock>
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
import topCover from "../components/topCover/";
import verificationBlock from "../components/verificationBlock/";
import resourceBlock from "../components/resourceBlock/";
import bottomFooter from "../components/bottomFooter/";
export default {
	name: "VerificationPage",
	components: {
		Vim,
		topHeader,
		mainMenu,
		rightMenu,
		subHeader,
		topCover,
		verificationBlock,
		resourceBlock,
		bottomFooter
	}
};
</script>

