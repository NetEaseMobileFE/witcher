import React from 'react';


export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fullSrc: null
		}
	}

	_loadImg() {
		let { src, width, height, quality = 80 } = this.props;
		let img = new Image;
		let fullSrc = `http://s.cimg.163.com/i/${src.replace('http://', '')}.${width}x${height}.${quality}.jpg`;
		img.onload = () => {
			this.setState({
				fullSrc: fullSrc
			});
		};
		img.src = fullSrc;
	}

	render() {
		let { shouldRender, width, height, classNames = '' } = this.props;
		let fullSrc = this.state.fullSrc;


		let style = {
			width,
			height
		};

		if ( shouldRender && !fullSrc ) {
			this._loadImg();
		}

		if ( fullSrc ) {
			style.backgroundImage = `url(${fullSrc})`;
		}

		return (
			<div className={`mock-img ${fullSrc ? 'is-loaded' : 'is-waiting'} ${classNames}`} style={style}></div>
		)
	}
}