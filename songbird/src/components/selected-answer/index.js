import Component from '../components';
import AudioPlayer from '../../components/audio-player';

class SelectedAnswer extends Component {
	constructor(props, tagName, className) {
		super(tagName, className);
		this.store = props;

		this.init();
	}

	toHTML() {
		const state = this.store.getState();
		const quizData = state.userData.quizData;
		const language = state.userData.language;
		const iFace = this.store.getState().interface[language].quiz;
		const selectAnswer = state.data[language][quizData.currentQuestion][quizData.selectAnswer];
		// console.log('selectAnswer: ', selectAnswer);

		if(quizData.selectAnswer !== undefined) {
			// currentQuestion: 0,

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

	render() {
		const state = this.store.getState();
		const quizData = state.userData.quizData;
		const language = state.userData.language;
		const selectAnswer = state.data[language][quizData.currentQuestion][quizData.selectAnswer];

		this.container.innerHTML = this.toHTML();

		this.audioPlayerQuestion.stop();
		if(quizData.selectAnswer !== undefined) {
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
	}
}

export default SelectedAnswer;