const NewsRoute = {
	path: '/news',

	getComponent(_, cb) {
		require.ensure([], (require) => {
			cb(null, require('./index').default);
		});
	}
};
export default NewsRoute