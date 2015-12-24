const CommentRoute = {
	path: 'comment/:id',

	getComponent(_, cb) {
		require.ensure([], (require) => {
			cb(null, require('./index').default);
		});
	}
};
export default CommentRoute