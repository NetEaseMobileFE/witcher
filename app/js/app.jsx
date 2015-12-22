import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRedirect } from 'react-router';
import createMemoryHistory from 'history/lib/createMemoryHistory'
require('es6-promise').polyfill();

import { ajax, getScript } from 'js/utils/util';
import News from './components/news/index';
import Honor from './components/honor/index';
import Speech from './components/speech/index';
import Comment from './components/comment/index';
import Poster from 'js/components/common/poster';
import { chief } from 'js/appConfig';
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
			};
			getScript(`http://comment.api.163.com/api/json/thread/total/${praiseAPIParam}?jsoncallback=threadCount`);
		});
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
				<Poster>
					<Carousel images={this.state.figures} currentIndex={0} itemWidth="750" />
				</Poster>

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
  <Router history={createMemoryHistory()}>{routes}</Router>,
  document.body.appendChild(document.createElement('div'))
);
