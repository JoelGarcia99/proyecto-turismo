import types from '../../types';

export const startLogout = ()=>{
  return (dispatch)=>{
    
	window.location = '/login';

    localStorage.removeItem("proyecto_turismo-token");
    localStorage.removeItem("proyecto_turismo-user");
    dispatch( setLogout() );

  }
}

export const setLogout = ()=>({
  type: types.logout
})
  
