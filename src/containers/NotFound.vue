<template>
	<div>
		<Vim></Vim>
		<topHeader></topHeader>
		<mainMenu></mainMenu>
		<rightMenu></rightMenu>
		<subHeader></subHeader>
		<notFound></notFound>
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
import notFound from "../components/notFound/";
import resourceBlock from "../components/resourceBlock/";
import bottomFooter from "../components/bottomFooter/";
export default {
	name: "NotFound",
	components: {
		Vim,
		topHeader,
		mainMenu,
		rightMenu,
		subHeader,
		notFound,
		resourceBlock,
		bottomFooter
	}
};
</script>

