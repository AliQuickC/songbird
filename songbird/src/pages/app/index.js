import Header from '../../components/header';
import Main from '../../components/main';
import Footer from '../../components/footer';
import StartPage from '../../pages/start';
import RezultsPage from '../../pages/results';
import QuizPage from '../../pages/quiz';
import ErrorPage from '../../pages/error';


export const PageIds = {
	StartPage: 'start-page',
	QuizPage: 'quiz-page',
	RezultsPage: 'rezult-page',
	ErrorPage: 'error-page'
};

class App {
	static container = document.body;
	static defaultPageId;
	static main;

	constructor() {
		App.defaultPageId = 'current-page';
		this.header = new Header('header', 'header');
		App.main = new Main('main', 'main');
		this.footer = new Footer('footer', 'footer');
	}

	static renderNewPage(idPage) {
		const mainContainer = App.main.render();
		mainContainer.innerHTML = '';
		let page = null;

		if (idPage === PageIds.StartPage) {
			page = new StartPage(idPage);
			App.defaultPageId = PageIds.StartPage;
		} else if (idPage === PageIds.RezultsPage) {
			page = new RezultsPage(idPage);
			App.defaultPageId = PageIds.RezultsPage;
		}	else if (idPage === PageIds.QuizPage) {
			page = new QuizPage(idPage);
			App.defaultPageId = PageIds.QuizPage;
		}
		else {
			page = new ErrorPage(idPage);
			App.defaultPageId = PageIds.ErrorPage;
		}

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
			// pageHTML.id = App.defaultPageId;
			mainContainer.append(pageHTML);
		}
	}

	enableRouterChange() {
		window.addEventListener('hashchange', () => {
			const hash = window.location.hash.slice(1);
			App.renderNewPage(hash);
		});
	}

	run() {
		App.container.innerHTML = '';
		App.container.append(this.header.render());
		App.container.append(App.main.render());
		App.container.append(this.footer.render());
		App.defaultPageId = PageIds.StartPage;
		App.renderNewPage(PageIds.StartPage);
		// App.renderNewPage(PageIds.QuizPage);
		// App.renderNewPage(PageIds.RezultsPage);
		this.enableRouterChange();
	}
}

export default App;