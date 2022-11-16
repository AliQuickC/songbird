export default function reducer(state, action) {
	let userData;
	switch (action.type) {
	case 'SET_USER_DATA':
		state.userData = action.userData;
		return state;
	case 'SET_LANGUAGE':
		userData = JSON.parse(JSON.stringify(state.userData));
		userData.language = action.language;
		state.userData = userData;
		return state;
	case 'SWITCH_PAGE':
		userData = JSON.parse(JSON.stringify(state.userData));
		userData.currentPage = action.currentPage;
		state.userData = userData;
		return state;
	default:
		return state;
	}
}
