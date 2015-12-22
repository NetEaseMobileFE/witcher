import React from 'react';
import Pubsub from 'ntes-pubsub';

import Video from './video'

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ellipsis: false,
      viewVideo: false
    }
    this.viewMore = this.viewMore.bind(this)
    this.viewImages = this.viewImages.bind(this)
    this.imgs = this.props.data.photoLinks
    if(this.imgs){
      this.imgs = JSON.parse(this.imgs)
      this.imgs = this.imgs.map(item=>{
        return item.orign.replace(/thumbnail=[a-z0-9]*&/, 'thumbnail=750x0&')
      })
    }
  }
  componentDidMount(){
    const height = this.refs.inner.offsetHeight
    if(height > 150){
      this.setState({ellipsis: true})
    }
  }
  viewMore(){
    this.setState({ellipsis: false})
  }
  viewImages(){
    if(this.imgs.length > 1){
      Pubsub.publish('imageClick', this.imgs, 0)
    }
  }
  render(){

    let img = ''
    let video = ''
    let readMore = ''
    let className = 'wrapper'
    if(this.state.ellipsis){
      readMore = <div className="read-more" onClick={this.viewMore}>查看全文</div>
    }else{
      className += ' active'
    }
    if(this.props.data.firstSmallImageUrl){
      let i = ''
      if(this.imgs && this.imgs.length > 1){
        i = <i>{this.imgs.length}</i>
      }
      img = <div className="img-wrap">{i}<img onClick={this.viewImages} src={this.props.data.firstSmallImageUrl.replace(/thumbnail=[a-z0-9]*&/, 'thumbnail=750x0&')} /></div>
    }
    if(this.props.data.embed){
      video = <Video data={JSON.parse(this.props.data.embed)} />
    }
    return <div className="content">
      { img } { video }
      <div className={className}>
        <div ref="inner" dangerouslySetInnerHTML={{__html: this.props.data.content}} />
        { readMore }
      </div>
    </div>
  }
}