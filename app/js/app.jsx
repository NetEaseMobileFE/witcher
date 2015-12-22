import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRedirect } from 'react-router';
require('es6-promise').polyfill();

import { ajax, getScript, getVendor } from 'js/utils/util';
import News from './components/news/index';
import Honor from './components/honor/index';
import Speech from './components/speech/index';
import Comment from './components/comment/index';
import { chief } from 'js/appConfig';
//import 'js/plugins/swiper';
import Carousel from 'js/components/common/carousel';


const App = props => <div>{props.children}</div>;

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.medals = [];
	}

	state = {
		figures: [],
		praiseAmount: null,
		praiseAPIParam: null
	};

	componentDidMount() {
		let cid = chief.cid;
		let figureElem = this.refs.poster;

		ajax({
			url: `${chief.baseUrl}${cid}/0-4.html`,
			dataType: 'JSON'
		}).then(data => {
			let list = data[cid];
			this.setState({
				figures: list[0].imgextra.map(extra => extra.imgsrc)
			});

			// 奖牌数据
			this.medals = list.slice(2, 5).map((arti) => {
				let ttl = arti.title;
				return [ttl.slice(-1), ttl.slice(0, -1)];  // [金, 12]
			});


			// 赞的数据
			let { docid, boardid } = list[1];
			let praiseAPIParam = `${boardid}/${docid}`;

			window.threadCount = data => {
				this.setState({
					praiseAmount: data.threadVote,
					praiseAPIParam: praiseAPIParam
				});

				//new Swiper(figureElem, { loop: true, width: 750 });
			};
			getScript(`http://comment.api.163.com/api/json/thread/total/${praiseAPIParam}?jsoncallback=threadCount`);
		});

		// 视差
		let vendor = getVendor();
		vendor = vendor ? vendor + 'T' : 't';
		window.addEventListener('scroll', () => {
			let offsetY = window.scrollY > 0 ? window.scrollY / 5 : 0;
			figureElem.style.transform = vendor + 'ranslate3d(0, ' + offsetY +'px, 0)'
		}, false);
	}

	_postPraise = () => {
		if ( !this.state.isPraised ) {
			this.refs.praiseForm.submit();
			this.setState({
				isPraised: true
			});
		}
	};

	render() {
		return (
			<div className="page">
				<div className="page__poster swiper-container" ref="poster">
					<Carousel images={this.state.figures} currentIndex={0} itemWidth="750" />
				</div>

				<header className="page__header header">
					<div className="header__praise main-praise">
						<div className={`main-praise__gesture ${this.state.isPraised ? 'is-active' : ''}`} onClick={this._postPraise}>
							<div className="main-praise__gesture__flicker"></div>
							<div className="main-praise__gesture__thumb"></div>
						</div>
						{
							this.state.praiseAmount === null ||
								<div className="main-praise__amount">{this.state.praiseAmount}赞</div>
						}
					</div>

					<nav className="header__nav main-nav">
						<Link to="/news" activeClassName="is-active">要闻</Link>
						<Link to="/speech" activeClassName="is-active">涛涛说</Link>
						<Link to="/honor" activeClassName="is-active">荣耀榜</Link>
					</nav>
				</header>

				<main className="page__main main">
					{
						this.props.location.pathname == '/news' ?
							this.props.children:
							React.cloneElement(this.props.children, {
								medals: this.medals
							})
					}
				</main>

				<footer className="page__footer"></footer>
				{
					this.state.praiseAPIParam &&
						(
							<div style={{ display: 'none' }}>
								<form action={`http://comment.api.163.com/reply/threadupvote/${this.state.praiseAPIParam}`} ref="praiseForm" method="POST" target="useless"/>
								<iframe name="useless"/>
							</div>
						)
				}
			</div>
		);
	}
}

let routes = (
    <Route path="/" component={App}>
    	<Route path="main" component={Main} ignoreScrollBehavior>
				<Route path="/news" component={News}/>
				<Route path="/speech" component={Speech} />
				<Route path="/honor" component={Honor}/>
    	</Route>
		<Route path="comment/:id" component={Comment} />
		<IndexRedirect from="/" to="/news"/>
	</Route>
);

ReactDOM.render(
  <Router>{routes}</Router>,
  document.body.appendChild(document.createElement('div'))
);
