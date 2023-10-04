import Component from '../component/component';
import { PageComponents } from '../../core/type';

class Main extends Component {
	constructor(props, tagName, className) {
		super(tagName, className);
		this.store = props;

		this.page = null; // PageComponent extend Page
	}

	render() {
		if(this.page) {
			this.page.destroy();
			this.page.container.remove();
		}

		const currentPage = this.store.getState().userData.currentPage;				// string
		this.page = new PageComponents[currentPage](currentPage, this.store);	// PageComponent extend Page

		this.container.append(this.page.render());

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
