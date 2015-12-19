import React from 'react';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <footer>
        <div><i className="favorite" />{this.props.favorite}</div>
        <div><i className="comment" />{this.props.comment}</div>
      </footer>
    )
  }
}