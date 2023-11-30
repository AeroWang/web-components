import { isBrowser, isWebSupported, random, randomIntervalTick, range } from '../../utils/index';
import sparklesStyles from './sparkles.less?inline';

const generateSparkleConfig = (
	preferredReducedMotion = false,
	randomColorList = [],
	leftOffsetRange,
	topOffsetRange,
) => {
	// const randomColorList = ['#fbbf24', '#4ade80', '#60a5fa', '#8b5cf6', '#f43f5e']
	return {
		id: String(random(10000, 99999)),
		createdAt: Date.now(),
		size: random(10, 17),
		style: {
			color: randomColorList.length
				? randomColorList[random(0, randomColorList.length)]
				: undefined,
			top: `${random(topOffsetRange[0], topOffsetRange[1])}%`,
			left: `${random(leftOffsetRange[0], leftOffsetRange[1])}%`,
			zIndex: (preferredReducedMotion ? 1 : random(1, 8)).toString()
		}
	};
};

const REDUCED_MOTION = '(prefers-reduced-motion: no-preference)';

class Sparkles extends HTMLElement {
	_mediaQueryList = window.matchMedia(REDUCED_MOTION);
	_preferredReducedMotion = !isWebSupported(REDUCED_MOTION);
	_sparklesBox;
	_sparkles = [];
	_timeId = { timeId: null };
	_shadow;
	// 可传入属性 colors，min-delay，max-delay，left-offset-range,top-offset-range
	_randomColors;
	_minDelay = 300;
	_maxDelay = 800;
	_leftOffsetRange = [-15, 60];
	_topOffsetRange = [0, 85];

	constructor () {
		super();
		this._shadow = this.attachShadow({ mode: 'closed' });
		const styles = document.createElement('style');
		styles.textContent = sparklesStyles;
		this._shadow.appendChild(styles);

		this._sparklesBox = document.createElement('div');
		this._sparklesBox.className = 'sparkles-box';
		const slot = document.createElement('slot');
		slot.setAttribute('class', 'slot');
		this._sparklesBox.appendChild(slot);
		this._shadow.appendChild(this._sparklesBox);

		// 可传入属性 colors，min-delay，max-delay，left-offset-range,top-offset-range
		this._randomColors = this.getAttribute('colors') ? this.getAttribute('colors').split(',').map((item) => item.trim()) : undefined;
		const leftOffsetRange =this.getAttribute('left-offset-range') ? this.getAttribute('left-offset-range').split(',').map((item) => Number(item.trim())) : [-15, 60];
		this._leftOffsetRange = leftOffsetRange.length === 2 ? leftOffsetRange : [-10, 60];
		const topOffsetRange =this.getAttribute('top-offset-range') ? this.getAttribute('top-offset-range').split(',').map((item) => Number(item.trim())) : [-15, 60];
		this._topOffsetRange = topOffsetRange.length === 2 ? topOffsetRange : [0, 85];
		this._minDelay = this.getAttribute('min-delay') ? Number(this.getAttribute('min-delay')) : 300;
		this._maxDelay = this.getAttribute('max-delay') ? Number(this.getAttribute('max-delay')) < 500 ? 500: Number(this.getAttribute('max-delay')) : 800;

		if (this._preferredReducedMotion) {
			const initNum = this.getAttribute('init-num');

			const fr = document.createDocumentFragment();
			this._sparkles = range(random(0, Number(initNum))).map(() => generateSparkleConfig(this._preferredReducedMotion, this._randomColors));
			this._sparkles.forEach((item) => {
				this.generateSparkle(item);
				fr.appendChild(this.generateSparkle(item));
			});
			this._sparklesBox.appendChild(fr);
		}

		// bind
		this.reCreate = this.reCreate.bind(this);
		this.mediaListener = this.mediaListener.bind(this);
	}

	generateSparkle(sparkle) {
		const span = document.createElement('span');
		span.className = 'single-sparkle-box';
		span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${sparkle.size}" height="${sparkle.size}" viewBox="0 0 160 160" fill="none"><path fill="currentColor" d="M80 0s4.285 41.292 21.496 58.504C118.707 75.715 160 80 160 80s-41.293 4.285-58.504 21.496S80 160 80 160s-4.285-41.293-21.496-58.504C41.292 84.285 0 80 0 80s41.292-4.285 58.504-21.496C75.715 41.292 80 0 80 0z"></path></svg>`;
		span.style.color = sparkle.style.color;
		span.style.top = sparkle.style.top;
		span.style.left = sparkle.style.left;
		span.style.zIndex = sparkle.style.zIndex;
		span.id = sparkle.id;
		return span;
	}

	mediaListener(event) {
		if (event){
			this._preferredReducedMotion = !event.matches;
			if(this._preferredReducedMotion){
				// 清除唯一定时器
				return randomIntervalTick(this.reCreate, this._timeId, null, null);
			}
		}
		if (!this._preferredReducedMotion){
			randomIntervalTick(this.reCreate, this._timeId, this._minDelay, this._maxDelay);
		}
	}
	// insert
	reCreate(){
		const sparkle = generateSparkleConfig(false, this._randomColors, this._leftOffsetRange, this._topOffsetRange);
		const now1 = Date.now();
		const nextSparkles = this._sparkles.filter((sparkle) => {
			const delta = now1 - sparkle.createdAt;
			// delta < maxDelay + 100 与动画时长也相关
			if (delta < this._maxDelay + 150) {
				return true;
			}else {
				// 移除"过期"的火花
				const u = this._shadow.getElementById(sparkle.id);
				if (u) this._sparklesBox.removeChild(u);
				return false;
			}
		});
		// 生成一个新的火花
		this._sparklesBox.appendChild(this.generateSparkle(sparkle));
		nextSparkles.push(sparkle);
		this._sparkles = [...nextSparkles];
	}

	connectedCallback () {
		this.mediaListener();
		if (this._mediaQueryList.addEventListener) {
			this._mediaQueryList.addEventListener('change', this.mediaListener);
		} else {
			this._mediaQueryList.addListener(this.mediaListener);
		}

		// this._timeId = randomIntervalTick(this.reCreate, 150, 600);
	}

	/*// TODO: 属性被修改
	attributeChangedCallback(attribute, oldValue, newValue) {
		console.log(attribute);
		if (typeof this._timeId === 'number') return window.clearTimeout(this._timeId);
		if (attribute === 'colors') {
			this._randomColors = this.getAttribute('colors') ? this.getAttribute('colors').split(',').map((item) => item.trim()) : undefined;
			this._timeId = randomIntervalTick(this.reCreate, 150, 600);
		}
	}*/

	disconnectCallback() {
		if (this._mediaQueryList.removeEventListener) {
			this._mediaQueryList.removeEventListener('change', this.mediaListener);
		} else {
			this._mediaQueryList.removeListener(this.mediaListener);
		}
		// 清除定时器
		if (typeof this._timeId === 'number') return window.clearTimeout(this._timeId);
	}
}

if (isBrowser()) {
	customElements.define('a-sparkles', Sparkles);
} else {
	throw new Error('仅在浏览器中可用');
}
