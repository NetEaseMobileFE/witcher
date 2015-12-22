import React from 'react';
import { getVendor } from 'js/utils/util';


let vendor = getVendor();
const TRANSFORM = (vendor ? vendor + 'T' : 't') + 'ransform';

let nextFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback) { return setTimeout(callback, 1); };
	})(),
	cancelFrame = (function () {
		return window.cancelRequestAnimationFrame ||
			window.cancelAnimationFrame ||
			window.webkitCancelRequestAnimationFrame ||
			window.mozCancelRequestAnimationFrame ||
			window.oCancelRequestAnimationFrame ||
			window.msCancelRequestAnimationFrame ||
			clearTimeout;
	})();

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			winScrollY: window.scrollY
		};

		let timer;
		let start = () => {
			this.updateScrollY();
			document.addEventListener('touchend', stop, false);
		};

		let stop = () => {
			cancelFrame(timer);
			document.removeEventListener('touchend', stop);
		};

		document.addEventListener('touchstart', start, false);
	}

	updateScrollY = () => {
		let scrollY = window.scrollY;
		if ( window.scrollY >= 0 ) {
			this.setState({
				winScrollY: scrollY
			});
		}
		nextFrame(this.updateScrollY);
	};
	
	shouldComponentUpdate(_, nextState) {
		return nextState.winScrollY != this.state.winScrollY;
	}

	render() {
		let scrollY = this.state.winScrollY,
			offsetY = scrollY > 0 ? scrollY / 5 : 0,
			style = {
				[TRANSFORM]: 'translate3d(0, ' + offsetY +'px, 0)'
			};

		console.log(style); // todo

		return (
			<div className="page__poster swiper-container" style={style}>
				<img src="./mocks/poster.jpg"/>
			</div>
		);
	}
}
