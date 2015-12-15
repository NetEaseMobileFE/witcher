import React from 'react';
import 'css/news.css';

import util from 'js/utils/util';
import Loading from 'js/components/common/loading';
import Mix from './mix';
import Gallery from './gallery';
import Live from'./live';
import Video from './video';


export default class extends React.Component {
	constructor(props) {
		super(props);
		//this.scrollHandler = () => {
		//	if ( document.documentElement.scrollHeight - document.documentElement.clientHeight - window.scrollY < 5 ) {
		//		//this._loadMore();
		//	}
		//};
	}

	state = {
		datas: []
	};

	componentDidMount() {
		this._loadMore();
		//window.addEventListener('scroll', this.scrollHandler, false);
	}

	componentWillUnmount() {
		//window.removeEventListener('scroll', this.scrollHandler);
	}

	_assemble(type) {
		let comp;
		switch ( type ) {
			case 'picTxt':
				comp = Mix;
				break;
			case 'photo':
				comp = Gallery;
				break;
			case 'live':
				comp = Live;
				break;
			case 'video':
				comp = Video;
				break;
			default :
				comp = null;
				break;
		}

		return comp;
	}

	_loadMore() {
		//if ( this._loading ) return;
		//this._loading = true;
		util.ajax({
			url: '/mocks/news.json',
			dataType: 'JSON'
		}).then(json => {
			let datas = this.state.datas;
			this.setState({
				datas: datas.concat(json.data)
			});
			//this._loading = false;
		});
	};

	render() {
		let sections = this.state.datas.map((data, i) => {
			let Comp = this._assemble(data.type);
			return Comp ? <Comp key={i} {...data}/> : null;
		});

		return (
			<div className="news">
				{sections.length ? sections : <Loading/>}
			</div>
		);
	}
}
