import Page from '../page/Page';
import BirdCard from '../../components/bird-card/bird-card';

class GalleryPage extends Page {
	constructor(id, props) {
		super(id);
		this.store = props;
		this.container.className = 'container gallery-container';
		this.init();
	}

	init() {
		this.birds = new Array(36).fill().map(() => new BirdCard(this.store, 'div', 'gallery-container__card'));
	}

	destroy() {
		this.birds.forEach((bird)=>{bird.destroy();});
		super.destroy();
	}

	toHTML() {
		return 'gallery';
	}

	render() {
		let counter = 0;
		for(let j=0; j<6; j++) {
			for(let i=0; i<6; i++) {
				this.container.append(this.birds[counter].render({question: j, cardId: i}));
				counter++;
			}
		}

		return this.container;
	}
}

export default GalleryPage;
