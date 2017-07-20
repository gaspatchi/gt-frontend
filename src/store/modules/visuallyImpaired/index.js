const visuallyImpaired = {
	namespaced: true,
	state: {
		open: false,
		mode: "default",
		black: false
	},
	mutations: {
		togglePanel(store) {
			store.open = !store.open;
		},
		setFont(store, payload) {
			store.font = payload.font;
		},
		toggleBlack(store, payload) {
			store.black = payload.state;
		},
		changeMode(store, payload) {
			store.mode = payload.mode;
		}
	}
};

export default visuallyImpaired;