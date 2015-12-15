module.exports = {
	ajax(option) {
		return new Promise(function(resolve, reject){
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
	}
};