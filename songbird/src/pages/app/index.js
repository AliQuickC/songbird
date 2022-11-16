import Header from '../../components/header';
import Main from '../../components/main';
import Footer from '../../components/footer';
import StartPage from '../../pages/start';
import RezultsPage from '../../pages/results';
import QuizPage from '../../pages/quiz';
import ErrorPage from '../../pages/error';
import { PageIds } from '../../core/type';

class App {
	// static currentPage;
	// static main;

	constructor(props) {
		this.container = document.body;
		this.store = props;
		// this.currentPage = 'current-page';
		this.currentPage = this.store.getState().userData.currentPage;
		this.header = new Header(this.store, 'header', 'header');
		this.main = new Main('main', 'main');
		this.footer = new Footer('footer', 'footer');

		this.header.addEventListener('switchlanguage', ()=>{
			this.render();
		});
	}

	renderNewPage(idPage) {
		const mainContainer = this.main.container;
		const currentPageHTML = mainContainer.querySelector(`#${this.currentPage}`);
		if (currentPageHTML) {
			// this.main.page.destroy();
			currentPageHTML.remove();
		}
		// mainContainer.innerHTML = '';
		let page = null;

		if (idPage === PageIds.StartPage) {
			page = new StartPage(idPage);
			this.currentPage = PageIds.StartPage;
		} else if (idPage === PageIds.RezultsPage) {
			page = new RezultsPage(idPage);
			this.currentPage = PageIds.RezultsPage;
		}	else if (idPage === PageIds.QuizPage) {
			page = new QuizPage(idPage);
			this.currentPage = PageIds.QuizPage;
		}
		else {
			page = new ErrorPage(idPage);
			this.currentPage = PageIds.ErrorPage;
		}

		this.store.dispatch({type: 'SWITCH_PAGE', currentPage: this.currentPage});

		const headerMenu = document.querySelector('#header-menu');
		const headerMenuItems = headerMenu.querySelectorAll('a');
		headerMenuItems.forEach(item => {
			item.classList.remove('active-link');
		});
		if(idPage !== PageIds.StartPage) {
			const activeMenu = headerMenu.querySelector(`[href="#${idPage}"]`);
			activeMenu.classList.add('active-link');
		}

		if (page) {
			const pageHTML = page.render();
			this.main.page = page;
			// pageHTML.id = this.currentPage;
			mainContainer.append(pageHTML);
		}
	}

	enableRouterChange() {
		window.addEventListener('hashchange', () => {
			const hash = window.location.hash.slice(1);
			this.renderNewPage(hash);
		});
	}

	render() {
		this.container.append(this.header.render());
		this.container.append(this.main.render());
		this.container.append(this.footer.render());
		this.renderNewPage(this.currentPage);
		// this.renderNewPage(PageIds.StartPage);
		// this.renderNewPage(PageIds.QuizPage);
		// this.renderNewPage(PageIds.RezultsPage);
	}

	run() {
		this.currentPage = this.store.getState().userData.currentPage;
		this.render();

		this.enableRouterChange();
	}
}

export default App;
