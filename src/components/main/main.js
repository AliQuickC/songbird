import Component from '../component/component';

class Main extends Component {
	constructor(tagName, className) {
		super(tagName, className);
		this.page = null;
	}

	render() {
		return this.container;
	}

	init() {}

	destroy() {
		if(this.page) {this.page.destroy();}
	}
}

export default Main;
