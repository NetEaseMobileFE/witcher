const SpeechRoute = {
	path: '/speech',

	getComponent(_, cb) {
		require.ensure([], (require) => {
			cb(null, require('./index').default);
		});
	}
};
export default SpeechRoute