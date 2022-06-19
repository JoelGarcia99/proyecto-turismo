import Swal from "sweetalert2";
import types from "../../types";

export const startFetchingCategories = ()=>{
  return async(dispatch, state)=>{

    // token for session autorization
    const {token} = state().auth;


    const res = await fetch(`${process.env.REACT_APP_API_HOST}/categories`, {
      method: 'GET',
      headers: {
	'Content-Type': 'application/json;charset=utf-8',
	'auth': token
      },
    });

    const jsonRes = await res.json();

    if(res.status !== 200) {
      await Swal.fire({
        title: "Ha ocurrido un error. Intente más tarde",
        icon: "error",
        text: jsonRes?.error.sqlMessage || jsonRes.message,
        onClose: ()=>Swal.close()
      });
      return;
    }

    //TODO: remove second and third parameters if it's no longer required
    dispatch(setcategories(jsonRes.categories, null, null)); 
  }
}

/**
 * Starts adding a new category for any object
 *
 * @param category {object} the object of the category
 * @param isUpdate {boolean}  If true, then an ID should be provided in [category]
 * @param callback {function} if you want to execute some behavior after this ends
 * */
export const startRegisteringCategory = (category, isUpdate=false, callback=()=>{})=>{
  return async(_, state)=>{

    const {token} = state().auth;

    let target_url = `${process.env.REACT_APP_API_HOST}/category/`;

    if(isUpdate) {
      target_url += category._id;
    }

    const res = await fetch(target_url, {
      method: isUpdate? 'PUT':'POST',
      headers: {
	'Content-Type': 'application/json;charset=utf-8',
	'auth': token
      },
      body: JSON.stringify(category)
    });

    const jsonRes = await res.json();

    if(res.status !== 200) {
      await Swal.fire({
        title: jsonRes.message,
        icon: "error",
        text: jsonRes.error,
        onClose: ()=>Swal.close()
      });
      return;
    }
    else{
      Swal.fire({
        title: "Proceso exitoso",
        icon: "success",
        text: jsonRes.message,
      });

      callback();
    }
  }
};

/**
 *
 * Permanently removes a category from DB, this cannot be undo.
 *
 * @param id {string} the ID of the category to delete
 * @param callback {function} a piece of code to execute if this succeed
 */
export const startDeletingCategory = (id, callback=()=>{})=>{
  return async(_, state)=>{
    const {token} = state().auth;
  
    let url = `${process.env.REACT_APP_API_HOST}/category/${id}`;

    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
	'Content-Type': 'application/json;charset=utf-8',
	'auth': token
      },
    });

    const jsonRes = await res.json();

    if(res.status !== 200) {
      await Swal.fire({
        title: "Ha ocurrido un error. Intente más tarde",
        icon: "error",
        text: jsonRes.error,
        onClose: ()=>Swal.close()
      });
      return;

    }
    else{
      Swal.fire({
        title: "Proceso exitoso",
        icon: "success",
        text: jsonRes.message,
	onClose: ()=>{
	  Swal.close();
	}
      });
      // executing custom piece of code after registering
      callback();
    }
  }
}

export const setcategories = (categories, range, currentPage)=>({
  type: types.fetchCategories,
  currentPage, 
  message: range,
  payload: categories 
});
