import React from 'react';
import Pubsub from 'ntes-pubsub';

import Carousel from '../common/carousel'

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)

    this.state = {
      images: [],
      currentIndex: 0, 
      delta: 0
    }
  }
  componentDidMount(){
    this.token = Pubsub.subscribe('imageClick', (images, index)=>{
      this.setState({images: images, currentIndex: index, delta:0.0000001})
    })
  }
  componentWillUnmount(){
    Pubsub.unsubscribe('imageClick', this.token)
  }
  render(){
    return <Carousel images={this.state.images} currentIndex={this.state.currentIndex} />
  }
}