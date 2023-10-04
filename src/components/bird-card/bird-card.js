import Component from '../component/component';
import AudioPlayer from '../audio-player/audio-player';

class BirdCard extends Component {
	constructor(props, tagName, className) {
		super(tagName, className);
		this.store = props;

		this.init();
	}

	toHTML(birdId) {
		const state = this.store.getState();
		const quizData = state.userData.quizData;
		const language = state.userData.language;
		const iFace = this.store.getState().interface[language].quiz;

		const selectAnswer = state.data[language][birdId.question][birdId.cardId];

		if(birdId.card || quizData.selectAnswer !== undefined) {
			return `
			<div class="selected-answer__image-wrap">
				<img src="${selectAnswer.image}" alt="bird" class="selected-answer__image">
			</div>
			<div class="selected-answer__about-wrap">
				<h4 class="selected-answer__bird-name">${selectAnswer.name}</h4>
				<span class="selected-answer__bird-species">${selectAnswer.species}</span>
			</div>
			<p class="selected-answer__bird-description">${selectAnswer.description}</p>
			`;
		} else {
			return `
			<p class="selected-answer__noselect">${iFace.answerNoSelect}</p>`;
		}
	}

	render(birdId = {question: 0, cardId: 0, card: false}) {
		const state = this.store.getState();
		const quizData = state.userData.quizData;
		const language = state.userData.language;
		const selectAnswer = state.data[language][birdId.question][birdId.cardId];

		this.container.innerHTML = this.toHTML(birdId);

		this.audioPlayerQuestion.stop();
		if(birdId.card || quizData.selectAnswer !== undefined) {
			const aboutAnswerElement = this.container.querySelector('.selected-answer__about-wrap');
			aboutAnswerElement.append(this.audioPlayerQuestion.render());
			this.audioPlayerQuestion.setAudioTrack(selectAnswer.audio);
		}

		return this.container;
	}

	init() {
		this.audioPlayerQuestion = new AudioPlayer('div', 'audioplayer-answer');
	}

	destroy() {
		this.audioPlayerQuestion.destroy();
		super.destroy();
	}
}

export default BirdCard;