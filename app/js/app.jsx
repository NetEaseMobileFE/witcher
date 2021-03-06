import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRedirect } from 'react-router';
require('es6-promise').polyfill();

import Share from 'newsapp-react/lib/Share';
import Open from 'newsapp-react/lib/Open';
import UI from 'newsapp-react/lib/UI';
import Pubsub from 'ntes-pubsub';


import { ajax, getScript, fastGetImgHeight } from 'js/utils/util';
import Poster from 'js/components/common/poster';
import Carousel from 'js/components/common/carousel';
import { chief } from 'js/appConfig';

import News from './components/news/index';
import Honor from './components/honor/index';
import Speech from './components/speech/index';
import Comment from './components/comment/index';


const App = (props) => {
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
			url: `${chief.baseUrl}${cid}/0-20.html`,
			dataType: 'JSON'
		}).then((data) => {
			let list = data[cid];
			list = list.slice(0, 6);
			let figures = [list[0].imgsrc];
			// let adArti = list[1];
			// if ( adArti.priority >= 90 ) {
			// 	figures.push({ href: adArti.url, src: adArti.imgsrc });
			// }
			this.setState({
				figures
			});

			fastGetImgHeight('http://img2.cache.netease.com/utf8/3g/witcher/img/1.jpg').then(({height}) => {
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

			window.threadCount = (data) => {
				this.setState({
					praiseAmount: data.threadVote,
					praiseAPIParam
				});
			};
			getScript(`http://comment.api.163.com/api/json/thread/total/${praiseAPIParam}?jsoncallback=threadCount`);
		});
	}

	_postPraise = () => {
		if ( !this.state.isPraised ) {
			this.refs.praiseForm.submit();
			this.setState({
				isPraised: true,
				praiseAmount: this.state.praiseAmount + 1
			});
		}
	};

	render() {
		let { posterHeight, figures } = this.state;
		// const figures = [{
		// 	href: '',
		// 	src: 'http://img2.cache.netease.com/utf8/3g/witcher/img/1.jpg'
		// }, {
		// 	href: 'http://2016.163.com/video/2016/8/J/4/VBTICKMJ4.html',
		// 	src: 'http://img3.cache.netease.com/utf8/3g/witcher/img/3.jpg'
		// }]
		const shareData = {
		  wbText: '宁泽涛独家个人官网进驻网易',
		  wbPhoto: 'http://img3.cache.netease.com/3g/2015/12/29/201512291724056ba40.jpg',
		  wxText: '来网易，和有态度的宁泽涛一起传播正能量。',
		  wxTitle: '宁泽涛独家个人官网进驻网易',
		  wxUrl: 'http://c.3g.163.com/nc/qa/witcher/index.html',
		  wxPhoto: 'http://img3.cache.netease.com/3g/2015/12/29/201512291724056ba40.jpg'
		}
		return (
			<div className={`page ${posterHeight ? 'is-loaded' : ''}`}>
				<Share {...shareData} />
				<UI />
				<Open />

				<div className="page__poster swiper-container">
					{
						figures.length > 1 ?
							<Carousel images={figures} currentIndex={0} itemWidth="750" /> :
							<img src={figures[0]}/>
					}
				</div>

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

let routes = (
	<Route path="/" component={App}>
		<Route component={Main} ignoreScrollBehavior>
			<Route path="/news" component={News}/>
			<Route path="/speech" component={Speech} />
			<Route path="/honor" component={Honor}/>
		</Route>
		<Route path="comment/:id" component={Comment} />
		<IndexRedirect from="/" to="/news" />
	</Route>
);

ReactDOM.render(
	<Router>{routes}</Router>,
	document.body.appendChild(document.createElement('div'))
);
