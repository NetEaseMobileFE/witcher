import React from 'react';
import Pubsub from 'ntes-pubsub';

import Carousel from '../common/carousel'

export default class ViewImage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)

    this.state = {
      images: [],
      currentIndex: 0
    }
  }
  handleClick(e){
    e.preventDefault()
    this.setState({images: [], currentIndex: 0})
  }
  componentDidMount(){
    this.token = Pubsub.subscribe('imageClick', (images, index)=>{
      this.setState({images: images, currentIndex: index})
    })
  }
  componentWillUnmount(){
    Pubsub.unsubscribe('imageClick', this.token)
  }
  render(){
    let className = 'view-images'
    if(this.state.images.length > 1){
      className += ' active'
    }
    return <div className={className} onClick={this.handleClick}>
      <Carousel images={this.state.images} currentIndex={this.state.currentIndex} itemWidth="750"/>
    </div>
  }
}