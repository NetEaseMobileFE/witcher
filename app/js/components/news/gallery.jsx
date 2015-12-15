import React from 'react';


export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section className="news__plate">
				<div className="gallery">
					<h4 className="gallery__ttl">{this.props.title}</h4>
					<ul className="gallery__list">
						{
							this.props.photos.map((photo, i) => <li key={i}><img src={photo.src}/></li>)
						}
					</ul>
					<span className="gallery__comments tag--radius">{this.props.commentAmount}</span>
				</div>
			</section>
		);
	}
}
