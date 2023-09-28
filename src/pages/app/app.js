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

	renderMainSection(idPage) {
		if(this.main.page) {
			this.main.page.destroy();
			this.main.page.container.remove();
		}
		const mainContainer = this.main.container;

		const hasPage = Object.prototype.hasOwnProperty.call(PageComponents, idPage);

		this.store.dispatch({type: 'SWITCH_PAGE', currentPage: hasPage ? idPage : PageIds.ErrorPage});
		const currentPage = this.store.getState().userData.currentPage;								// string
		const page = hasPage ? new PageComponents[currentPage](idPage, this.store) :	// PageComponent extend Page
			new PageComponents[currentPage](idPage);

		const headerMenu = document.querySelector('#header-menu');
		const headerMenuItems = headerMenu.querySelectorAll('a');
		headerMenuItems.forEach(item => {
			item.classList.remove('active-link');
		});
		if(currentPage === PageIds.QuizPage || currentPage === PageIds.RezultsPage) {
			const activeMenu = headerMenu.querySelector(`[href="#${currentPage}"]`);
			if(activeMenu) { activeMenu.classList.add('active-link'); }
		}

		const pageHTML = page.render();
		this.main.page = page;
		mainContainer.append(pageHTML);
	}

	enableRouterChange() {
		window.addEventListener('hashchange', () => {
			const hash = window.location.hash.slice(1);
			this.renderMainSection(hash);
		});
	}

	render() {
		this.container.append(this.header.render());
		this.container.append(this.main.render());
		this.container.append(this.footer.render());
		this.renderMainSection(this.store.getState().userData.currentPage); // !!!
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
			this.renderMainSection(this.store.getState().userData.currentPage);
		});
	}

	destroy() {
		this.header.destroy();
		this.main.destroy();
		this.footer.destroy();

	}
}

export default App;
