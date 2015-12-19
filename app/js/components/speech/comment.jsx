import React from 'react';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div>
        comment id is {this.props.params.postId}
      </div>
    )
  }
}