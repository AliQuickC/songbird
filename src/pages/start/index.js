import Page from '../pages';
import { PageIds } from '../../core/type';

class StartPage extends Page {
	constructor(id, props) {
		super(id);
		this.container.className = 'container start-container';
		this.store = props;

		this.init();
	}

	toHTML() {
		const state = this.store.getState();
		const language = state.userData.language;
		const iFace = this.store.getState().interface[language].startPage;

		return `
		<div class="start-container__wrap">
			<button class="start-container__start-button startpage-button">${iFace.startButton}</button>
			<button class="start-container__gallery-button startpage-button">${iFace.galleryButton}</button>
		</div>
		`;
	}

	init() {
		this.container.onclick = (event) => {
			if(event.target.closest('.start-container__start-button')) {
				window.location.hash = PageIds.QuizPage;
			} else if (event.target.closest('.start-container__gallery-button')) {
				window.location.hash = PageIds.GalleryPage;
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

export default StartPage;
