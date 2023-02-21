import Publisher from '../../core/Emitter';
class Component extends Publisher {
	constructor(tagName, className) {
		super();
		this.container = document.createElement(tagName);
		this.container.className = className;
	}

	render() {
		return this.container;
	}
}

export default Component;
