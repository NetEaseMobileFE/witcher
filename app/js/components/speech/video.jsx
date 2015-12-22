import React from 'react';

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.viewVideo = this.viewVideo.bind(this)
    this.videoEnd = this.videoEnd.bind(this)
    this.videoCanPlay = this.videoCanPlay.bind(this)

    this.state = {
      viewVideo: false,
      loading: false
    }
  }
  videoEnd(){
    this.setState({loading: false, viewVideo: false})
  }
  videoCanPlay(){
    this.setState({loading: false})
  }
  viewVideo(){
    this.setState({viewVideo: !this.state.viewVideo, loading: true}, ()=>{
      if(this.state.viewVideo){
        this.refs.video.play()
      }
    })
  }
  render(){
    const embed = this.props.data
    let video = ''
    let imgurl = `http://imgsize.ph.126.net/?imgurl=${embed.video_img_url}_750x10000x0.jpg`
    // 视频
    if(embed.flashurl){
      // mp4视频
      if(embed.flashurl.match(/mp4$/)){
        if(!this.state.viewVideo){
          video = <div className="video" onClick={this.viewVideo}><img src={imgurl} /></div>
        }else{
          let className = 'video'
          if(this.state.loading){
            className += ' loading'
          }else{
            className += ' playing'
          }
          video = <div className={className} onClick={this.viewVideo}><video onEnded={this.videoEnd} onPause={this.videoEnd} onCanPlay={this.videoCanPlay} ref="video" src={embed.flashurl} poster={imgurl} /></div>

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
    return video
  }
}