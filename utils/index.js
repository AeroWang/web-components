/**
 * 随机数生成
 * - 包含 min ,不包含 max
 * @param {number} min
 * @param {number} max
 * @returns {number}
 * @example
 * random(3, 6) -> 3 | 4 | 5
 */
export const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

/**
 * 范围生成
 * - 包含 start ,不包含 end。
 *
 * - 当 end 未传入时，start 将从 0 开始，end 为入参 start 的值。
 * @param {number} start
 * @param {number} end
 * @param {number} step
 * @returns {number[]}
 * @example
 * range(3, 6) -> [3, 4, 5]
 * range(3) -> [0, 1, 2]
 */
export function range(start, end=undefined, step = 1) {
	const output = [];
	if (typeof end === 'undefined') {
		end = start;
		start = 0;
	}
	for (let i = start; i < end; i += step) output.push(i);

	return output;
}

/**
 * 是否在浏览器环境
 * @returns {boolean}
 */
export function isBrowser() {
	return !!(
		typeof window !== 'undefined'
    && window.document
    && window.document.createElement
	);
}

/**
 * 浏览器中媒体查询是否匹配查询特性
 * @param {string} queryStr 查询特性
 * @example isWebSupported('(prefers-reduced-motion: no-preference)')
 * @returns {boolean}
 */
export const isWebSupported = (queryStr) => window.matchMedia(queryStr).matches;

/**
 * 随机间隔，用来模拟随机效果动画的工具函数
 * - return - timeId (需要在组件销毁时清除该定时)
 * - 在提供的最小及最大值（数字类型）之间随机地递归调用自己
 * @param {function} cb
 * @param {Object} timeIdRef 计时器 ID 引用
 * @param {number|null} minDelay
 * @param {number|null} maxDelay
 * @returns {function}
 */

export const randomIntervalTick = (cb, timeIdRef={ timeId: null }, minDelay, maxDelay) => {
	if (typeof minDelay === 'number' && typeof maxDelay === 'number'){
		const tick=()=>{
			const nextTickAt = random(minDelay, maxDelay);
			timeIdRef.timeId = window.setTimeout(() => {
				cb();
				tick();
			}, nextTickAt);
		};
		tick();
	}else {
		window.clearTimeout(timeIdRef.timeId);
	}
};
