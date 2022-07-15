import {customHTTPRequest} from "../../../helpers/helper.network";

export const startRegister = (data, callback) => {
	return async (dispatch) => {

		const url = `${process.env.REACT_APP_NG_API_HOST}/api/auth/register`;
		const response = await customHTTPRequest(dispatch, url, {
			method: "POST",
			body: JSON.stringify(data)
		}, true);

		if(response !== {}) {
			callback();
		}
	}
}
