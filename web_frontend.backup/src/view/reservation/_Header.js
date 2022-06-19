import React from 'react';
import {useSelector} from 'react-redux';
import StatusTag, {allowed_states} from '../../modules/admin_dashboard/components/Reservation/StatusTag';

const _Header = ({onSave, isActive= true}) => {
	const {nombre, apellido} = useSelector(state=>state.auth.user);

	return (
		<div id="header-reservation" className="px-2 py-2 flex flex-1 w-full flex-row items-center text-sm">
			<StatusTag status={'state_draft'}/>&nbsp;
			{"Created by"}&nbsp;
			<span className="font-bold">{`${nombre} ${apellido}`}</span>
			<div className="flex w-full text-xl font-bold mx-5 flex-1 text-right justify-center">
				Creando nueva reserva
			</div>
			<button 
				className="disabled:opacity-75 disabled:cursor-not-allowed text-base btn bg-green-600 text-white rounded px-2 py-1 hover:bg-green-700"
				disabled={!isActive}
				onClick={(e)=>onSave(e)}
			>
				Guardar
			</button>
		</div>
	);
}

export default _Header
