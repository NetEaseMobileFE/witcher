import React from 'react';
import { getScript } from 'js/utils/util';

export default class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.submit = this.submit.bind(this)
  }
  handleBlur(){
    this.refs.wrap.style.cssText = ''
  }
  handleFocus(){
    if(navigator.userAgent.match(/iphone|ipad|ipod/i)){
      this.refs.wrap.style.cssText = 'position: absolute;top: 0; bottom: auto;'
      setTimeout(function(){
        document.body.scrollTop = 0
      }, 200)
    }
  }
  handleChange(){
    this.setState({text: this.refs.input.value.trim()})
  }
  submit(){
    if(!this.state.text){
      return
    }
    this.props.submit(this.state.text)
    this.setState({text: ''})
    let url = `http://c.3g.163.com/v1.1/anoycommentadd.api?product=lofter-api&postid=${this.props.postId}&blogid=${this.props.blogId}&content=${encodeURIComponent(this.state.text)}&nick=${encodeURIComponent(this.props.userInfo.nickname || '网易新闻客户端网友')}&callback=replyCallback`
    getScript(url);
  }
  handleClick(){
    this.submit()
  }
  handlePress(event){
    if(event.which !== 13 || !this.state.text){
      return
    }
    this.submit()
  }
  componentDidMount(){
    window.replyCallback = (data)=>{
      // alert(JSON.stringify(data))
      this.refs.input.blur()
    }    
    window.addEventListener('resize', ()=>{
      console.log('resize')
    })
  }
  componentWillUnmount(){
    window.replyCallback = null
  }
  render(){
    //button onClick={this.handleClick}>提交</button>
    let className = ''
    if(this.state.text){
      className = 'active'
    }
    return <div className="input-wrap" ref="wrap">
      <input placeholder="随便说点什么吧" ref="input" type="text" value={this.state.text} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} onKeyPress={this.handlePress}/>
      <button className={className} onClick={this.handleClick}>提交</button>
    </div>
  }
}