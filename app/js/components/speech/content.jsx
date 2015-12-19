import React from 'react';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    let img = ''
    if(this.props.img){
      img = <img src={this.props.img.replace(/thumbnail=[a-z0-9]*&/, 'thumbnail=750x0&')} />
    }
    return <div className="content">
      { img }
      <div dangerouslySetInnerHTML={{__html: this.props.content}} />
    </div>
  }
}