import React from 'react';

const CommentedBox = ({createdBy, createdAt, content}) => {
	return (
		<div className="rounded shadow border-slate-600 px-2 py-2 my-3 w-full flex flex-col flex-1">
			<div id="head">
				<span className="font-bold text-sm">{createdBy}</span>
				<span className="font-normal text-sm">&nbsp;ha comentado</span>
				&nbsp;-&nbsp;
				<small className="font-light text-xs text-slate-400">
					{createdAt}
				</small>
			</div>
			<div id="body" className="my-4">
				{content}
			</div>
		</div>
	);
}

export default CommentedBox
