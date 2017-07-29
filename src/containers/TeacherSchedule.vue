<template>
	<div>
		<Vim></Vim>
		<topHeader></topHeader>
		<mainMenu></mainMenu>
		<rightMenu></rightMenu>
		<subHeader></subHeader>
		<topCover></topCover>
		<teacherSchedule></teacherSchedule>
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
import teacherSchedule from "../components/teacherSchedule/";
import resourceBlock from "../components/resourceBlock/";
import bottomFooter from "../components/bottomFooter/";
export default {
	name: "TeacherSchedule",
	components: {
		Vim,
		topHeader,
		mainMenu,
		rightMenu,
		subHeader,
		topCover,
		teacherSchedule,
		resourceBlock,
		bottomFooter
	}
};
</script>

