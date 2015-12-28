import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import Share from 'newsapp-react/lib/Share';
import Pubsub from 'ntes-pubsub';
require('es6-promise').polyfill();


import { ajax, getScript, fastGetImgHeight } from 'js/utils/util';
import Poster from 'js/components/common/poster';
import Carousel from 'js/components/common/carousel';
import { chief } from 'js/appConfig';

import CommentRoute from 'js/components/comment/route';
import NewsRoute from 'js/components/news/route';
import SpeechRoute from 'js/components/speech/route';
import HonorRoute from 'js/components/honor/route';


const App = props => {
	return <div>{props.children}</div>;	
}

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.medals = [];
		this.isNewsapp = !!navigator.userAgent.match(/newsapp/i)
		this.handleClick = this.handleClick.bind(this)
		this.state = {
			figures: [],
			posterHeight: null,
			praiseAmount: null,
			praiseAPIParam: null,
			showOpen: this.isNewsapp ? false : true
		};
	}
	handleClick(param, evt){
		evt.preventDefault()
		evt.stopPropagation()
		if(param == 'open'){
			window.location.href = 'http://m.163.com/newsapp/applinks.html?url=http://c.3g.163.com/nc/qa/witcher/index.html'
		}else if(param == 'close'){
			this.setState({showOpen: false})
		}
	}
	componentDidMount() {
		let cid = chief.cid;

		ajax({
			url: `${chief.baseUrl}${cid}/0-6.html`,
			dataType: 'JSON'
		}).then(data => {
			let list = data[cid];
			let figures = [list[0].imgsrc];
			let adArti = list[1];
			if ( adArti.priority > 0 ) {
				figures.push({ href: adArti.url, src: adArti.imgsrc });
			}
			this.setState({
				figures: figures
			});

			fastGetImgHeight(figures[0]).then(({height}) => {
				this.setState({
					posterHeight: height
				});
			});

			// 奖牌数据
			this.medals = list.slice(3, 6).map((arti) => {
				let ttl = arti.title;
				return [ttl.slice(-1), ttl.slice(0, -1)];  // [金, 12]
			});

			// 赞的数据
			let { docid, boardid } = list[2];
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
		let { figures, posterHeight } = this.state;
		const shareData = {
		  wbText: '昨天的看脸的世界？国民老公实力比颜值更有看点',
		  wbPhoto: 'http://img1.cache.netease.com/travel/2014/7/22/20140722172931b2127.png',
		  wxText: '无论是帅气的脸庞还是完美的身材他都一次次带给我们惊喜，来网易，和有态度的宁泽涛一起传播正能量。',
		  wxTitle: '昨天的看脸的世界？国民老公实力比颜值更有看点',
		  wxUrl: 'http://c.3g.163.com/nc/qa/witcher/index.html',
		  wxPhoto: 'http://img1.cache.netease.com/travel/2014/7/22/20140722172931b2127.png'
		}
		return (
			<div className={`page ${posterHeight ? 'is-loaded' : ''}`}>
				<Share {...shareData} />

				<Poster>
					{
						figures.length > 1 ?
							<Carousel images={figures} currentIndex={0} itemWidth="750" /> :
							<img src={figures[0]}/>
					}
				</Poster>
				<header className="page__header header">
					<div className="header__praise main-praise">
						<div className={`main-praise__gesture__flicker ${this.state.isPraised ? 'is-active' : ''}`}></div>
						<div className={`main-praise__gesture ${this.state.isPraised ? 'is-active' : ''}`} onClick={this._postPraise}>
							<div className="main-praise__gesture__thumb"></div>
						</div>
						{
							this.state.praiseAmount === null ||
								<div className="main-praise__amount">{this.state.praiseAmount}赞</div>
						}
					</div>
					{
						this.isNewsapp ?
							(
								<nav className="header__nav main-nav">
									<Link to="/news" activeClassName="is-active">要闻</Link>
									<Link to="/speech" activeClassName="is-active">涛涛说</Link>
									<Link to="/honor" activeClassName="is-active">荣耀榜</Link>
								</nav>
							) : null
					}

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
				{
					!this.isNewsapp ?
						<div className={'open-newsapp' + (this.state.showOpen ? '' : ' hide')} onClick={this.handleClick.bind(this, 'open')}>
							<i onClick={this.handleClick.bind(this, 'close')} />
						</div>
					: ''
				}
			</div>
		);
	}
}

let rootRoute = {
	path: '/',
	component: App,
	childRoutes: [
		{
			component: Main,
			childRoutes: [NewsRoute, SpeechRoute, HonorRoute]
		},
		CommentRoute
	],
	onEnter(nextState, replaceState) {
		if ( nextState.location.pathname == '/' ) {
			replaceState(null, '/news');
		}
	}
};


ReactDOM.render(
  <Router routes={rootRoute}/>,
  document.body.appendChild(document.createElement('div'))
);
