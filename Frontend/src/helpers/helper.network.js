import Swal from "sweetalert2";
import {startLogout} from "../redux/actions/auth/action.logout";


/**
 * Creates a fetch for a custom HTTP request
 *
 * @param {function} dispatch - The redux dispatch function
 * @param {string} url - The URL to fetch
 * @param {object} params - the request parameters
 * @param {boolean} showSuccessAlert - Whether to show a success alert
 */
export const customHTTPRequest = async (
	dispatch,
	url,
	params = {},
	showSuccessAlert = false
) => {

	const res = await fetch(url, {
		method: 'GET',
		...params,
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			...params?.headers ?? {}
		},
	});

	const jsonRes = await res.json();

	// If 401 then it means user is not authenticated and a page should be
	// showed to allow him/she to log in
	if (res.status === 401) {
		// cleaning local storage
		dispatch(startLogout());

		return {};
	}

	if (res.status === 400 || res.status === 422) {
		//TODO: replace it with 404 page
		await Swal.fire({
			title: "Ha ocurrido un error. Intente más tarde",
			icon: "error",
			text: jsonRes.message,
			onClose: () => Swal.close()
		});

		return {};
	}

	if (showSuccessAlert) {
		await Swal.fire({
			title: "Operación exitosa",
			icon: "success",
			text: jsonRes.message,
			onClose: () => Swal.close()
		});
	}

	return jsonRes;
}

