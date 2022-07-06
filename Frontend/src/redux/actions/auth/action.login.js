import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {allRoutes} from "../../../router/routes";
import types from "../../types";

export const startLogin = (email, password, callback=()=>{}) => {
	return async (dispatch) => {

		const res = await fetch(`${process.env.REACT_APP_NG_API_HOST}/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({email, password}),
		});

		// Server response
		const jsonRes = await res.json();

		if (res.status !== 200) {
			Swal.fire({
				title: "No se pudo iniciar sesión",
				icon: "error",
				text: jsonRes.message,
				onClose: () => Swal.close()
			});
		}
		else {

			localStorage.setItem("proyecto_turismo-token", jsonRes.access_token);
			localStorage.setItem("proyecto_turismo-user", JSON.stringify(jsonRes.user));

			Swal.close();
			// window.location.href = "http://localhost:3000/home";
			dispatch(setLoginData(jsonRes.user, jsonRes.token));
		}

		callback();
	}
}

export const setLoginData = (userData, token) => ({
	type: types.login,
	payload: {
		token,
		user: userData
	}
});

