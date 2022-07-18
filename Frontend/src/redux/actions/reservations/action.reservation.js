import {customHTTPRequest} from "../../../helpers/helper.network";

export const startSavingReservation = (reservation, callback = () => {}) => {
	return async (dispatch, state) => {

		// adding user ID to the reservation
		const {id: author_id} = state().auth.user;
		const {token} = state().auth;

		const response = await customHTTPRequest(dispatch, process.env.REACT_APP_NG_API_HOST + "/api/reservation/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${token}`,
			},
			body: JSON.stringify({author_id: author_id?.toString(), ...reservation}),
		}, true);

		if(response?.data) {
			callback(response.data);
		}
	}
}
