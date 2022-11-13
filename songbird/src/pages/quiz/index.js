import Page from '../pages';

class QuizPage extends Page {

	static TextObject = {MainTitle: 'Quiz Page'};

	constructor(id) {
		super(id);
	}

	render() {
		const title = this.createHeaderTitle(QuizPage.TextObject.MainTitle);
		this.container.className = 'container rezults-container';
		this.container.append(title);
		return this.container;
	}
}

export default QuizPage;
