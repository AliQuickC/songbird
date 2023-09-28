import Component from '../component/component';

class Main extends Component {
	constructor(props, tagName, className) {
		super(tagName, className);
		this.store = props;

		this.page = null; // PageComponent extend Page
		// this.store.getState().userData.currentPage;
	}

	render() {
		// this.container.append(page.getContainer().render())
		return this.container;
	}

	init() {}

	destroy() {
		if (this.page) {
			this.page.destroy();
		}
	}
}

export default Main;
