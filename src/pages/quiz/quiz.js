import Page from '../page/Page';
import AudioPlayer from '../../components/audio-player/audio-player';
import AnswersList from '../../components/answers-list/answers-list';
import BirdCard from '../../components/bird-card/bird-card';
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
		const trueAnswer =  state.userData.quizData.trueAnswer;
		const iFace = state.interface[language].quiz;
		const answers = state.data[language][quizData.currentQuestion];
		const questionName = quizData.checkAnswers[trueAnswer] ? answers[trueAnswer].name : '* * * * *';
		const questionImage = quizData.checkAnswers[trueAnswer] ? answers[trueAnswer].image : './assets/images/bird-default.jpg';

		let paginationElements = '';
		for (let i = 0; i < 6; i++) {
			paginationElements += `<span class="quiz__pagination-item">${iFace.questionList[i]}</span>`;
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
			<div class="quiz__question-wrap" id="quiz-question-wrap">
				<!-- <p class="quiz__question-bird-name">* * * * *</p> -->
				<p class="quiz__question-bird-name">${questionName}</p>

				<!-- <audio controls></audio> -->

			</div>
		</div>

		<div class="quiz__answer-wrap">
			<div class="answers" id="answers">


			</div>

			<div class="quiz__selected-answer" id="quiz-selected-answer">
			</div>

		</div>

		<button class="quiz__next-button ${quizData.haveTrueAnswer ? 'quiz__next-button_active' : ''}">${iFace.nextButton}</button>

	</div>
		`;
	}

	render() {
		this.store.dispatch({type: 'QUIZ_START_INIT'});
		const state = this.store.getState();
		const userData = state.userData;
		const language = userData.language;
		const quizData = userData.quizData;
		const audioSrc = state.data[language][quizData.currentQuestion][quizData.trueAnswer].audio;
		const iFace = state.interface[language].quiz;

		const havSelectAnswer = quizData.checkAnswers.some(x=>x);

		this.container.innerHTML = this.toHTML();

		const questionWrap = this.container.querySelector('#quiz-question-wrap');
		questionWrap.append(this.audioPlayerQuestion.render());

		const answers = this.container.querySelector('#answers');
		answers.append(this.answersList.render());

		const birdCardElement = this.container.querySelector('#quiz-selected-answer');
		havSelectAnswer ?
			birdCardElement.append(this.birdCard.render({question: quizData.currentQuestion, cardId: quizData.selectAnswer})) :
			birdCardElement.innerHTML = `<div class="bird-card"><p class="bird-card__noselect">${iFace.answerNoSelect}</p></div>`;

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
		this.audioPlayerQuestion = new AudioPlayer('div', 'audioplayer-question');
		this.answersList = new AnswersList(this.store, 'div', 'answers__list');
		this.birdCard = new BirdCard(this.store, 'div', '');
		this.answerCheckSound = new Audio();
		this.answerCheckSound.currentTime = 0;
		this.answerCheckSound.volume = 0.2;

		this.container.onclick = (event) => {
			if( event.target) {
				let state = this.store.getState();
				let userData = state.userData;
				let quizData = userData.quizData;

				const selectAnswer = event.target.closest('[data-answer]');
				if(selectAnswer) {
					const answerNum = +selectAnswer.dataset.answer;

					const prevCheckAnswers = quizData.checkAnswers[answerNum];
					if(!prevCheckAnswers && !quizData.haveTrueAnswer) {	// answer selected for the First time, and not have true answer
						const havSelectAnswer = quizData.checkAnswers.some(x=>x);
						this.store.dispatch({type: 'SELECT_ANSWER', answerNum});
						state = this.store.getState();
						quizData = state.userData.quizData;

						if( answerNum === quizData.trueAnswer) {	// selected answer, is True
							this.answerCheckSound.src = './assets/sound/correct-answer.mp3';
							this.answerCheckSound.play();
							this.render();
						} else {																	// selected answer, is False
							this.answerCheckSound.src = './assets/sound/wrong-answer.mp3';
							this.answerCheckSound.play();
							if(havSelectAnswer) {
								this.answersList.render();
								this.birdCard.render({question: quizData.currentQuestion, cardId: quizData.selectAnswer});
							} else {
								this.render();
							}
						}
					} else {																		// answer has been Reselected
						this.birdCard.render({question: quizData.currentQuestion, cardId: answerNum});
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
		this.container.onclick = null;
		this.audioPlayerQuestion.destroy();
		this.answersList.destroy();
		this.birdCard.destroy();
		this.answerCheckSound = null;
		super.destroy();
	}
}

export default QuizPage;
