import Page from '../pages';

class ErrorPage extends Page {

	static TextObject = {MainTitle: '404: Error! The page was not found.'};

	constructor(id) {
		super(id);
	}

	render() {
		const title = this.createHeaderTitle(ErrorPage.TextObject.MainTitle);
		this.container.className = 'container rezults-container';
		this.container.append(title);
		return this.container;
	}
}

export default ErrorPage;