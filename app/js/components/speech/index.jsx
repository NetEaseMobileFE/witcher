import React from 'react';
import 'css/speech.css';

import { getScript, formatTime } from 'js/utils/util';
import Loading from '../common/loading'

import Content from './content';
import Footer from './footer';
import ViewImage from './viewImage'

export default class Speech extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      loading: false
    }
    this.offset = 0
    this.size = 10
    this.loadAll = false
    this.scrollHandler = this.scrollHandler.bind(this)
  }
  scrollHandler(){
    if(this.state.loading || this.loadAll){
      return
    }
    if ( document.documentElement.scrollHeight - document.documentElement.clientHeight - window.scrollY < 20 ) {
      this._loadMore();
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler)
    this._loadMore();
    window.speechCallback = (data)=>{
      if(data.response.length < this.size){
        this.loadAll = true
      }
      this.offset += this.size
      this.setState({
        datas: this.state.datas.concat(data.response),
        loading: false
      })
    }
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.scrollHandler)
    window.speechCallback = null
  }
  _loadMore(){
    let domain = this.props.domain || 'testtesttest12312.lofter.com'
    this.setState({loading: true})
    getScript(`http://api.lofter.com/v1.1/publicPosts.api?blogdomain=${domain}&product=lofter-api&limit=${this.size}&offset=${this.offset}&callback=speechCallback`);
  }

  render(){
    return <div className="g-speech">
        <ViewImage />
        {
          this.state.datas.map(item=>{
            let avatar = item.blogInfo.bigAvaImg || 'http://l.bst.126.net/rsc/img/ava/64.png'
            avatar = `http://imgsize.ph.126.net/?imgurl=${avatar}_66x66x0.jpg`
            return <article key={item.id}>
              <header>
                <img src={avatar} />
                <div>
                  <span className="name">{item.blogInfo.blogNickName}</span>
                  <span className="time">{formatTime(item.publishTime)}</span>
                </div>
              </header>
              <Content data={item} />
              <Footer id={item.blogId + '_' + item.id} favourite={item.hot} comment={item.postCount.responseCount} />
            </article>
          })
        }
        {(this.state.loading && !this.loadAll) ? <Loading /> : ''}
    </div>
  }
}