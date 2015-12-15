import React from 'react';


export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section className="news__plate">
				<div className="live">
					<h4 className="live__ttl">{this.props.title}</h4>
					<figure className="live__figure">
						<img src={this.props.src}/>
						<figcaption className="live__caption">{this.props.desc}</figcaption>
					</figure>
					<div className="live__tags">
						<span className="tag tag--comments">{this.props.number}<i>参与</i></span>
						<span className="tag tag--live">正在直播</span>
					</div>
				</div>
			</section>
		);
	}
}
