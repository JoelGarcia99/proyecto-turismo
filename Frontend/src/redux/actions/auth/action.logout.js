import types from '../../types';

export const startLogout = ()=>{
  return (dispatch)=>{
    
    localStorage.removeItem("proyecto_turismo-token");
    localStorage.removeItem("proyecto_turismo-user");
    dispatch( setLogout() );

	window.location = '/login';
  }
}

export const setLogout = ()=>({
  type: types.logout
})
  
