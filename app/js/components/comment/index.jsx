import React from 'react';
import { getScript, formatTime } from 'js/utils/util';
import Reply from './reply';
import Login from 'newsapp-react/lib/Login';
import Pubsub from 'ntes-pubsub';


import 'css/comment.css';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.size = 20
    this.offset = 0
    this._loadMore = this._loadMore.bind(this)
    this.scrollHandler = this.scrollHandler.bind(this)
    this.submitCallback = this.submitCallback.bind(this)
    this.state = {
      data: [],
      loading: false,
      userInfo: {}
    }
    this.loadAll = false
  }

  submitCallback(text){
    const comment = {
      id: Date.now(),
      publisherMainBlogInfo: {
        blogNickName: this.state.userInfo.nickname || '新鲜包子',
        bigAvaImg: this.state.userInfo.head || ''
      },
      publishTime: Date.now(),
      content: text
    }
    this.setState({data: [comment].concat(this.state.data)})
  }
  scrollHandler(){
    if(this.state.loading || this.loadAll){
      return
    }
    if ( document.documentElement.scrollHeight - document.documentElement.clientHeight - window.scrollY < 20 ) {
      this._loadMore();
    }
  }
  _loadMore(){
    let postId = this.props.params.id.split('_')[1]
    this.setState({loading: true})
    getScript(`http://api.lofter.com/v1.1/comments.api?postid=${postId}&product=lofter-api&limit=${this.size}&offset=${this.offset}&callback=commentCallback`);
  }
  componentDidMount(){
    window.addEventListener('scroll', this.scrollHandler)
    window.commentCallback = (data)=>{
      if(data.response.length < this.size){
        this.loadAll = true
      }
      this.offset += this.size
      this.setState({
        data: this.state.data.concat(data.response),
        loading: false
      })
    }
    this._loadMore()
    Pubsub.publish('newsapp:login', userInfo=>{
      this.setState({userInfo: userInfo})
    })
    Pubsub.publish('newsapp:ui:button', ' ')
    Pubsub.publish('newsapp:ui:title', '宁泽涛官网')

  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.scrollHandler)
    window.commentCallback = null
  }
  render(){
    let blogId = this.props.params.id.split('_')[0]
    let postId = this.props.params.id.split('_')[1]
    return (
      <div className="g-comment">
        <Login />
        <section>
        {
          this.state.data.map(item=>{
            let avatar = item.publisherMainBlogInfo.bigAvaImg
            if(!avatar || avatar === 'http://l.bst.126.net/rsc/img/ava/110.png'){
              avatar = 'http://img3.cache.netease.com/utf8/3g/witcher/img/avatar.png'
            }
            avatar = `http://imgsize.ph.126.net/?imgurl=${avatar}_66x66x0.jpg`
            return (
              <article key={item.id}>
                <header>
                  <img src={avatar} />
                  <div className="info">
                    <span className="name">{item.publisherMainBlogInfo.blogNickName}</span>
                    <span className="time">{formatTime(item.publishTime)}</span>
                  </div>
                </header>
                <div className="content">
                  {item.content}
                </div>
              </article>
            )
          })
        }
        </section>
        <Reply userInfo={this.state.userInfo} postId={postId} blogId={blogId} submit={this.submitCallback} />
      </div>
    )
  }
}