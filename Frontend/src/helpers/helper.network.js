import Swal from "sweetalert2";
import {startLogout} from "../redux/actions/auth/action.logout";


/**
 * Creates a fetch for a custom HTTP request
 */
export const customHTTPRequest = async (dispatch, url, params = {}) => {

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
	if (res.status !== 200) {
		await Swal.fire({
			title: "Ha ocurrido un error. Intente más tarde",
			icon: "error",
			text: jsonRes.message,
			onClose: () => Swal.close()
		});
		return {};
	}

	if(res.status === 400) {
		//TODO: replace it with 404 page
		await Swal.fire({
			title: "Ha ocurrido un error. Intente más tarde",
			icon: "error",
			text: jsonRes.message,
			onClose: () => Swal.close()
		});
		return {};
	}

	return jsonRes;
}

