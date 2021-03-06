import React from 'react';
import 'css/news.css';

import Loading from 'js/components/common/loading';
import Common from './common';
import MultiPics from './multiPics';
import Banner from'./banner';
import { news } from 'js/appConfig';
import Pubsub from 'ntes-pubsub';
import mixin from 'js/components/common/artiMixin';


export default React.createClass({
	mixins: [mixin],

	getInitialState() {
		this.config = news;
	},
	componentDidMount(){
    	Pubsub.publish('newsapp:ui:title', '宁泽涛官网')
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

	render() {
		let sections = this.state.datas.map((data, i) => {
			let Comp = this._assemble(data);
			return Comp ? <Comp openHandler={this._open} scrollY={this.state.scrollY} key={i} {...data}/> : null;
		});

		return (
			<div className="news">
				{sections}
				{this.state.loading && <Loading/>}
			</div>
		);
	}
});