import Page from '../pages';
import { PageIds } from '../../core/type';

class StartPage extends Page {
	constructor(id, props) {
		super(id);
		this.store = props;

		this.init();
	}

	toHTML() {
		const state = this.store.getState();
		const language = state.userData.language;
		const iFace = this.store.getState().interface[language].startPage;

		return `
		<div class="start-container__wrap">
			<button class="start-container__button start-button">${iFace.startButton}</button>
		</div>
		`;
	}

	init() {
		this.container.onclick = (event) => {
			if(event.target.closest('.start-container__button')) {
				window.location.hash = PageIds.QuizPage;
			}
		};
	}

	destroy() {
		this.container.onclick = null;
	}

	render() {
		this.container.className = 'container start-container';
		this.container.innerHTML = this.toHTML();
		return this.container;
	}
}

export default StartPage;
