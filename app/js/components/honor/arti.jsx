import React from 'react';
import { getOpenParam } from 'js/utils/util';
import MockImg from 'js/components/common/mockImg';
import mixin from 'js/components/common/lazyRender';


export default React.createClass({
	mixins: [mixin],

	_getArtiClassNames(data) {
		let pics = data.imgextra || data.imgnewextra,
			type = '';

		if ( pics && pics.length ) {
			type = 'multi';
		} else if ( data.TAG == '视频' ) {
			type = 'video';
		}

		return type && 'sketch__pic--' + type;
	},

	_onClick(param) {
		this.props.openHandler(param);
	},

	render() {
		let props = this.props;
		let param = getOpenParam(props);

		return (
			<div className="moments__frame" onClick={this._onClick.bind(this, param)}>
				<i className={`moments__frame__medal medal medal--${props.kind}--sm`}></i>
				<span className={`moments__frame__date moments__frame__date--${props.kind}`}>{props.date}</span>
				<div className="moments__frame__sketch sketch">
					<div className={`sketch__pic ${this._getArtiClassNames(props)}`}>
						<MockImg src={props.imgsrc} width={160} height={120} shouldRender={this.state.shouldRender}/>
					</div>
					<div className="sketch__txt">
						<h4 className="sketch__txt__ttl">{props.title}</h4>
						<div className="sketch__txt__abst">{props.digest}</div>
					</div>
				</div>
			</div>
		)
	}
});