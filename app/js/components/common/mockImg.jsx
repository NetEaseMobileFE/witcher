import React from 'react';

export default ({src, width, height, quality = 80, classNames = ''}) => {
	let style = {
		backgroundImage: `url('http://s.cimg.163.com/i/${src.replace('http://', '')}.${width}x${height}.${quality}.jpg')`,
		width,
		height
	};

	return (
		<div className={`mock-img ${classNames}`} style={style}></div>
	)
}