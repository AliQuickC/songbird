import Component from '../components';
import { PageIds } from '../../core/type';

class Header extends Component {
	constructor(props, tagName, className) {
		super(tagName, className);
		this.state = props;
		this.init();
	}

	init() {
		this.container.onchange = (event)=> {
			this.state.dispatch({type: 'SET_LANGUAGE', language: event.target.value});
			this._triggerEvent('switchlanguage', {});
		};
	}

	destroy() {
		this.container.onchange = null;
	}

	toHTML() {
		const state = this.state.getState();
		const language = state.userData.language;
		const iFace = state.interface[language];

		return `
		<div class="container header-container">
			<nav class="nav-bar" id="header-menu">
				<a href="#${PageIds.StartPage}" class="logo" ></a>
				<a href="#${PageIds.QuizPage}" class="switch-quiz-page ">${iFace.menuQuiz}</a>
				<a href="#${PageIds.RezultsPage}" class="switch-rezults-page ">${iFace.menuRezult}</a>
			</nav>
			<select class="select-language" name="select">
				<option value="en" ${language === 'en' ? 'selected' : ''}>${iFace.langEn}</option>
				<option value="ru" ${language === 'ru' ? 'selected' : ''}>${iFace.langRu}</option>
			</select>
		</div >`;
	}

	render() {
		this.container.innerHTML = this.toHTML();
		return this.container;
	}
}

export default Header;
