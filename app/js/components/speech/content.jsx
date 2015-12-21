import React from 'react';
import Pubsub from 'ntes-pubsub';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ellipsis: false,
      viewVideo: false
    }
    this.viewMore = this.viewMore.bind(this)
    this.viewImages = this.viewImages.bind(this)
    this.viewVideo = this.viewVideo.bind(this)
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
    this.setState({viewVideo: !this.state.viewVideo})
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
      let embed = JSON.parse(this.props.data.embed)
      let imgurl = `http://imgsize.ph.126.net/?imgurl=${embed.video_img_url}_750x10000x0.jpg`

      // 视频
      if(embed.flashurl){
        // mp4视频
        if(embed.flashurl.match(/mp4$/)){
          if(!this.state.viewVideo){
            video = <div className="video" onClick={this.viewVideo}><img src={imgurl} /></div>
          }else{
            video = <div className="video playing" onClick={this.viewVideo}><video src={embed.flashurl} poster={imgurl} autoPlay="true" loop="true" /></div>
          }
        // 优酷等其他来源视频
        }else{
          video = <div className="video"><a href={embed.originUrl + '?__newsapp_target=_blank'}><img src={imgurl}/></a></div>
        }
      }
      // 音频
      if(embed.type === 'diy'){
        video = <audio src={embed.listenUrl} controls />
      }
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