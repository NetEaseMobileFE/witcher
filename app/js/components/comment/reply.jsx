import React from 'react';

export default class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleChange(){
    this.setState({text: this.refs.input.value.trim()})
  }
  handleClick(){
    if(!this.state.text){
      return
    }
    let url = `http://api.lofter.com/v1.1/anoycommentadd.api?product=lofter-api&postid=${this.props.postId}&blogid=${this.props.blogId}&content=${encodeURIComponent(this.state.text)}&nick=${encodeURIComponent('网易新闻客户端网友')}`
    console.log(url)
  }

  render(){
    return <div className="input-wrap">
      <input ref="input" type="text" value={this.state.text} onChange={this.handleChange} />
      <button onClick={this.handleClick}>提交</button>
    </div>
  }
}