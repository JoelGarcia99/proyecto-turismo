import Swal from "sweetalert2";

export const startSavingReservation = (reservation, callback=()=>{}) => {
	return async(_, state)=>{
		const {token} = state().auth;

		console.log(JSON.stringify(reservation));
		const response = await fetch(`${process.env.REACT_APP_API_HOST}/reservation`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				auth: token
			},
			body: JSON.stringify(reservation)
		});

		const jsonRes = await response.json();

		if(response.status !== 200) {
			Swal.fire({
				title: jsonRes.message,
				text: jsonRes?.error,
				type: 'error'
			});
			return;
		}

		// If everything is OK
		callback();

		Swal.fire({
			title: 'Reserva guardada',
			text: jsonRes.message
		});
	}
}
