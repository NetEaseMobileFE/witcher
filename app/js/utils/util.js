export let ajax = option => {
	return new Promise((resolve, reject) => {
		let data, dataType, key, method, request;
		if ( !option.url ) {
			reject(new Error('Need for url'));
		}

		dataType = option.dataType || 'text';
		method = option.method || 'GET';
		data = '';

		if ( !!option.data && typeof option.data !== 'string' ) {
			for ( key in option.data ) {
				data += key + "=" + option.data[key] + "&";
			}
			data = data.slice(0, -1);
		} else {
			data = option.data;
		}

		request = new XMLHttpRequest();
		request.open(method, option.url, true);
		if ( method.toUpperCase() === 'POST' ) {
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		}
		request.onload = function() {
			if ( request.status >= 200 && request.status < 400 ) {
				let result = request.responseText;
				if ( dataType.toUpperCase() === 'JSON' ) {
					result = JSON.parse(result);
				}
				resolve(result);
			} else {
				reject(new Error(request.statusText));
			}
		};
		request.send(data);
	});
};

export let getScript = url => {
	let head = document.getElementsByTagName('head')[0];
	let script = document.createElement('script');

	script.type = 'text/javascript';
	script.charset = 'utf-8';
	script.async = true;
	script.src = url;
	head.appendChild(script);
};

export let detactArtiType = data => {
	let type = data.skipType;

	if ( !type ) {
		if ( data.template == 'manual' ) {
			type = 'web';
		} else {
			type = 'doc';
		}
	}

	return type;
};

export let getOpenParam = data => {
	let type = detactArtiType(data),
		param;

	switch ( type ) {
		case 'doc':
			param = data.docid;
			break;
		case 'web':
			param = data.url;
			break;
		default :
			param = data.skipID;
			break;
	}

	return param;
};

//export let cimg = (src, width, height, quality = 80) => {
//	return 	`http://s.cimg.163.com/i/${src.replace('http://', '')}.${width}x${height}.${quality}.jpg`;
//};

export let getVendor = () => {
	let dummyStyle = document.createElement('div').style,
		vendors = 't,webkitT,MozT,msT,OT'.split(','),
		vendor = false;

	for ( let t of vendors ) {
		if ( t + 'ransform' in dummyStyle ) {
			vendor =  t.slice(0, -1);
			break;
		}
	}

	dummyStyle = null;
	return vendor;
};

export let formatTime = (time)=>{
  let date = null
  
  if(typeof time == 'number'){
    date = time
  }else{
    const arr = time.split(/[- :]/)
    date = +new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5])
  }
  time = new Date(time)
  const now = Date.now()
  const distance = {
    day: Math.floor((now - date) / (1000*60*60*24)),
    hour: Math.floor((now - date) / (1000*60*60)),
    minute: Math.floor((now - date) / (1000*60)) 
  }
  if(distance.day > 0){
    if(distance.day === 1){
      return '1天前'
    }else{
      return `${fixNumber(time.getMonth() + 1)}-${fixNumber(time.getDate())}  ${fixNumber(time.getHours())}:${fixNumber(time.getMinutes())}`
    }
  }else if(distance.hour > 0){
    return distance.hour + '小时前'
  }else if(distance.minute > 0){
    return (distance.minute || 1) + '分钟前'
  }else{
    return '刚刚'
  }
}
function fixNumber(num){
  if(num < 10){
    return '0' + num
  }else{
    return num
  }
}


export let nextFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) { return setTimeout(callback, 1); };
})();

export let cancelFrame = (function () {
	return window.cancelRequestAnimationFrame ||
		window.cancelAnimationFrame ||
		window.webkitCancelRequestAnimationFrame ||
		window.mozCancelRequestAnimationFrame ||
		window.oCancelRequestAnimationFrame ||
		window.msCancelRequestAnimationFrame ||
		clearTimeout;
})();

