import React from 'react';
import 'css/honor.css';

import util from 'js/utils/util';
import Loading from 'js/components/common/loading';


const ZH = {
	gold:   '金',
	silver: '银',
	bronze: '铜'
};

export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		util.ajax({
			url: '/mocks/honor.json',
			dataType: 'JSON'
		}).then(json => {
			this.setState(json);
		});
	}

	getZH(kind) {
		return ZH[kind];
	}

	render() {
		if ( !this.state ) return <Loading/>;

		return (
			<div className="honor">
				<section className="medal-tally">
					{
						this.state.medals.map((medal, i) => {
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
						this.state.moments.map((moment, i) => {
							return (
								<div className="moments__frame" key={i}>
									<i className={`moments__frame__medal medal medal--${moment.medalKind}--sm`}></i>
									<span className={`moments__frame__date moments__frame__date--${moment.medalKind}`}>{moment.date}</span>
									<div className="moments__frame__sketch sketch">
										<div className="sketch__pic">
											<img src={moment.src}/>
										</div>
										<div className="sketch__txt">
											<h4 className="sketch__txt__ttl">{moment.title}</h4>
											<div className="sketch__txt__abst">{moment.abst}</div>
										</div>
									</div>
								</div>
							)
						})
					}
				</section>
			</div>
		);
	}
}
