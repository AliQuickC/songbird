import Page from '../pages';
import AudioPlayer from '../../components/audio-player';
import SelectedAnswer from '../../components/selected-answer';
import { PageIds } from '../../core/type';
const totalQuestions = 6;

class QuizPage extends Page {
	constructor(id, props) {
		super(id);
		this.store = props;
		this.container.className = 'container quiz-container';

		this.init();
	}

	toHTML() {
		const state = this.store.getState();
		const language = state.userData.language;
		const quizData = state.userData.quizData;
		const questionBirdId =  state.userData.quizData.questionBirdId;
		const iFace = this.store.getState().interface[language].quiz;
		const answers = this.store.getState().data[language][quizData.currentQuestion];
		const questionName = quizData.checkAnswers[questionBirdId] ? answers[questionBirdId].name : '* * * * *';
		const questionImage = quizData.checkAnswers[questionBirdId] ? answers[questionBirdId].image : './assets/images/bird-default.jpg';

		let paginationElements = '';
		for (let i = 0; i < 6; i++) {
			paginationElements += `<span class="quiz__pagination-item">${iFace.questionList[i]}</span>`;
		}

		let answersElems = '';
		for(let i=0; i<6; i++) {
			let answerClass = '';
			if(quizData.checkAnswers[i]) {
				if(i === questionBirdId) {answerClass = 'answers__item_success';}
				else {answerClass = 'answers__item_error';}
			}
			answersElems += `<li class="answers__item ${answerClass}" data-answer="${i}"><span class="answers__item-marker"></span><span class="answers__item-name">${answers[i].name}</span></li>`;
		}

		return `
		<div class="quiz">

		<p class="quiz__score">
			<span class="quiz__score-logo"></span>
			<span class="quiz__score-value">${iFace.score}: <span>${state.userData.quizData.quizScore}</span></span>
		</p>

		<div class="quiz__pagination">
			${paginationElements}
		</div>

		<div class="quiz__question">
			<div class="quiz__question-image-wrap">
				<img src="${questionImage}" alt="bird" class="quiz__question-image">
			</div>
			<div class="quiz__question-wrap">
				<!-- <p class="quiz__question-bird-name">* * * * *</p> -->
				<p class="quiz__question-bird-name">${questionName}</p>

				<!-- <audio controls></audio> -->

			</div>
		</div>

		<div class="quiz__answer-wrap">
			<ul class="quiz__possible-answers answers">
				${answersElems}
			</ul>

			<div class="quiz__selected-answer">
			</div>

		</div>

		<button class="quiz__next-button ${quizData.haveTrueAnswer ? 'quiz__next-button_active' : ''}">${iFace.nextButton}</button>

	</div>
		`;
	}

	render() {
		this.store.dispatch({type: 'INIT_QUIZ'});
		const state = this.store.getState();
		const userData = state.userData;
		const language = userData.language;
		const quizData = userData.quizData;
		const audioSrc = state.data[language][quizData.currentQuestion][quizData.questionBirdId].audio;

		this.container.innerHTML = this.toHTML();

		const questionWrap = this.container.querySelector('.quiz__question-wrap');
		questionWrap.append(this.audioPlayerQuestion.render());
		const selectedAnswerElement = this.container.querySelector('.quiz__selected-answer');
		selectedAnswerElement.append(this.selectedAnswer.render());

		this.setPagination(userData.quizData.currentQuestion);
		this.audioPlayerQuestion.stop();
		this.audioPlayerQuestion.setAudioTrack(audioSrc);

		return this.container;
	}

	setPagination(num) {
		const paginationItems = this.container.querySelector('.quiz__pagination').querySelectorAll('.quiz__pagination-item');
		paginationItems.forEach(item => {
			item.classList.remove('quiz__pagination-item_active');
		});
		paginationItems[num].classList.add('quiz__pagination-item_active');
	}

	init() {
		this.selectedAnswer = new SelectedAnswer(this.store, 'div', 'selected-answer');
		this.audioPlayerQuestion = new AudioPlayer('div', 'audioplayer-question');
		this.answerSound = new Audio();
		this.answerSound.currentTime = 0;
		this.answerSound.volume = 0.2;

		this.container.onclick = (event) => {
			if( event.target) {
				const state = this.store.getState();
				const userData = state.userData;
				const quizData = userData.quizData;

				const selectAnswer = event.target.closest('[data-answer]');
				if(selectAnswer) {
					const answerNum = +selectAnswer.dataset.answer;

					this.store.dispatch({type: 'SELECT_ANSWER', answerNum});
					if(!quizData.haveTrueAnswer && !quizData.checkAnswers[answerNum]) { // new select answer
						if( answerNum === quizData.questionBirdId) {
							this.answerSound.src = './assets/sound/correct-answer.mp3';
							this.answerSound.play();
							this.render();
						} else {
							this.answerSound.src = './assets/sound/wrong-answer.mp3';
							this.answerSound.play();
							// this.selectedAnswer.render();
							// this.answers.render();
							this.render();
						}
					} else {
						// this.selectedAnswer.render();
						// this.answers.render();
						this.render();
					}
				}
				if(event.target.closest('.quiz__next-button') && quizData.haveTrueAnswer) {
					if(quizData.currentQuestion === totalQuestions-1) {
						this.store.dispatch({type: 'END_QUIZ'});
						window.location.hash = PageIds.RezultsPage;
					} else {
						this.store.dispatch({type: 'NEXT_QUESTION'});
						this.render();
					}
				}
			}
		};
	}

	destroy() {
		this.selectedAnswer.destroy();
		this.audioPlayerQuestion.destroy();
	}
}

export default QuizPage;
