import Swal from "sweetalert2";
import {customHTTPRequest} from "../../../helpers/helper.network";
import types from "../../types";

export const startFetchingReservables = (callback = (points) => {}) => {
	return async (dispatch, state) => {

		const {token} = state().auth;

		const res = await fetch(`${process.env.REACT_APP_API_HOST}/puntos-turisticos/reservables`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'auth': token
			}
		});

		const jsonRes = await res.json();

		if (res.status !== 200) {
			Swal.fire({
				title: "Ha ocurrido un error. Intente más tarde",
				icon: "error",
				text: jsonRes.message,
				onClose: () => Swal.close()
			});
		}
		else {
			Swal.close();
			dispatch(setReservables(jsonRes.puntos));
			callback(jsonRes.puntos);
		}
	}
}

/**
 * Starts fetching a list of turistic points that are available to make
 * reservations on them
 */
export const startFetchingMaravillas = () => {
	return async (dispatch) => {

		const res = await fetch(`${process.env.REACT_APP_API_HOST}/punto-turistico/maravillas`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			}
		});

		const jsonRes = await res.json();

		if (res.status !== 200) {
			Swal.fire({
				title: "Ha ocurrido un error. Intente más tarde",
				icon: "error",
				text: jsonRes.message,
				onClose: () => Swal.close()
			});
		}
		else {
			Swal.close();
			dispatch(setMaravillaData(jsonRes.puntos));
		}
	}
}

/**
 *
 * Starts fetching all the touristic points
 */
export const startFetchingAllTP = () => {

	//TODO: fix pagination
	return async (dispatch, state) => {

		const {token} = state().auth;

		const res = await customHTTPRequest(dispatch, `${process.env.REACT_APP_NG_API_HOST}/api/manage/puntos-turisticos/`, {
			headers: {
				'Authorization': `Bearer ${token}`,
			}
		});

		//TODO: remove non used params
		dispatch(setLocationsData(res.data, 0, 0));
	}
}

/**
 * @param {object} location Is the object of the locatino with all the fields
 * @param {function} callback Is a function to execute a piece of code after this job is done
 */
export const startRegisteringLocation = (location, callback) => {
	return async (_, state) => {

		const {token} = state().auth;

		const res = await fetch(`${process.env.REACT_APP_API_HOST}/punto-turistico`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'auth': token
			},
			body: JSON.stringify(location)
		});

		const jsonRes = await res.json();

		if (res.status !== 200) {
			await Swal.fire({
				title: "Ha ocurrido un error. Intente más tarde",
				icon: "error",
				text: jsonRes.error.sqlMessage,
				onClose: () => Swal.close()
			});
			return;
		}
		else {
			await Swal.fire({
				title: "Proceso exitoso",
				icon: "success",
				text: jsonRes.message,
				onClose: () => Swal.close()
			});

			// dispatch(setNewLocation(jsonRes.punto_turistico));
			callback();

		}
	}
};

/**
 * @param {object} location Is the object of the locatino with all the fields
 * @param {function} callback Is a function to execute a piece of code after this job is done
 */
export const startUpdatingLocation = (location, callback) => {
	return async (_, state) => {

		const {token} = state().auth;

		const res = await fetch(`${process.env.REACT_APP_API_HOST}/punto-turistico/${location._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'auth': token
			},
			body: JSON.stringify(location)
		});

		const jsonRes = await res.json();

		if (res.status !== 200) {
			await Swal.fire({
				title: "Ha ocurrido un error. Intente más tarde",
				icon: "error",
				text: jsonRes.error.sqlMessage,
				onClose: () => Swal.close()
			});
			return;
		}
		else {
			await Swal.fire({
				title: "Proceso exitoso",
				icon: "success",
				text: jsonRes.message,
				onClose: () => Swal.close()
			});

			// dispatch(setNewLocation(jsonRes.punto_turistico));
			callback();

		}
	}
}

/**
 * Permanently deletes a turistic point.  
 *
 * @param id {string} ID of the turistic point to remove
 * @param callback {function} To execute if this ends properly
 *
 **/
export const startDeletingPunto = (id, callback) => {
	return async (_, state) => {

		const {token} = state().auth;

		const res = await fetch(`${process.env.REACT_APP_API_HOST}/punto-turistico/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'auth': token
			},
		});

		const jsonRes = await res.json();

		if (res.status !== 200) {
			await Swal.fire({
				title: "Ha ocurrido un error. Intente más tarde",
				icon: "error",
				text: jsonRes.error,
				onClose: () => Swal.close()
			});
			return;
		}
		else {
			await Swal.fire({
				title: "Proceso exitoso",
				icon: "success",
				text: jsonRes.message,
				onClose: () => Swal.close()
			});

			// dispatch(setNewLocation(jsonRes.punto_turistico));
			callback();

		}
	}
}


export const setNewLocation = (location) => ({
	type: types.saveLocation,
	payload: location
});

export const setLocationsData = (locations, rango, page) => ({
	type: types.fetchLocation,
	page: page,
	message: rango,
	payload: locations
});

export const setMaravillaData = (maravillas) => ({
	type: types.fetchMaravillas,
	payload: maravillas
});

export const setReservables = (locations) => ({
	type: types.fetchReservables,
	payload: locations
})

export const setCurrent = (current) => ({
	type: types.setCurrent,
	payload: current
})
