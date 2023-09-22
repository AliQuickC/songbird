import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Footer from '../../components/footer/footer';
import StartPage from '../start/start';
import GalleryPage from '../gallery/gallery';
import RezultsPage from '../results/results';
import QuizPage from '../quiz/quiz';
import ErrorPage from '../error/error';
import { PageIds } from '../../core/type';

class App {
	constructor(props) {
		this.container = document.body;
		this.store = props;
		this.currentPage = this.store.getState().userData.currentPage;
		this.init();
	}

	renderMainSection(idPage) {
		if(this.main.page) {
			this.main.page.destroy();
			this.main.page.container.remove();
		}
		const mainContainer = this.main.container;
		let page = null;

		if (idPage === PageIds.StartPage) {
			page = new StartPage(idPage, this.store);
			this.currentPage = PageIds.StartPage;
		} else if (idPage === PageIds.RezultsPage) {
			page = new RezultsPage(idPage, this.store);
			this.currentPage = PageIds.RezultsPage;
		}	else if (idPage === PageIds.GalleryPage) {
			page = new GalleryPage(idPage, this.store);
			this.currentPage = PageIds.GalleryPage;
		}	else if (idPage === PageIds.QuizPage) {
			page = new QuizPage(idPage, this.store);
			this.currentPage = PageIds.QuizPage;
		}	else {
			page = new ErrorPage(PageIds.ErrorPage);
			this.currentPage = PageIds.ErrorPage;
		}

		this.store.dispatch({type: 'SWITCH_PAGE', currentPage: this.currentPage});

		const headerMenu = document.querySelector('#header-menu');
		const headerMenuItems = headerMenu.querySelectorAll('a');
		headerMenuItems.forEach(item => {
			item.classList.remove('active-link');
		});
		if(idPage !== PageIds.StartPage) {
			const activeMenu = headerMenu.querySelector(`[href="#${this.currentPage}"]`);
			if(activeMenu) { activeMenu.classList.add('active-link'); }
		}

		if (page) {
			const pageHTML = page.render();
			this.main.page = page;
			mainContainer.append(pageHTML);
		}
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
		this.renderMainSection(this.currentPage);
		// this.renderMainSection(PageIds.StartPage);
		// this.renderMainSection(PageIds.QuizPage);
		// this.renderMainSection(PageIds.RezultsPage);
	}

	run() {
		this.currentPage = this.store.getState().userData.currentPage;
		this.render();

		this.enableRouterChange();
	}

	init() {
		this.header = new Header(this.store, 'header', 'header');
		this.main = new Main('main', 'main');
		this.footer = new Footer('footer', 'footer');

		this.header.addEventListener('switchlanguage', ()=>{
			this.renderMainSection(this.currentPage);
		});
	}

	destroy() {
		this.header.destroy();
		this.main.destroy();
		this.footer.destroy();

	}
}

export default App;
