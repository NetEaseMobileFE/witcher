import React from 'react';
import 'css/speech.css';

import util from 'js/utils/util';
import Carousel from '../common/carousel';

import Content from './content';
import Footer from './footer';

export default class Speech extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: []
    }
    this.offset = 0
    this.size = 10
  }
  componentDidMount() {
    this._loadMore();
    window.speechCallback = (data)=>{
      this.setState({datas: data.response})
    }
  }
  componentWillUnmount(){
    window.speechCallback = null
  }
  _loadMore(){
    let domain = this.props.domain || 'testtesttest12312.lofter.com'
    util.getScript(`http://api.lofter.com/v1.1/publicPosts.api?blogdomain=${domain}&product=lofter-api&limit=${this.size}&offset=${this.offset}&callback=speechCallback`);
  }

  render(){
    return <div className="g-speech">
        <Carousel itemWidth="750" />
        {
          this.state.datas.map(item=>{
            let avatar = item.blogInfo.bigAvaImg || 'http://l.bst.126.net/rsc/img/ava/64.png'
            avatar = `http://imgsize.ph.126.net/?imgurl=${avatar}_66x66x0.jpg`
            return <article key={item.id}>
              <header>
                <img src={avatar} />
                <div>
                  <span className="name">{item.blogInfo.blogNickName}</span>
                  <span className="time">{item.blogInfo.postAddTime}</span>
                </div>
              </header>
              <Content data={item} />
              <Footer id={item.blogId + '_' + item.id} favourite={item.hot} comment={item.postCount.responseCount} />
            </article>
          })
        }
    </div>
  }
}