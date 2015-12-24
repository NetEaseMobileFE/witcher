const HonorRoute = {
	path: '/honor',

	getComponent(_, cb) {
		require.ensure([], (require) => {
			cb(null, require('./index').default);
		});
	}
};
export default HonorRoute