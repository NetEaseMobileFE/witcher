/**
 * 大图通栏模式
 */

import React from 'react';
import Tags from './tags';
import { getOpenParam } from 'js/utils/util';
import MockImg from 'js/components/common/mockImg';


export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	_onClick = param => {
		this.props.openHandler(param);
	};

	render() {
		let props = this.props,
			param = getOpenParam(props);

		return (
			<section className="news__arti banner" onClick={this._onClick.bind(this, param)}>
				<h4 className="banner__ttl">{props.title}</h4>
				<figure className="banner__figure">
					<MockImg src={props.imgsrc} width={710} height={230}/>
					<figcaption className="banner__caption">{props.digest}</figcaption>
				</figure>
				<Tags classNames="banner__tags" {...props}/>
			</section>
		);
	}
}
