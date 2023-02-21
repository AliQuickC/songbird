import Page from '../pages';
import { PageIds } from '../../core/type';
const maxScoreRezult = 30;
class RezultsPage extends Page {
	constructor(id, props) {
		super(id);
		this.container.className = 'container rezults-container';
		this.store = props;

		this.init();
	}

	toHTML() {
		const state = this.store.getState();
		const language = state.userData.language;
		const iFace = this.store.getState().interface[language];

		let message = '';

		if(state.userData.score) {
			message = `${iFace.rezultPage.scoreInfo}: ${state.userData.score}`;
		} else {
			message = iFace.rezultPage.noScoreInfo;
		}

		let nextRezult = '';
		if(!state.userData.quizData.startQuiz) {
			if(state.userData.score === maxScoreRezult) {
				nextRezult = `<p class="rezult-window__info-complete">${iFace.rezultPage.congratulations}</p>`;
			} else {
				nextRezult = `<button class="startpage-button">${iFace.startPage.startButton}</button>`;
			}
		} else {
			nextRezult = `<p class="rezult-window__info-complete">${iFace.rezultPage.completeInfo}</p>`;
		}

		return `
		<div class="rezult-window">
			<p class="rezult-window__info">${message}</p>
			${nextRezult}
		</div>
		`;
	}

	init() {
		this.container.onclick = (event) => {
			if(event.target.closest('.startpage-button')) {
				window.location.hash = PageIds.QuizPage;
			}
		};
	}

	destroy() {
		this.container.onclick = null;
	}

	render() {
		this.container.innerHTML = this.toHTML();
		return this.container;
	}
}

export default RezultsPage;
