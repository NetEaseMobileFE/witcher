import React from 'react';
import Pubsub from 'ntes-pubsub';
import 'css/carousel.css';

var Carousel = React.createClass({
  getDefaultProps: function () {
    return {
      images: [],
      flickThreshold: 0.6,
      delta: 10
    }
  },
  getInitialState: function(){
    return {
      currentIndex: this.props.currentIndex,
      delta: 0
    }
  },
  x: null,
  y: null,
  start: 0,
  swiping: false,
  calculatePos: function (e) {
    var x = e.changedTouches[0].clientX
    var y = e.changedTouches[0].clientY

    var xd = this.x - x
    var yd = this.y - y

    var axd = Math.abs(xd)
    var ayd = Math.abs(yd)

    return {
      deltaX: xd,
      deltaY: yd,
      absX: axd,
      absY: ayd
    }
  },
  touchStart: function (e) {
    if (e.touches.length > 1) {
      return
    }
    if(this.props.images.length < 2){
      return
    }
    this.start = Date.now()
    this.x = e.touches[0].clientX
    this.y = e.touches[0].clientY
    this.swiping = false
  },
  touchMove: function (e) {
    if (!this.x || !this.y || e.touches.length > 1) {
      return
    }

    var cancelPageSwipe = false
    var pos = this.calculatePos(e)

    if (pos.absX < this.props.delta && pos.absY < this.props.delta) {
      return
    }

    if (pos.absX > pos.absY) {
      if (pos.deltaX > 0) {
        this.nextImageScroll(e, pos.absX)
        cancelPageSwipe = true
      } else {
        this.prevImageScroll(e, pos.absX)
        cancelPageSwipe = true
      }
    } 

    this.swiping = true

    if (cancelPageSwipe) {
      e.preventDefault()
    }
  },
  touchEnd: function (ev) {
    if (this.swiping) {
      var pos = this.calculatePos(ev)

      var time = Date.now() - this.state.start
      var velocity = Math.sqrt(pos.absX * pos.absX + pos.absY * pos.absY) / time
      var isFlick = velocity > this.props.flickThreshold

      var currentIndex = this.state.currentIndex

      this.doMoveImage(ev, pos.deltaX, pos.deltaY, isFlick)
    }else{
      this.setState({delta: 0})
    }
    // this.setState(this.getInitialState())
  },
  addResistance: function (delta) {
    return delta * (1 - parseInt(Math.sqrt(Math.pow(delta, 2)), 10) / 1000)
  },
  doMoveImage: function (_, x) {
    var index = this.state.currentIndex
    var imageMoveIndex = this.state.currentIndex
    if (x < 0) {
      if (index > 0) {
        index = index - 1
        imageMoveIndex = index
      }
    } else if (x > 0) {
      if (index < this.props.images.length - 1) {
        index = index + 1
        imageMoveIndex = imageMoveIndex
      }
    }

    this.setState({
      currentIndex: index,
      delta: 0
    })
  },
  prevImageScroll: function (e, delta) {
    this.setState({
      delta: this.addResistance(delta)
    })
  },

  nextImageScroll: function (e, delta) {
    this.setState({
      delta: 0 - this.addResistance(delta)
    })
  },
  
  render: function () {
    var images = this.props.images
    var delta = this.state.delta - this.state.currentIndex * (+this.props.itemWidth || 750)
    var transition = 'all 250ms ease-out'
    var styleString = {
      width: images.length * (+this.props.itemWidth || 750),
      'WebkitTransform': 'translate3d(' + delta + 'px, 0, 0)',
      transition: this.state.delta === 0 ? transition : 'none'
    }
    return <div className="m-carousel">
      <div className="inner" style={styleString} onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd} onClick={this.click}>
        {
          images.map(function(img, i){
            return <div className="img-wrap" key={i}><img src={img} /></div>
          })
        }
      </div>
    </div>
  }
})

export default Carousel