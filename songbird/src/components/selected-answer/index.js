import Component from '../components';
import AudioPlayer from '../../components/audio-player';

class SelectedAnswer extends Component {
	constructor(tagName, className) {
		super(tagName, className);

		this.init();
	}

	toHTML() {
		return `
		<!-- <p class="selected-answer__noselect">Послушайте плеер. <br>
			Выберите птицу из списка
		</p> -->

		<img src="./assets/images/bird-default.jpg" alt="bird" class="selected-answer__image">
		<div class="selected-answer__about-wrap">
			<h4 class="selected-answer__bird-name">Синица</h4>
			<span class="selected-answer__bird-species">Parus major</span>


		</div>
		<p class="selected-answer__bird-description">В щебетании синиц различают более 40 различных звуковых сочетаний. Поют они практически круглый год, немного затихая только зимой. Синицы настоящие санитары леса. Одна пара синиц в период гнездования оберегает от вредителей десятки деревьев.</p>
		`;
	}

	render() {
		this.container.innerHTML = this.toHTML();
		const aboutAnswerElement = this.container.querySelector('.selected-answer__about-wrap');
		aboutAnswerElement.append(this.audioPlayerQuestion.render());

		return this.container;
	}

	init() {
		this.audioPlayerQuestion = new AudioPlayer('div', 'audioplayer-answer');
	}

	destroy() {
		this.audioPlayerQuestion.destroy();
	}
}

export default SelectedAnswer;