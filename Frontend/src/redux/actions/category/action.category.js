import Swal from "sweetalert2";
import {customHTTPRequest} from "../../../helpers/helper.network";
import types from "../../types";

export const startFetchingCategories = () => {
	return async (dispatch, state) => {

		// token for session autorization
		const {token} = state().auth;

		// This helper already handle all the actions such as redirections & show alerts to the user if needed
		const jsonRes = await customHTTPRequest(dispatch, `${process.env.REACT_APP_NG_API_HOST}/api/manage/categories`, {
			headers: {
				'Authorization': `Bearer ${token}`
			},
		});

		//TODO: remove second and third parameters if it's no longer required
		dispatch(setcategories(jsonRes.data, null, null));
	}
}

/**
 * Starts adding a new category for any object
 *
 * @param category {object} the object of the category
 * @param isUpdate {boolean}  If true, then an ID should be provided in [category]
 * @param callback {function} if you want to execute some behavior after this ends
 * */
export const startRegisteringCategory = (category, isUpdate = false, callback = () => {}) => {
	return async (dispatch, state) => {

		const {token} = state().auth;

		let target_url = `${process.env.REACT_APP_NG_API_HOST}/api/manage/category/`;

		if (isUpdate) {
			target_url += category._id;
		}

		// Register/update a new category
		await customHTTPRequest(dispatch, target_url, {
			method: isUpdate ? 'PUT' : 'POST',
			headers: {
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(category)
		});

		// a callback if the reponse is success
		callback();
	}
};

/**
 *
 * Permanently removes a category from DB, this cannot be undo.
 *
 * @param id {string} the ID of the category to delete
 * @param callback {function} a piece of code to execute if this succeed
 */
export const startDeletingCategory = (id, callback = () => {}) => {
	return async (dispatch, state) => {
		const {token} = state().auth;

		let url = `${process.env.REACT_APP_NG_API_HOST}/api/manage/category/${id}`;

		await customHTTPRequest(dispatch, url, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${token}`
			},
		});

		// executing custom piece of code after registering
		callback();
	}
}

export const setcategories = (categories, range, currentPage) => ({
	type: types.fetchCategories,
	currentPage,
	message: range,
	payload: categories
});
