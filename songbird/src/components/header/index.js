import Component from '../components';
import { PageIds } from '../../pages/app';

class Header extends Component {
	constructor(tagName, className) {
		super(tagName, className);
	}

	toHTML() {
		this.container.innerHTML = `<div class="container header-container">
			<nav class="nav-bar" id="header-menu">
			<a href="#${PageIds.StartPage}" class="logo" ></a>
			<a href="#${PageIds.QuizPage}" class="switch-quiz-page active-link">Quiz</a>
			<a href="#${PageIds.RezultsPage}" class="switch-rezults-page ">Rezults</a>
			</>
			</div >`;
	}

	render() {
		this.toHTML();
		return this.container;
	}
}

export default Header;
