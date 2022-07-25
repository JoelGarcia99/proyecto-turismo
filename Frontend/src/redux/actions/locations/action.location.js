import {toast} from "react-toastify";
import Swal from "sweetalert2";
import {customHTTPRequest} from "../../../helpers/helper.network";
import types from "../../types";

/**
 * uploads an image to the server
 * @param {File} image - the image to upload
 */
export const startUploadingImage = (
	id,
	image,
	isMainImage = true,
	isTypicalPlateImage=false,
	callback = () => {}
) => {
	return async (dispatch, state) => {
		const {token} = state().auth;

		let url = `${process.env.REACT_APP_NG_API_HOST}/api/manage/puntos-turisticos/${id}/upload-image`;

		// if it is not the main image then it means that it needs to be pushed with the already
		// loaded images
		url += `?is_main_image=${isMainImage? "true" : "false"}`;
		url += `&is_typical_plate_image=${isTypicalPlateImage? "true" : "false"}`;

		const formData = new FormData();
		formData.append('image', image);

		// Connecting with the server
		const res = await customHTTPRequest(dispatch, url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': null
			},
			body: formData
		}, true);

		// executing custom piece of code after registering
		if (res !== {}) {
			callback(res.image);
		}
	}
}

export const startFetchingReservables = (callback = (points) => {}) => {
	return async (dispatch, state) => {

		const {token} = state().auth;

		const res = await fetch(`${process.env.REACT_APP_NG_API_HOST}/api/puntos-turisticos/reservables`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'Authorization': `Bearer ${token}`
			}
		});

		const jsonRes = await res.json();

		if (res.status !== 200) {
			Swal.fire({
				title: "Ha ocurrido un error. Intente más tarde",
				icon: "error",
				text: jsonRes.message,
				onClose: () => Swal.close()
			})
		}
		else {
			Swal.close();
			dispatch(setReservables(jsonRes.data));
			// callback(jsonRes.data);
		}
	}
}

/**
 * Starts fetching a list of turistic points that are available to make
 * reservations on them
 */
export const startFetchingMaravillas = () => {
	return async (dispatch) => {

		const res = await customHTTPRequest(dispatch, `${process.env.REACT_APP_NG_API_HOST}/api/puntos-turisticos/maravillas`, {
		});

		if (res !== {}) {
			dispatch(setMaravillaData(res.data));
		}
	}
}

/**
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
export const startRegisteringLocation = (location, callback=()=>{}) => {
	return async (dispatch, state) => {

		// extracting authorization token
		const {token} = state().auth;

		const res = await customHTTPRequest(dispatch, `${process.env.REACT_APP_NG_API_HOST}/api/manage/punto-turistico/`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(location)
		}, true);

		if (res !== {}) {
			// custom piece of code
			callback(res.data);
		}
	}
}

/**
 * @param {object} location Is the object of the locatino with all the fields
 * @param {function} callback Is a function to execute a piece of code after this job is done
 */
export const startUpdatingLocation = (location, callback=()=>{}) => {
	return async (dispatch, state) => {

		const {token} = state().auth;

		const url = `${process.env.REACT_APP_NG_API_HOST}/api/manage/punto-turistico/${location._id}`;
		const res = await customHTTPRequest(dispatch, url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(location)
		}, true);

		// it means success
		if(res !== {}) {
			callback(res.data);
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
export const startDeletingPunto = (id, callback=()=>{}) => {
	return async (dispatch, state) => {

		const {token} = state().auth;

		const url = `${process.env.REACT_APP_NG_API_HOST}/api/manage/punto-turistico/${id}`;

		const response = await customHTTPRequest(dispatch, url, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		}, true);

		if(response !== {}) {
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
