import Component from '../components';

class Main extends Component {
	constructor(tagName, className) {
		super(tagName, className);
		this.page = null;
	}

	render() {
		return this.container;
	}
}

export default Main;
