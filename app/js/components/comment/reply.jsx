import React from 'react';
import util from 'js/utils/util';

export default class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handlePress = this.handlePress.bind(this)
  }
  handleChange(){
    this.setState({text: this.refs.input.value.trim()})
  }
  handleClick(){
    if(!this.state.text){
      return
    }
    let url = `http://api.lofter.com/v1.1/anoycommentadd.api?product=lofter-api&postid=${this.props.postId}&blogid=${this.props.blogId}&content=${encodeURIComponent(this.state.text)}&nick=${encodeURIComponent('网易新闻客户端网友')}`
    util.getScript(url);
  }
  handlePress(event){
    if(event.which !== 13 || !this.state.text){
      return
    }
    let url = `http://api.lofter.com/v1.1/anoycommentadd.api?product=lofter-api&postid=${this.props.postId}&blogid=${this.props.blogId}&content=${encodeURIComponent(this.state.text)}&nick=${encodeURIComponent('网易新闻客户端网友')}&callback=replyCallback`
    util.getScript(url);
  }
  componentDidMount(){
    window.replyCallback = (data)=>{
      console.log(data)
    }    
  }
  componentWillUnmount(){
    window.replyCallback = null
  }
  render(){
    // <button onClick={this.handleClick}>提交</button>
    return <div className="input-wrap">
      <input placeholder="随便说点什么吧" ref="input" type="text" value={this.state.text} onChange={this.handleChange} onKeyPress={this.handlePress}/>
    </div>
  }
}