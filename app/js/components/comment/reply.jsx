import React from 'react';
import { getScript } from 'js/utils/util';

export default class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.submit = this.submit.bind(this)
  }
  handleChange(){
    this.setState({text: this.refs.input.value.trim()})
  }
  submit(){
    if(!this.state.text){
      return
    }
    let url = `http://c.3g.163.com/v1.1/anoycommentadd.api?product=lofter-api&postid=${this.props.postId}&blogid=${this.props.blogId}&content=${encodeURIComponent(this.state.text)}&nick=${encodeURIComponent('网易新闻客户端网友')}&callback=replyCallback`
    getScript(url);
  }
  handleClick(){
    this.props.submit(this.state.text)
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
      this.setState({text: ''})
      this.refs.input.blur()
    }    
  }
  componentWillUnmount(){
    window.replyCallback = null
  }
  render(){
    // <button onClick={this.handleClick}>提交</button>
    return <div className="input-wrap">
      <input placeholder="随便说点什么吧" ref="input" type="text" value={this.state.text} onChange={this.handleChange} onKeyPress={this.handlePress}/>
      <button onClick={this.handleClick}>提交</button>
    </div>
  }
}