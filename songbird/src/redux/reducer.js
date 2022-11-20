import { randomInteger } from '../core/utils';
// const maxScore = 30;
const maxQuestuionScore = 6;

export default function reducer(state, action) {
	let userData;
	let quizData;
	switch (action.type) {
	case 'SET_USER_DATA':
		state.userData = action.userData;
		return state;
	case 'SET_LANGUAGE':
		userData = JSON.parse(JSON.stringify(state.userData));
		userData.language = action.language;
		state.userData = userData;
		return state;
	case 'SWITCH_PAGE':
		userData = JSON.parse(JSON.stringify(state.userData));
		userData.currentPage = action.currentPage;
		state.userData = userData;
		return state;
	case 'INIT_QUIZ':
		if(!state.userData.quizData.startQuiz) {
			quizData = {
				startQuiz: true,
				currentQuestion: 0,
				questionBirdId: randomInteger(0, 5),
				checkAnswers: new Array(6).fill(false),
				selectAnswer: undefined,
				haveTrueAnswer: false,
				quizScore: 0,
			};
			state.userData.quizData = quizData;
		}
		return state;
	case 'SELECT_ANSWER':
		quizData = JSON.parse(JSON.stringify(state.userData.quizData));
		if(!quizData.haveTrueAnswer) { quizData.checkAnswers[action.answerNum] = true; }
		quizData.selectAnswer = action.answerNum;
		if(action.answerNum === quizData.questionBirdId && !quizData.haveTrueAnswer) { // treu answer
			quizData.haveTrueAnswer = true;
			quizData.quizScore += maxQuestuionScore - quizData.checkAnswers.reduce((summ, item) => item ? summ + 1 : summ, 0);
		}
		state.userData.quizData = quizData;
		return state;
	case 'NEXT_QUESTION':
		quizData = JSON.parse(JSON.stringify(state.userData.quizData));
		quizData.currentQuestion = quizData.currentQuestion + 1,
		quizData.questionBirdId = randomInteger(0, 5);
		quizData.checkAnswers = new Array(6).fill(false);
		quizData.selectAnswer = undefined;
		quizData.haveTrueAnswer = false;
		state.userData.quizData = quizData;
		return state;
	case 'END_QUIZ':
		userData = JSON.parse(JSON.stringify(state.userData));
		userData.quizData.startQuiz = false;
		userData.score = userData.quizData.quizScore;
		state.userData = userData;
		return state;
	default:
		return state;
	}
}
