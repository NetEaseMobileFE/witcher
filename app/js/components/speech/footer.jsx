import React from 'react';
import {Link} from 'react-router';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    console.log('favourite ' + this.props.favourite)
  }
  render(){
    return (
      <footer>
        <div className="favourite" onClick={this.handleClick}>
          <i />{this.props.favourite}  赞
        </div>
        <div className="comment">
          <Link to={'/comment/' + this.props.id}><i />{this.props.comment}  留言</Link>
        </div>
      </footer>
    )
  }
}