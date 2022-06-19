import Swal from "sweetalert2";
import types from "../../types";

/**
 * Fetchs a list of all the guides whereas they're active or not.
 * It's only used for admin panel.
 * @param forManage {boolean} Put it false if normal user can access
 **/
export const startFetchingGuides = (forManage=true, callback=()=>{})=>{
  return async(dispatch, state)=>{

    // token for session autorization
    const {token} = state().auth;

    const res = await fetch(`${process.env.REACT_APP_API_HOST}${forManage?"/manage":""}/guides`, {
      method: 'GET',
      headers: {
	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	'auth': token
      },
    });

    const jsonRes = await res.json();

    if(res.status !== 200) {
      await Swal.fire({
        title: jsonRes?.message,
        icon: "error",
        text: jsonRes?.error,
        onClose: ()=>Swal.close()
      });
      return;
    }
	callback()
    dispatch(setGuidemen(jsonRes.guides, '', 0)); 
  }
}

/**
 * Fetchs a list of all the guides whereas they're active or not.
 * It's only used for admin panel.
 * @param forManage {boolean} Put it false if normal user can access
 **/
export const startFetchingGuidesByPoint = (id, callback=(points)=>{})=>{
  return async(dispatch, state)=>{

    // token for session autorization
    const {token} = state().auth;

    const res = await fetch(`${process.env.REACT_APP_API_HOST}/touristic-point/guides/${id}`, {
      method: 'GET',
      headers: {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'auth': token
      },
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
	callback(jsonRes.guides);
    dispatch(setGuidemen(jsonRes.guides, '', 0)); 
  }
}
/**
  * Starts registering a new guide in DB.  
  *
  * @param guide {object} is all the data of the guide. If it's an update the ID is required.  
  * @param isUpdate {boolean} if this should update the user or not.  
  * @param callback {function} a piece of code to execute if this ends properly
  **/
export const startRegisteringGuide = (guide, isUpdate=false, callback=()=>{})=>{
  return async(_, state)=>{

    console.log(isUpdate)
    const {token} = state().auth;

    let url = `${process.env.REACT_APP_API_HOST}/guide/`;

    // If it's an update process then the ID is required
    if(isUpdate) {
      if(!guide._id) {
	await Swal.fire({
	  title: "Error de proceso",
	  icon: "error",
	  text: "El id del guía es requerido para actualizarlo",
	  onClose: ()=>Swal.close()
	});
	return;
      }
      url += `${guide._id}`;
    }

    const res = await fetch(url, {
      method: isUpdate?'PUT':'POST',
      headers: {
	'Content-Type': 'application/json;charset=utf-8',
	'auth': token
      },
      body: JSON.stringify(guide)
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
};

/**
 *
 * Permanently removes a guide from DB, this cannot be undo.
 *
 * @param id {string} the ID of the guide to delete
 * @param callback {function} a piece of code to execute if this succeed
 */
export const startDeletingGuide = (id, callback=()=>{})=>{
  return async(_, state)=>{
    const {token} = state().auth;
  
    let url = `${process.env.REACT_APP_API_HOST}/guide/${id}`;

    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
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

export const setGuidemen = (guidemen, range, currentPage)=>({
  type: types.fetchGuidemen,
  currentPage, 
  message: range,
  payload: guidemen
});
