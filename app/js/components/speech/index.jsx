import React from 'react';
import 'css/speech.css';

import util from 'js/utils/util';

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
  _loadMore(){
    let domain = this.props.domain || 'i.lofter.com'
    util.getScript(`http://api.lofter.com/v1.1/publicPosts.api?blogdomain=${domain}&product=lofter-api&limit=${this.size}&offset=${this.offset}&callback=speechCallback`);
  }

  render(){
    return <div className="speech"> 
        {
          this.state.datas.map(item=>{
            return <article key={item.id}>
              <header>
                <img src={`http://imgsize.ph.126.net/?imgurl=${item.blogInfo.bigAvaImg}_66x66x0.jpg`} />
                <div>
                  <span className="name">{item.blogInfo.blogNickName}</span>
                  <span className="time">{item.blogInfo.postAddTime}</span>
                </div>
              </header>
              <Content img={item.firstSmallImageUrl || ''} content={item.content} />
              <Footer id={item.id} favourite={item.hot} comment={item.postCount.responseCount} />
            </article>
          })
        }
    </div>
  }
}