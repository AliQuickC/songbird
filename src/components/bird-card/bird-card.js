import Component from '../component/component';
import AudioPlayer from '../audio-player/audio-player';

class BirdCard extends Component {
	constructor(props, tagName, className) {
		super(tagName, className);
		this.store = props;
		this.audioPlayerQuestion = null;

		this.init();
	}

	toHTML(birdId) {
		const state = this.store.getState();
		const language = state.userData.language;
		const selectAnswer = state.data[language][birdId.question][birdId.cardId];

		return `
		<div class="bird-card__image-wrap">
			<img src="${selectAnswer.image}" alt="bird" class="bird-card__image">
		</div>
		<div class="bird-card__about-wrap">
			<h4 class="bird-card__bird-name">${selectAnswer.name}</h4>
			<span class="bird-card__bird-species">${selectAnswer.species}</span>
		</div>
		<p class="bird-card__bird-description">${selectAnswer.description}</p>
		`;
	}

	render(birdId = {question: 0, cardId: 0}) {
		const state = this.store.getState();
		const language = state.userData.language;
		const selectAnswer = state.data[language][birdId.question][birdId.cardId];

		this.audioPlayerQuestion?.stop();

		this.audioPlayerQuestion?.destroy();
		this.audioPlayerQuestion = new AudioPlayer('div', '');

		this.container.innerHTML = this.toHTML(birdId);

		const aboutAnswerElement = this.container.querySelector('.bird-card__about-wrap');
		aboutAnswerElement.append(this.audioPlayerQuestion.render());
		this.audioPlayerQuestion.setAudioTrack(selectAnswer.audio);

		return this.container;
	}

	init() {
		this.container.classList.add('bird-card');
	}

	destroy() {
		this.audioPlayerQuestion?.destroy();
		super.destroy();
	}
}

export default BirdCard;