import Component from '../component/component';
const timeZero = 0;
const volumeZero = 0;
const volumeDefault = 0.2;

class AudioPlayer extends Component {
	constructor(tagName, className) {
		super(tagName, className);
		this.container.classList.add('audioplayer');
		this.audio = new Audio();
		this.isPlay = false;
		this.isMute = false;
		this.isProgressTimeInput = false;

		this.init();
	}

	toHTML() {
		return `
		<button class="audioplayer__play-button "></button>
		<div class="audioplayer__time">
			<div class="audioplayer__progress-time">
				<input class="audioplayer__range-time audioplayer__progress-range" type="range" value="0" min="0" max="100" step="1" name="" id="">
				<span class="audioplayer__progress-time-current">00:00</span>
				<span class="audioplayer__progress-time-end">00:00</span>
			</div>
		</div>
		<div class="audioplayer__volume">
			<button class="audioplayer__mute-button "></button>
			<input class="audioplayer__range-volume audioplayer__progress-range" type="range" value="0" min="0" max="100" step="1" name="" id="">
		</div>
		`;
	}

	init() {
		this.audio.currentTime = timeZero;
		this.audio.volume = volumeDefault;

		this.audio.onloadeddata = (event) => {
			const timeRange = this.container.querySelector('.audioplayer__range-time');
			const trackLength = this.container.querySelector('.audioplayer__progress-time-end');
			trackLength.textContent = getTimeCodeFromNum(event.target.duration);
			timeRange.value = 0;
		};
		this.audio.ontimeupdate = (event) => {
			const timeRange = this.container.querySelector('.audioplayer__range-time');
			const duration = event.target.duration;
			const currentTime = event.target.currentTime;
			const currentTimePercent = secondToPercent(currentTime, duration);
			this.changeRange(timeRange, currentTimePercent);
			if (!this.isProgressTimeInput) {
				const trackCurrent = this.container.querySelector('.audioplayer__progress-time-current');
				trackCurrent.textContent = getTimeCodeFromNum(currentTime);
				timeRange.value = currentTimePercent ? currentTimePercent : 0;
			}
		};
		this.audio.onended = () => {
			this.isPlay = false;
			this.audio.currentTime = 0;
			const trackCurrent = this.container.querySelector('.audioplayer__progress-time-current');
			const timeRange = this.container.querySelector('.audioplayer__range-time');
			const playButton = this.container.querySelector('.audioplayer__play-button');
			trackCurrent.textContent = getTimeCodeFromNum(timeZero);
			timeRange.value = String(volumeZero);
			this.changeRange(timeRange);
			playButton.classList.remove('audioplayer__play-button_pause');
		};

		this.container.onclick = event => {
			if (event.target) {
				if (event.target.closest('.audioplayer__play-button')) {
					if (this.isPlay) {
						event.target.classList.remove('audioplayer__play-button_pause');
						this.audio.pause();
						this.isPlay = false;
					} else {
						event.target.classList.add('audioplayer__play-button_pause');
						this.audio.play();
						this.isPlay = true;
					}
				} else if (event.target.closest('.audioplayer__mute-button')) {
					const volumeRange = this.container.querySelector('.audioplayer__range-volume');
					if (this.isMute) {
						this.audio.volume = volumeDefault;
						event.target.classList.remove('audioplayer__mute-button_on');
						volumeRange.value = this.audio.volume * 100;
						this.changeRange(volumeRange);
						this.isMute = false;
					} else {
						this.audio.volume = volumeZero;
						event.target.classList.add('audioplayer__mute-button_on');
						volumeRange.value = String(volumeZero);
						this.changeRange(volumeRange);
						this.isMute = true;
					}
				}
			}
		};

		this.container.oninput = event => {
			if (event.target) {
				if (event.target.classList.contains('audioplayer__progress-range')) {
					const value = event.target.value;
					if(event.target.classList.contains('audioplayer__range-time')) {
						this.isProgressTimeInput = true;

						const duration = this.audio.duration;
						const trackCurrent = this.container.querySelector('.audioplayer__progress-time-current');
						trackCurrent.textContent = getTimeCodeFromNum(percentToSecond(value, duration));
						if (this.isPlay === false) {
							this.changeRange(event.target);
						}
					}
					if(event.target.classList.contains('audioplayer__range-volume')) {
						this.changeRange(event.target);
						this.audio.volume = value / 100;
						const muteButton = this.container.querySelector('.audioplayer__mute-button');
						if( +value === 0 ) {
							muteButton.classList.add('audioplayer__mute-button_on');
						} else {
							muteButton.classList.remove('audioplayer__mute-button_on');
						}
					}
				}
			}
		};

		const onmouseupHandler = (event) => {
			if (event.target) {
				if (event.target.classList.contains('audioplayer__range-time')) {
					this.isProgressTimeInput = false;
					this.audio.currentTime = percentToSecond(event.target.value, this.audio.duration);
				}
			}
		};
		this.container.onmouseup = onmouseupHandler;
		this.container.ontouchend = onmouseupHandler;
	}

	stop() {
		this.audio.pause();
	}

	destroy() {
		this.container.onclick = null;
		this.container.onmouseup = null;
		this.container.oninput = null;
		this.audio.pause();
		this.audio.onloadeddata = null;
		this.audio.ontimeupdate = null;
		this.audio.onended = null;
		this.audio = null;
		super.destroy();
	}

	changeRange(element, value = null) {
		const newValue = value ? value : element.value;
		element.style.background = `linear-gradient(to right, rgb(0, 188, 140) 0%, rgb(61, 133, 140) ${newValue}%, rgb(115, 115, 115) ${newValue}%, rgb(115, 115, 115) 100%)`;
	}

	setAudioTrack(str) {
		this.audio.src = str;
	}

	render() {
		this.isPlay = false;
		this.container.innerHTML = this.toHTML();

		const volumeRange = this.container.querySelector('.audioplayer__range-volume');
		volumeRange.value = this.audio.volume * 100;
		this.changeRange(volumeRange);
		const timeRange = this.container.querySelector('.audioplayer__range-time');
		this.changeRange(timeRange);
		timeRange.value = 0;

		return this.container;
	}
}

export default AudioPlayer;

function secondToPercent(second, duration) {
	return Math.round(second / (duration / 100));
}

function percentToSecond(percent, duration) {
	return (duration / 100) * percent;
}

function getTimeCodeFromNum(num) {
	let seconds = Math.round(parseFloat(num));
	let minutes = Math.floor(seconds / 60);
	seconds -= minutes * 60;

	const hours = Math.floor(minutes / 60);
	minutes -= hours * 60;

	const minutesOut = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
	if (hours === 0) {
		return `${minutesOut}`;
	}
	return `${hours < 10 ? '0' + hours : hours}:${minutesOut}`;
}
