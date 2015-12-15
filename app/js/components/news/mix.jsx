import React from 'react';


export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section className="news__plate">
				{
					this.props.artiList.map((arti, i) => {
						return (
							<div className="mix" key={i}>
								<div className="mix__pic">
									<img src={arti.src}/>
								</div>
								<div className="mix__txt">
									<h4 className="mix__txt__ttl">{arti.title}</h4>
									<div className="mix__txt__ctt">{arti.abst}</div>
								</div>
								<div className="mix__tags">
									<span className="tag tag--comments">{arti.commentAmount}<i>跟帖</i></span>
									<span className="tag tag--video"></span>
									<span className="tag tag--live">正在直播</span>
								</div>
							</div>
						);
					})
				}
			</section>
		);
	}
}
