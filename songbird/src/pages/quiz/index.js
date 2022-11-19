import Page from '../pages';
import AudioPlayer from '../../components/audio-player';
import SelectedAnswer from '../../components/selected-answer';

class QuizPage extends Page {
	constructor(id, props) {
		super(id);
		this.store = props;

		this.init();
	}

	toHTML() {
		const state = this.store.getState();
		const language = state.userData.language;
		const iFace = this.store.getState().interface[language].quiz;

		return `
		<div class="quiz">

		<p class="quiz__score">
			<span class="quiz__score-logo"></span>
			<span class="quiz__score-value">${iFace.score}: <span>0</span></span>
		</p>

		<div class="quiz__pagination">
			<span class="quiz__pagination-item">${iFace.questionList[0]}</span>
			<span class="quiz__pagination-item quiz__pagination-item_active">${iFace.questionList[1]}</span>
			<span class="quiz__pagination-item">${iFace.questionList[2]}</span>
			<span class="quiz__pagination-item">${iFace.questionList[3]}</span>
			<span class="quiz__pagination-item">${iFace.questionList[4]}</span>
			<span class="quiz__pagination-item ">${iFace.questionList[5]}</span>
		</div>

		<div class="quiz__question">
			<img src="./assets/images/bird-default.jpg" alt="bird" class="quiz__question-image">
			<div class="quiz__question-wrap">
				<!-- <p class="quiz__question-bird-name">* * * * *</p> -->
				<p class="quiz__question-bird-name">Ворон</p>

				<!-- <audio controls></audio> -->

			</div>
		</div>

		<div class="quiz__answer-wrap">
			<ul class="quiz__possible-answers answers">
				<li class="answers__item"><span class="answers__item-marker"></span><span class="answers__item-name">Ворон</span></li>
				<li class="answers__item answers__item_error"><span class="answers__item-marker"></span><span class="answers__item-name">Журавль</span></li>
				<li class="answers__item answers__item_success"><span class="answers__item-marker"></span><span class="answers__item-name">Ласточка</span></li>
				<li class="answers__item"><span class="answers__item-marker"></span><span class="answers__item-name">Козодой</span></li>
				<li class="answers__item"><span class="answers__item-marker"></span><span class="answers__item-name">Кукушка</span></li>
				<li class="answers__item"><span class="answers__item-marker"></span><span class="answers__item-name">Синица</span></li>
			</ul>

			<div class="quiz__selected-answer">



			</div>

		</div>

		<button class="quiz__next-button">${iFace.nextButton}</button>

	</div>
		`;
	}

	render() {
		// const title = this.createHeaderTitle(QuizPage.TextObject.MainTitle);
		this.container.className = 'container quiz-container';
		// this.container.append(title);
		this.container.innerHTML = this.toHTML();

		const questionWrap = this.container.querySelector('.quiz__question-wrap');
		questionWrap.append(this.audioPlayerQuestion.render());

		const selectedAnswerElement = this.container.querySelector('.quiz__selected-answer');
		selectedAnswerElement.append(this.selectedAnswer.render());

		return this.container;
	}

	init() {
		this.selectedAnswer = new SelectedAnswer('div', 'selected-answer');
		this.audioPlayerQuestion = new AudioPlayer('div', 'audioplayer-question');
	}

	destroy() {
		this.selectedAnswer.destroy();
		this.audioPlayerQuestion.destroy();
	}
}

export default QuizPage;
