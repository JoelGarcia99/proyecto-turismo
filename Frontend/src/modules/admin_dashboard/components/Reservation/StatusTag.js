import React from 'react';

export const allowed_states = {
  state_pending: 'Pendiente',
  state_draft: 'Borrador',
  state_in_review: 'En revisión',
  state_passed: 'Aprobado',
  state_refused: 'Rechazado'
};

const StatusTag = ({status}) => {

	let bgColor = null;
	let textColor = null;

	switch(status) {
		case allowed_states.state_pending:
			bgColor = 'bg-slate-400';
			textColor = 'text-white';
			break;
		case allowed_states.state_draft:
			bgColor = 'bg-amber-200';
			textColor = 'text-black';
			break;
		case allowed_states.state_in_review:
			bgColor = 'bg-blue-200';
			textColor = 'text-white';
			break;
		case allowed_states.state_passed:
			bgColor = 'bg-green-200';
			textColor = 'text-white';
			break;
		case allowed_states.state_refused:
			bgColor = 'bg-red-200';
			textColor = 'text-white';
			break;
		default:
			bgColor = 'bg-gray-200';
			textColor = 'text-black';
			break;
	}

	console.log(status)
	return (
		<div className={`px-3 py-1 rounded ${bgColor} ${textColor}`}>
			{allowed_states[status]}
		</div>
	);
}

export default StatusTag
