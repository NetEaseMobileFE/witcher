import React from 'react';
import {Link} from 'react-router';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)

    this.state = {
      favourite: getLocalStorage(this.props.id)
    }
  }
  handleClick(){
    if(this.state.favourite){
      return
    }

    this.setState({favourite: true})
    setLocalStorage(this.props.id)
  }
  render(){
    let className = 'favourite'
    let favourite = this.props.favourite + (this.state.favourite ? 1 : 0)
    if(this.state.favourite){
      className += ' active'
    }
    let link = <a href={'?__newsapp_target=_blank#/comment/' + this.props.id}><i />{this.props.comment}  留言</a>
    if(!navigator.userAgent.match(/newsapp/i)){
      link = <Link to={'/comment/' + this.props.id}><i />{this.props.comment}  留言</Link>
    }
    return (
      <footer>
        <div className={className} onClick={this.handleClick}>
          <i />{favourite}  赞
        </div>
        <div className="comment">
        {link}
        </div>
      </footer>
    )
  }
}


function getLocalStorage(id){
  let favouriteItems = localStorage.getItem('witcher_fav')
  if(favouriteItems){
    favouriteItems = JSON.parse(favouriteItems)
  }else{
    favouriteItems = {}
  }
  if(id){
    return favouriteItems[id]
  }else{
    return favouriteItems
  }
}

function setLocalStorage(id){
  let favouriteItems = getLocalStorage()
  favouriteItems[id] = 1
  localStorage.setItem('witcher_fav', JSON.stringify(favouriteItems))
}


