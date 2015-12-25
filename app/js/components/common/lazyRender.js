import ReactDom from 'react-dom';
import { ajax } from 'js/utils/util';


export default {
	getInitialState() {
		return {
			shouldRender: false
		};
	},

	componentWillReceiveProps(nextProps) {
		if ( this._thresholdY && nextProps.scrollY > this._thresholdY ) {
			this.setState({
				shouldRender: true
			});
		}
	},

	shouldComponentUpdate(_, nextState) {
		return this.state.shouldRender !== nextState.shouldRender;
	},

	componentDidMount() {
		setTimeout(() => {
			let elem = ReactDom.findDOMNode(this);
			this._thresholdY = elem.getBoundingClientRect().top + document.body.scrollTop - document.documentElement.clientHeight - 100;
			if ( window.scrollY > this._thresholdY ) {
				this.setState({
					shouldRender: true
				});
			}
		}, 100);
	}
}