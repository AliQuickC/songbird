import Page from '../pages';

class QuizPage extends Page {

	static TextObject = { MainTitle: 'Quiz Page' };

	constructor(id) {
		super(id);
	}

	toHTML() {
		return `
		<div class="quiz">

		<p class="quiz__score">
			<span class="quiz__score-logo"></span>
			<span class="quiz__score-value">Score: <span>0</span></span>
		</p>

		<div class="quiz__pagination">
			<span class="quiz__pagination-item">Разминка</span>
			<span class="quiz__pagination-item quiz__pagination-item_active">Воробъиные</span>
			<span class="quiz__pagination-item">Лесные птици</span>
			<span class="quiz__pagination-item">Певчие птици</span>
			<span class="quiz__pagination-item">Хищные птици</span>
			<span class="quiz__pagination-item ">Морские птици</span>
		</div>

		<div class="quiz__question">
			<img src="./assets/images/bird-default.jpg" alt="bird" class="quiz__question-image">
			<div class="quiz__question-wrap">
				<!-- <p class="quiz__question-bird-name">* * * * *</p> -->
				<p class="quiz__question-bird-name">Ворон</p>

				<!-- <audio controls></audio> -->
				<div class="audioplayer audioplayer-question">
					<button class="audioplayer__play-button audioplayer__play-button_pause"></button>
					<div class="audioplayer__time">
						<div class="audioplayer__progress-time">
							<input class="audioplayer__range-time audioplayer__progress-range" type="range" value="40" min="0" max="100" step="1" name="" id="">
							<span class="audioplayer__progress-time-current">00:09</span>
							<span class="audioplayer__progress-time-end">00:27</span>
						</div>
					</div>
					<div class="audioplayer__volume">
						<button class="audioplayer__mute-button audioplayer__mute-button_on"></button>
						<input class="audioplayer__range-volume audioplayer__progress-range" type="range" value="40" min="0" max="100" step="1" name="" id="">
					</div>
				</div>

			</div>
		</div>

		<div class="quiz__answer-wrap">
			<ul class="quiz__possible-answers answers">
				<li class="answers__item"><span class="answers__item-marker"></span><span class="answers__item-name">Ворон</span></li>
				<li class="answers__item answers__item_error"><span class="answers__item-marker"></span><span class="answers__item-name">Журавль</span></li>
				<li class="answers__item answers__item_success"><span class="answers__item-marker"></span><span class="answers__item-name">Ласточка</span></li>
				<li class="answers__item"><span class="answers__item-marker"></span><span class="answers__item-name">Козодой</span></li>
				<li class="answers__item"><span class="answers__item-marker"></span><span class="answers__item-name">Кукушка</span></li>
				<li class="answers__item"><span class="answers__item-marker"></span><span class="answers__item-name">Синица</span></li>
			</ul>

			<div class="quiz__select-answer select-answer">

				<!-- <p class="select-answer__noselect">Послушайте плеер. <br>
					Выберите птицу из списка
				</p> -->

				<img src="./assets/images/bird-default.jpg" alt="bird" class="select-answer__image">
				<div class="select-answer__about-wrap">
					<h4 class="select-answer__bird-name">Синица</h4>
					<span class="select-answer__bird-species">Parus major</span>

					<div class="audioplayer audioplayer-question">
						<button class="audioplayer__play-button audioplayer__play-button_pause"></button>
						<div class="audioplayer__time">
							<div class="audioplayer__progress-time">
								<input class="audioplayer__range-time audioplayer__progress-range" type="range" value="40" min="0" max="100" step="1" name="" id="">
								<span class="audioplayer__progress-time-current">00:09</span>
								<span class="audioplayer__progress-time-end">00:27</span>
							</div>
						</div>
						<div class="audioplayer__volume">
							<button class="audioplayer__mute-button audioplayer__mute-button_on"></button>
							<input class="audioplayer__range-volume audioplayer__progress-range" type="range" value="40" min="0" max="100" step="1" name="" id="">
						</div>
					</div>

				</div>
				<p class="select-answer__bird-description">В щебетании синиц различают более 40 различных звуковых сочетаний. Поют они практически круглый год, немного затихая только зимой. Синицы настоящие санитары леса. Одна пара синиц в период гнездования оберегает от вредителей десятки деревьев.</p>

			</div>

		</div>

		<button class="quiz__next-button">Next</button>

	</div>
		`;
	}

	render() {
		// const title = this.createHeaderTitle(QuizPage.TextObject.MainTitle);
		this.container.className = 'container quiz-container';
		// this.container.append(title);
		this.container.innerHTML = this.toHTML();
		return this.container;
	}
}

export default QuizPage;
