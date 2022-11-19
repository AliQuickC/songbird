import './index.sass';
import birdsDataEn from './data/birds-en';
import birdsDataRu from './data/birds-ru';
import reducer from './redux/reducer';
import createStore from './redux/store';
import App from './pages/app';
import { PageIds } from './core/type';
import langInterface from './data/interface';

const storeKEY = 'songbird';
const defaultUserData = {
	language: 'ru',
	score: 0,
	currentPage: PageIds.StartPage,
};

const initialState = {
	userData: {},
	interface: langInterface,
	data: {
		en: birdsDataEn,
		ru: birdsDataRu,
	}
};

const store = createStore(reducer, initialState);
getLocalStorage();

export function getLocalStorage() {
	if (!localStorage.getItem(storeKEY) || localStorage.getItem(storeKEY) === '{}') { // if there is no data in the store, create it from a template object
		const stringUserData = JSON.stringify(defaultUserData); // object to string
		localStorage.setItem(storeKEY, stringUserData); // string to Local Storage
	}
	const userData = JSON.parse(localStorage.getItem(storeKEY)); // read date from the store
	store.dispatch({type: 'SET_USER_DATA', userData});
}
function setItemToLocalStorage() {
	localStorage.setItem(storeKEY, JSON.stringify(store.getState().userData));
}
window.addEventListener('beforeunload', setItemToLocalStorage);

const app = new App(store);
app.run();
