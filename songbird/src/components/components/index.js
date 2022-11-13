class Component {
	constructor(tagName, className) {
		this.container = document.createElement(tagName);
		this.container.className = className;
	}

	render() {
		return this.container;
	}
}

export default Component;
