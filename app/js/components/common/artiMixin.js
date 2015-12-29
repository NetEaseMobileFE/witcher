import { ajax } from 'js/utils/util';
import Pubsub from 'ntes-pubsub';


export default {
	getInitialState() {
		return {
			datas: [],
			scrollY: window.scrollY
		};
	},

	componentDidMount() {
		this._startIndex = 0;
		this._pageSize = 20;
		this._noMoreData = false;
		this._loadMore();
	},

	_scrollHandler() {
		if ( !this._noMoreData && document.documentElement.scrollHeight - document.documentElement.clientHeight - window.scrollY < 100 ) {
			this._loadMore();
		}

		this.setState({
			scrollY: window.scrollY
		});
	},

	_open(param) {
		Pubsub.publish('newsapp:open', param);
	},

	componentWillUnmount() {
		window.removeEventListener('scroll', this._scrollHandler);
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
					window.addEventListener('scroll', this._scrollHandler, false);
				}

				if ( len < this._pageSize ) { // no more
					this._noMoreData = true;
				}

				if ( len > 0 ) {
					let datas = this.state.datas;
					this.setState({
						datas: datas.concat(json[cid]),
						loading: false
					});

					this._startIndex += len;
				} else if ( len == 0 ) {
					this.setState({
						loading: false
					});
				}
			});
		}
	}
}