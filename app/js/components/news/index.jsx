import React from 'react';
import 'css/news.css';

import Pubsub from 'ntes-pubsub'
import Open from 'newsapp-react/lib/Open'
import Loading from 'js/components/common/loading';
import Common from './common';
import MultiPics from './multiPics';
import Banner from'./banner';
import { news } from 'js/appConfig';
import mixin from 'js/components/loadMoreMixin';


export default React.createClass({
	mixins: [mixin],
	getInitialState() {
		this.config = news;
		return {
			datas: []
		};
	},

	_assemble(data) {
		let comp,
			pics = data.imgextra || data.imgnewextra;

		// 过滤广告
		if ( data.ads ) {
			comp = null;
		} else if ( pics && pics.length ) {
			comp = MultiPics;
		} else if ( data.imgType == 1 ) {
			comp = Banner;
		} else {
			comp = Common;
		}

		return comp;
	},

	_open(param) {
		Pubsub.publish('newsapp:open', param);
	},

	render() {
		let sections = this.state.datas.map((data, i) => {
			let Comp = this._assemble(data);
			return Comp ? <Comp openHandler={this._open} key={i} {...data}/> : null;
		});

		return (
			<div className="news">
				<Open />
				{sections}
				{this.state.loading && <Loading/>}
			</div>
		);
	}
});
