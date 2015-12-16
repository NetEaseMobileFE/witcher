import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRedirect } from 'react-router';

import util from 'js/utils/util';
import News from './components/news/index.jsx';
import Honor from './components/honor/index.jsx';


class App extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		feature: {
			photo: '/mocks/poster.jpg',
			zan: 123
		},
		praiseAmount: null
	};

	componentDidMount() {
		let figureElem = document.querySelector('.page__poster');
		window.addEventListener('scroll', () => {
			figureElem.style.transform = 'translate3d(0, ' + window.scrollY / 5 +'px, 0)'
		}, false);

		window.threadCount = data => {
			this.setState({
				praiseAmount: data.threadVote
			});
		};
		util.getScript('http://comment.api.163.com/api/json/thread/total/sports_bbs/6TH6JHHB00051C8O?jsoncallback=threadCount');
	}

	_postPraise() {
		util.ajax({
			url: 'http://comment.api.163.com/reply/threadupvote/sports_bbs/6TH6JHHB00051C8O',
			method: 'POST'
		});
	}

	render() {
		return (
			<div className="page">
				<figure className="page__poster">
					<img src={this.state.feature.photo}/>
				</figure>

				<header className="page__header header">
					<div className="header__praise main-praise">
						<i className="main-praise__thumb" onClick={this._postPraise}></i>
						{
							this.state.praiseAmount === null ?
								null :
								<div className="main-praise__amount">{this.state.praiseAmount}赞</div>
						}
					</div>

					<nav className="header__nav main-nav">
						<Link to="/news" activeClassName="is-active">要闻</Link>
						<Link to="/say" activeClassName="is-active">涛涛说</Link>
						<Link to="/honor" activeClassName="is-active">荣耀榜</Link>
					</nav>
				</header>

				<main className="page__main main">
					{this.props.children}
				</main>

				<footer className="page__footer"></footer>
			</div>
		);
	}
}



let routes = (
    <Route path="/" component={App}>
		<Route path="news" component={News}/>
		<Route path="honor" component={Honor}/>
		<IndexRedirect from="/" to="/news"/>
	</Route>
);


ReactDOM.render(
  <Router>{routes}</Router>,
  document.body.appendChild(document.createElement('div'))
);
