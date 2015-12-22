import React from 'react';
import { getVendor, nextFrame, cancelFrame } from 'js/utils/util';


let vendor = getVendor();
const TRANSFORM = (vendor ? vendor + 'T' : 't') + 'ransform';
const TOUCHSTART = 'touchstart';
const TOUCHEND = 'touchend';


export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			winScrollY: null
		};

		this._start = () => {
			this._updateScrollY();
			document.addEventListener(TOUCHEND, this, false);
		};
		this._stop = () => {
			cancelFrame(this._timer);
			document.removeEventListener(TOUCHEND, this);
		};

		document.addEventListener(TOUCHSTART, this, false);
	}
	
	shouldComponentUpdate(nextPorps, nextState) {
		return (this.props.children.props != nextPorps.children.props) ||
				(this.state.winScrollY != nextState.winScrollY);
	}

	componentDidMount() {
		this._updateScrollY();
		cancelFrame(this._timer);
	}

	handleEvent(e) {
		switch ( e.type ) {
			case TOUCHSTART: this._start(); break;
			case TOUCHEND: this._stop(); break;
		}
	}

	_updateScrollY = () => {
		let scrollY = window.scrollY;
		if ( window.scrollY >= 0 && window.scrollY < 730 ) {
			this.setState({
				winScrollY: scrollY
			});
		}
		this._timer = nextFrame(this._updateScrollY);
	};

	render() {
		let scrollY = this.state.winScrollY,
			offsetY = scrollY > 0 ? scrollY / 5 : 0,
			style = {
				[TRANSFORM]: 'translate3d(0, ' + offsetY +'px, 0)'
			};

		return (
			<div className="page__poster swiper-container" style={style}>
				{this.props.children}
			</div>
		);
	}
}
