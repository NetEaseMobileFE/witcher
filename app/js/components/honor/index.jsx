import React from 'react';
import 'css/honor.css';

import { ajax } from 'js/utils/util';
import Pubsub from 'ntes-pubsub'
import Open from 'newsapp-react/lib/Open'
import Loading from 'js/components/common/loading';
import MockImg from 'js/components/common/mockImg';
import { honor } from 'js/appConfig';
import mixin from 'js/components/loadMoreMixin';


const ZH = {
	gold:   '金',
	silver: '银',
	bronze: '铜'
};

export default React.createClass({
	mixins: [mixin],
	getInitialState() {
		this.config = honor;
		return {
			datas: []
		};
	},

	getZH(kind) {
		return ZH[kind];
	},

	_open(param) {
		Pubsub.publish('newsapp:open', param);
	},

	render() {
		return (
			<div className="honor">
				<section className="medal-tally">
					{
						this.props.medals.map((medal, i) => {
							return (
								<div className={`medal-tally__kind medal-tally__kind--${medal.kind}`} key={i}>
									<i className={`medal medal--${medal.kind}`}></i>
									<div className="medal-tally__kind__amount"><span>{medal.amount}</span>{this.getZH(medal.kind)}</div>
								</div>
							)
						})
					}
				</section>

				<section className="moments">
					{
						this.state.datas.map((data, i) => {
							let param = null;
							return (
								<div className="moments__frame" key={i} onClick={this._open.bind(this, param)}>
									<i className={`moments__frame__medal medal medal--${data.medalKind}--sm`}></i>
									<span className={`moments__frame__date moments__frame__date--${data.medalKind}`}>{data.date}</span>
									<div className="moments__frame__sketch sketch">
										<div className="sketch__pic">
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
