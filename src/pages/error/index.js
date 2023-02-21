import Page from '../pages';

class ErrorPage extends Page {

	static TextObject = {MainTitle: '404: Error! The page was not found.'};

	constructor(id) {
		super(id);
		this.container.className = 'container error-container';
	}

	render() {
		const title = this.createHeaderTitle(ErrorPage.TextObject.MainTitle);
		this.container.append(title);
		return this.container;
	}
}

export default ErrorPage;