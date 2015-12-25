/**
 * 通用左图又文模式
 */

import React from 'react';
import Tags from './tags';
import { getOpenParam } from 'js/utils/util';
import MockImg from 'js/components/common/mockImg';
import mixin from 'js/components/common/lazyRender';


export default React.createClass({
	mixins: [mixin],

	_onClick(param) {
		this.props.openHandler(param);
	},

	render() {
		let props = this.props,
			param = getOpenParam(props);

		return (
			<section className="news__arti mix" onClick={this._onClick.bind(this, param)}>
				<div className="mix__pic">
					<MockImg src={props.imgsrc} width={200} height={150} shouldRender={this.state.shouldRender}/>
				</div>
				<div className="mix__txt">
					<h4 className="mix__txt__ttl">{props.title}</h4>
					<div className="mix__txt__ctt">{props.digest}</div>
				</div>
				<Tags classNames="mix__tags" {...props}/>
			</section>
		);
	}
});
