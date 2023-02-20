class Page {
	static TextObject = {};

	constructor(id) {
		this.container = document.createElement('div');
		this.container.id = id;
	}

	createHeaderTitle(text) {
		const headerTitle = document.createElement('h1');
		headerTitle.innerHTML = text;
		return headerTitle;
	}

	render() {
		return this.container;
	}

	init() {}

	destroy() {}
}

export default Page;
