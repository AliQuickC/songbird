import Page from '../pages';

class StartPage extends Page {

	static TextObject = {MainTitle: 'Start Page'};

	constructor(id) {
		super(id);
	}

	render() {
		const title = this.createHeaderTitle(StartPage.TextObject.MainTitle);
		this.container.className = 'container start-container';
		this.container.append(title);
		return this.container;
	}
}

export default StartPage;
