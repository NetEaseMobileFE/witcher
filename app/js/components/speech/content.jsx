import React from 'react';
import Pubsub from 'ntes-pubsub';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ellipsis: false
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
    Pubsub.publish('imageClick', this.imgs, 0)
  }
  viewVideo(){
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
      img = <img onClick={this.viewImages} src={this.props.data.firstSmallImageUrl.replace(/thumbnail=[a-z0-9]*&/, 'thumbnail=750x0&')} />
    }
    if(this.props.data.embed){
      video = JSON.parse(this.props.data.embed)
      video = <div className="video"><video src={video.flashurl} /><img src={`http://imgsize.ph.126.net/?imgurl=${video.video_img_url}_750x10000x0.jpg`} /></div>
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