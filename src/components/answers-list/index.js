import Component from '../components';

class AnswersList extends Component {
	constructor(props, tagName, className) {
		super(tagName, className);
		this.store = props;

		this.init();
	}

	init() {}

	destroy() {}

	toHTML() {
		const state = this.store.getState();
		const language = state.userData.language;
		const quizData = state.userData.quizData;
		const trueAnswer =  state.userData.quizData.trueAnswer;
		const answers = state.data[language][quizData.currentQuestion];

		let answersElems = '';
		for(let i=0; i<6; i++) {
			let answerClass = '';
			if(quizData.checkAnswers[i]) {
				if(i === trueAnswer) {answerClass = 'answers__item_success';}
				else {answerClass = 'answers__item_error';}
			}
			answersElems += `<li class="answers__item ${answerClass}" data-answer="${i}"><span class="answers__item-marker"></span><span class="answers__item-name">${answers[i].name}</span></li>`;
		}

		return `
		<ul class="answers__list">
			${answersElems}
		</ul>
		`;
	}

	render() {
		this.container.innerHTML = this.toHTML();

		return this.container;
	}
}

export default AnswersList;
