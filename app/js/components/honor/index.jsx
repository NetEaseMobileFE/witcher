import React from 'react';
import 'css/honor.css';

import { ajax } from 'js/utils/util';
import Pubsub from 'ntes-pubsub';
import Open from 'newsapp-react/lib/Open';
import Loading from 'js/components/common/loading';
import { honor } from 'js/appConfig';
import mixin from 'js/components/common/artiMixin';
import Arti from './arti';


const TRANS = {
	'金': 'gold',
	'银': 'silver',
	'铜': 'bronze'
};

export default React.createClass({
	mixins: [mixin],

	getInitialState() {
		this.config = honor;
	},

	_getEN(kind) {
		return TRANS[kind];
	},

	render() {
		return (
			<div className="honor">
				<Open />
				<section className="medal-tally">
					{
						this.props.medals.map((medal, i) => {
							let kind = this._getEN(medal[0]);

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
							let [kind, date] = data.subtitle.split('牌');
							kind = this._getEN(kind);
							return <Arti openHandler={this._open} scrollY={this.state.scrollY} key={i} kind={kind} date={date} {...data}/>
						})
					}
					{this.state.loading && <Loading/>}
				</section>
			</div>
		);
	}
});