import React from 'react';
import CommentedBox from '../../modules/admin_dashboard/components/Comments/CommentedBox';

const Comments = ({collection, canEdit=true}) => {
	//TODO: add comments
	
	return <>
		<div id="reservation-foot" className="my-4 bg-gray-100 flex flex-1 py-2 w-2/3 px-4 font-bold">
			<span>Lista de comentarios</span>
		</div>
		<div className="flex flex-col justify-start items-center w-2/3">
			<CommentedBox
				createdBy={"Joel Garcia"}
				createdAt={"2020-01-01"}
				content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Nulla facilisi. Donec sed odio"}
			/>
		</div>
	</>;
}

export default Comments
