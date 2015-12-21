/**
 * 三图模式
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
			pics = (props.imgextra || props.imgnewextra).slice(0, 3),
			param = getOpenParam(props);

		pics.unshift({ imgsrc: props.imgsrc });

		return (
			<section className="news__arti gallery" onClick={this._onClick.bind(this, param)}>
				<h4 className="gallery__ttl">{props.title}</h4>
				<ul className="gallery__list">
					{
						pics.map((pic, i) => <li key={i}><MockImg src={pic.imgsrc} width={223} height={168}/></li>)
					}
				</ul>
				<Tags classNames="gallery__tags" {...props}/>
			</section>
		);
	}
}
