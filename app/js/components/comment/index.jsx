import React from 'react';
import util from 'js/utils/util';
import Reply from './reply';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.size = 20
    this.offset = 0
    this._loadMore = this._loadMore.bind(this)
    this.state = {
      data: []
    }
  }
  _loadMore(){
    let postId = this.props.params.id.split('_')[1]
    util.getScript(`http://api.lofter.com/v1.1/comments.api?postid=${postId}&product=lofter-api&limit=${this.size}&offset=${this.offset}&callback=commentCallback`);
  }
  componentDidMount(){
    window.commentCallback = (data)=>{
      this.setState({
        data: data.response
      })
    }
    this._loadMore()
  }
  componentWillUnmount(){
    window.commentCallback = null
  }
  render(){
    let blogId = this.props.params.id.split('_')[0]
    let postId = this.props.params.id.split('_')[1]
    return (
      <div className="comment">
        {
          this.state.data.map(item=>{
            let avatar = item.publisherMainBlogInfo.bigAvaImg || 'http://l.bst.126.net/rsc/img/ava/64.png'
            avatar = `http://imgsize.ph.126.net/?imgurl=${avatar}_66x66x0.jpg`
            return (
              <article key={item.id}>
                <header>
                  <img src={avatar} />
                  <span>{item.publisherMainBlogInfo.blogNickName}</span>
                </header>
                <div>
                  {item.content}
                </div>
              </article>
            )
          })
        }
        <Reply postId={postId} blogId={blogId} />
      </div>
    )
  }
}