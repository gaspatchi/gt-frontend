<template>
	<div>
		<Vim></Vim>
		<topHeader></topHeader>
		<mainMenu></mainMenu>
		<rightMenu></rightMenu>
		<subHeader></subHeader>
		<topCover></topCover>
		<scheduleBlock></scheduleBlock>
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
import scheduleBlock from "../components/scheduleBlock/";
import resourceBlock from "../components/resourceBlock/";
import bottomFooter from "../components/bottomFooter/";
export default {
	name: "Schedule",
	components: {
		Vim,
		topHeader,
		mainMenu,
		rightMenu,
		subHeader,
		topCover,
		scheduleBlock,
		resourceBlock,
		bottomFooter
	}
};
</script>

