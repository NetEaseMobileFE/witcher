import { ajax } from 'js/utils/util';


export default {
	componentDidMount() {
		this._startIndex = 0;
		this._pageSize = 10;

		this.scrollHandler = () => {
			if ( document.documentElement.scrollHeight - document.documentElement.clientHeight - window.scrollY < 20 ) {
				this._loadMore();
			}
		};
		this._loadMore();
	},

	_removeListener() {
		window.removeEventListener('scroll', this.scrollHandler);
	},

	componentWillUnmount() {
		this._removeListener();
	},

	_loadMore() {
		if ( !this.state.loading ) {
			let cid = this.config.cid;

			this.setState({
				loading: true
			});

			ajax({
				url: `${this.config.baseUrl}${cid}/${this._startIndex}-${this._pageSize}.html`,
				dataType: 'JSON'
			}).then(json => {
				let list = json[cid],
					len = list.length;

				if ( this._startIndex == 0 ) {
					window.addEventListener('scroll', this.scrollHandler, false);
				}

				if ( len < this._pageSize ) { // no more
					this._removeListener();
				}

				if ( len > 0 ) {
					let datas = this.state.datas;
					this.setState({
						datas: datas.concat(json[cid]),
						loading: false
					});

					this._startIndex += len;
				}
			});
		}
	}
}