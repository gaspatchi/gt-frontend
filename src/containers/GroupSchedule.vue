<template>
	<div>
		<Vim></Vim>
		<topHeader></topHeader>
		<mainMenu></mainMenu>
		<rightMenu></rightMenu>
		<subHeader></subHeader>
		<topCover></topCover>
		<groupSchedule></groupSchedule>
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
import groupSchedule from "../components/groupSchedule/";
import resourceBlock from "../components/resourceBlock/";
import bottomFooter from "../components/bottomFooter/";
export default {
	name: "GroupSchedule",
	components: {
		Vim,
		topHeader,
		mainMenu,
		rightMenu,
		subHeader,
		topCover,
		groupSchedule,
		resourceBlock,
		bottomFooter
	}
};
</script>

