<template>
	<div class="favorite">
		<div class="d-flex favorBtn" @click="toggleSubscription">
			<div class="star-icon checked" v-if="emailExists || viewExists"></div>
			<div class="star-icon unchecked" v-else></div>
			<div class="hidden-sm-down" v-if="emailExists">В подписках</div>
			<div class="hidden-sm-down" v-else-if="viewExists">В избранном</div>
			<div class="hidden-sm-down" v-else>Подписаться</div>
		</div>
		<div class="context-menu" :class="{active:open}">
			<div class="context-arrow"></div>
			<div class="lists">
				<div class="list-item" v-if="!emailExists" @click="addSubscription('send','email')">
					Email
					<div class="done-icon opct-0"></div>
				</div>
				<div class="list-item" v-else @click="deleteSubscription('send','email')">
					Email
					<div class="done-icon"></div>
				</div>
				<div class="list-item bttn" v-if="emailExists === false && viewExists === false" @click="addSubscription('view','')">
					Избранное
					<div class="done-icon opct-0"></div>
				</div>
				<div class="list-item bttn" v-else-if="emailExists === false && viewExists === true" @click="deleteSubscription('view','')">
					Избранное
					<div class="done-icon"></div>
				</div>
				<div class="list-item bttn" v-else-if="emailExists === true" @click="deleteSubscription('send','email')">
					Избранное
					<div class="done-icon"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import _ from "lodash";
export default {
	name: "favoriteSubscription",
	props: ["type", "id", "subscriptions"],
	data() {
		return {
			open: false
		};
	},
	methods: {
		toggleSubscription() {
			this.open = !this.open;
		},
		addSubscription(section, destination) {
			this.$emit("addSubscription", { section, destination, type: this.$props.type, id: this.$props.id });
		},
		deleteSubscription(section, destination) {
			this.$emit("deleteSubscription", { section, destination, type: this.$props.type, id: this.$props.id });
		}
	},
	computed: {
		emailExists() {
			if (!_.isEmpty(this.subscriptions)) {
				if (this.type === "group") {
					return this.subscriptions.send.email.groups.includes(this.id);
				} else {
					return this.subscriptions.send.email.teachers.includes(this.id);
				}
			}
		},
		viewExists() {
			if (!_.isEmpty(this.subscriptions)) {
				if (this.type === "group") {
					return this.subscriptions.view.groups.includes(this.id);
				} else {
					return this.subscriptions.view.teachers.includes(this.id);
				}
			}
		}
	}
};
</script>
