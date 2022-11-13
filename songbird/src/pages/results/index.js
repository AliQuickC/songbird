import Page from '../pages';

class RezultsPage extends Page {

	static TextObject = {MainTitle: 'Rezults Page'};

	constructor(id) {
		super(id);
	}

	render() {
		const title = this.createHeaderTitle(RezultsPage.TextObject.MainTitle);
		this.container.className = 'container rezults-container';
		this.container.append(title);
		return this.container;
	}
}

export default RezultsPage;
