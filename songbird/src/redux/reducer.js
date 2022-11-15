export default function reducer(state, action) {
	switch (action.type) {
	case 'SET_USER_DATA':
		state.userData = action.userData;
		return state;
	default:
		return state;
	}
}
