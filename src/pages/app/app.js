import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Footer from '../../components/footer/footer';
import { PageIds, PageComponents } from '../../core/type';

class App {
	constructor(props) {
		this.container = document.body;
		this.store = props;
		this.init();
	}

	changeMainSection(idPage) {
		const hasPage = Object.prototype.hasOwnProperty.call(PageComponents, idPage);
		this.store.dispatch({type: 'SWITCH_PAGE', currentPage: hasPage ? idPage : PageIds.ErrorPage});
	}

	enableRouterChange() {
		window.addEventListener('hashchange', () => {
			const hash = window.location.hash.slice(1);
			this.changeMainSection(hash);
			this.header.reNewMenu();
			this.main.render();
		});
	}

	render() {
		this.changeMainSection(this.store.getState().userData.currentPage);
		this.container.append(this.header.render());
		this.container.append(this.main.render());
		this.container.append(this.footer.render());
		this.header.reNewMenu();
	}

	run() {
		this.render();
		this.enableRouterChange();
	}

	init() {
		this.header = new Header(this.store, 'header', 'header');
		this.main = new Main(this.store, 'main', 'main');
		this.footer = new Footer('footer', 'footer');

		this.header.addEventListener('switchlanguage', ()=>{
			this.main.render();
		});
	}

	destroy() {
		this.header.destroy();
		this.main.destroy();
		this.footer.destroy();
	}
}

export default App;
