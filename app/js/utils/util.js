module.exports = {
	ajax(option) {
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
	},

	getScript(url) {
		let head = document.getElementsByTagName('head')[0];
		let script = document.createElement('script');

		script.type = 'text/javascript';
		script.charset = 'utf-8';
		script.async = true;
		script.src = url;
		head.appendChild(script);
	},

	formatTime(time){
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
        return `${time.getMonth() + 1}-${time.getDate()}  ${time.getHours()}:${time.getMinutes()}`
      }
    }else if(distance.hour > 0){
      return distance.hour + '小时前'
    }else{
      return (distance.minute || 1) + '分钟前'
    }
  }
};