import ErrorPage from '../pages/error/error';
import GalleryPage from '../pages/gallery/gallery';
import QuizPage from '../pages/quiz/quiz';
import RezultsPage from '../pages/results/results';
import StartPage from '../pages/start/start';

export const PageIds = {
	StartPage: 'start-page',
	GalleryPage: 'gallery-page',
	QuizPage: 'quiz-page',
	RezultsPage: 'rezult-page',
	ErrorPage: 'error-page',
};

export const PageComponents = {
	'start-page': StartPage,
	'gallery-page': GalleryPage,
	'quiz-page': QuizPage,
	'rezult-page': RezultsPage,
	'error-page': ErrorPage,
};
