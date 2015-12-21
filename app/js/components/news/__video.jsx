import React from 'react';


export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		inDisguise: true
	};

	_toggle = () => {
		if ( this.state.inDisguise ) {
			this.setState({
				inDisguise: false
			});
		}
	};

	render() {
		return (
			<section className="news__plate">
				<div className="video">
					<h4 className="video__ttl">{this.props.title}</h4>
					{
						this.state.inDisguise ?
							(
								<div className="video__placeholder" onClick={this._toggle}>
									<img src={this.props.poster}/>
									<div className="video__placeholder__cover"></div>
									<i className="video__placeholder__btn"></i>
								</div>
							) :
							(
								<div className="video__placeholder">
									<video autoPlay controls width="100%">
										<source src={this.props.source} type="video/mp4"/>
									</video>
								</div>
							)
					}
				</div>
			</section>
		);
	}
}
