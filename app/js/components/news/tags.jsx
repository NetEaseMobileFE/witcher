import React from 'react';

// 0跟帖 不显示

let Tag = (props) => {
	return (
		<span className={'tag ' + props.classNames}>{props.content}<i>{props.suffix}</i></span>
	)
};

let shot = num => {
	return num > 9999 ? Math.round(num*10/10000) / 10 + '万': num;
};

export default (props) => {
	var tags = [];

	if ( props.skipType == 'special' ) {
		tags.push({
			classNames: 'tag--common tag--common--red',
			content: '专题'
		});
	} else if ( props.live_info && props.live_info.user_count ) {
		tags.push({
			classNames: 'tag--comments',
			content: shot(props.live_info.user_count),
			suffix: '参与'
		});
	} else if ( props.replyCount ) {
		tags.push({
			classNames: 'tag--comments',
			content: shot(props.replyCount),
			suffix: '跟贴'
		});
	}

	if ( props.TAG == '视频' ) {
		tags.push({
			classNames: 'tag--video'
		});
	} else if ( props.TAG == '正在直播' || props.TAG == '独家' ) {
		tags.push({
			classNames: 'tag--common',
			content: props.TAG
		});
	}

	return (
		<div className={props.classNames}>
			{
				tags.map((tag, i) => {
					return <Tag key={i} {...tag}/>;
				})
			}
		</div>
	);
};