import React from 'react';
import { getVendor } from 'js/utils/util';


let vendor = getVendor();
const TRANSFORM = (vendor ? vendor + 'T' : 't') + 'ransform';

export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		winScrollY: null
	};

	_scrollHandler = () => {
		let scrollY = window.scrollY;
		if ( window.scrollY >= 0 && window.scrollY < 730 ) {
			this.setState({
				winScrollY: scrollY
			});
		}
	};

	shouldComponentUpdate(nextPorps, nextState) {
		return (this.props.children.props != nextPorps.children.props) ||
			(this.state.winScrollY != nextState.winScrollY);
	}

	componentDidMount() {
		this._scrollHandler();
		window.addEventListener('scroll', this._scrollHandler, false);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this._scrollHandler);
	}

	render() {
		let scrollY = this.state.winScrollY,
			offsetY = scrollY > 0 ? scrollY / 4 : 0,
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
