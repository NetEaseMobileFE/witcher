import React from 'react';
import 'css/honor.css';

import { ajax, getOpenParam } from 'js/utils/util';
import Pubsub from 'ntes-pubsub';
import Open from 'newsapp-react/lib/Open';
import Loading from 'js/components/common/loading';
import MockImg from 'js/components/common/mockImg';
import { honor } from 'js/appConfig';
import mixin from 'js/components/common/loadMoreMixin';


const TRANS = {
	'金': 'gold',
	'银': 'silver',
	'铜': 'bronze'
};

export default React.createClass({
	mixins: [mixin],
	getInitialState() {
		this.config = honor;
		return {
			datas: []
		};
	},

	getEN(kind) {
		return TRANS[kind];
	},

	_open(param) {
		Pubsub.publish('newsapp:open', param);
	},

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

	render() {
		return (
			<div className="honor">
				<Open />
				<section className="medal-tally">
					{
						this.props.medals.map((medal, i) => {
							let kind = this.getEN(medal[0]);

							return (
								<div className={`medal-tally__kind medal-tally__kind--${kind}`} key={i}>
									<i className={`medal medal--${kind}`}></i>
									<div className="medal-tally__kind__amount"><span>{medal[1]}</span>{medal[0]}</div>
								</div>
							)
						})
					}
				</section>

				<section className={`moments ${this.state.loading ? 'is-loading' : ''}`}>
					{
						this.state.datas.map((data, i) => {
							let param = getOpenParam(data);
							let [kind, date] = data.subtitle.split('牌');
							kind = this.getEN(kind);
							date = '20' + date;

							return (
								<div className="moments__frame" key={i} onClick={this._open.bind(this, param)}>
									<i className={`moments__frame__medal medal medal--${kind}--sm`}></i>
									<span className={`moments__frame__date moments__frame__date--${kind}`}>{date}</span>
									<div className="moments__frame__sketch sketch">
										<div className={`sketch__pic ${this._getArtiClassNames(data)}`}>
											<MockImg src={data.imgsrc} width={160} height={120}/>
										</div>
										<div className="sketch__txt">
											<h4 className="sketch__txt__ttl">{data.title}</h4>
											<div className="sketch__txt__abst">{data.digest}</div>
										</div>
									</div>
								</div>
							)
						})
					}
					{this.state.loading && <Loading/>}
				</section>
			</div>
		);
	}
});