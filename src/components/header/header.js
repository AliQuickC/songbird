import Component from '../component/component';
import { PageIds } from '../../core/type';

class Header extends Component {
	constructor(props, tagName, className) {
		super(tagName, className);
		this.store = props;
		this.init();
	}

	reNewMenu() {
		const currentPage = this.store.getState().userData.currentPage;								// string
		const headerMenuItems = this.container.querySelectorAll('a');

		headerMenuItems.forEach(item => {
			item.classList.remove('active-link');
		});
		if(currentPage === PageIds.QuizPage || currentPage === PageIds.RezultsPage) {
			const activeMenu = this.container.querySelector(`[href="#${currentPage}"]`);
			if(activeMenu) { activeMenu.classList.add('active-link'); }
		}
	}

	init() {
		this.container.onchange = (event)=> {
			if(event.target && event.target.closest('.switch__box')) {
				const language = event.target.checked ? 'en' : 'ru';
				this.store.dispatch({type: 'SET_LANGUAGE', language});
				this._triggerEvent('switchlanguage');

				const state = this.store.getState();
				const intLanguage = state.userData.language;
				const iFace = state.interface[intLanguage];

				this.container.querySelector('.switch-quiz-page').textContent = iFace.menuQuiz;
				this.container.querySelector('.switch-rezults-page').textContent = iFace.menuRezult;
				this.container.querySelector('.switch-language__label').textContent = iFace.langSwitch;
			}
		};
	}

	destroy() {
		this.container.onchange = null;
		this.container.remove();
	}

	toHTML() {
		const state = this.store.getState();
		const language = state.userData.language;
		const iFace = state.interface[language];

		return `
		<div class="container header-container">
			<nav class="nav-bar" id="header-menu">
				<a href="#${PageIds.StartPage}" class="logo" ></a>
				<a href="#${PageIds.QuizPage}" class="switch-quiz-page ">${iFace.menuQuiz}</a>
				<a href="#${PageIds.RezultsPage}" class="switch-rezults-page ">${iFace.menuRezult}</a>
			</nav>

			<div class="switch-language">
				<label class="switch">
					<input type="checkbox" class="switch__box" name="" id="" ${language === 'en' ? 'checked' : ''}>
					<span class="switch__button"></span>
				</label>

				<p class="switch-language__label">
					${iFace.langSwitch}
				</p>
			</div>

			</div >`;
	}

	render() {
		this.container.innerHTML = this.toHTML();
		return this.container;
	}
}

export default Header;
