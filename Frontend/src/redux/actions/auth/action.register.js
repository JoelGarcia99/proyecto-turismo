import Swal from "sweetalert2";
import types from "../../types";

export const startRegister = (email, password, nombre, apellido,cedula_pas, telefono)=>{
  return async(dispatch)=>{
    var urlencoded = new URLSearchParams();
    urlencoded.append("nombre", nombre);
    urlencoded.append("apellido", apellido);
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    urlencoded.append("cedula_pas", cedula_pas);
    urlencoded.append("telefono", telefono);
    
    var requestOptions = {
    method: 'POST',
    body: urlencoded,
    };

    const res = await fetch(`${process.env.REACT_APP_API_HOST}/user/register`, requestOptions)

    const jsonRes = await res.json();

    if(res.status !== 200) {
      Swal.fire({
        title: "No se pudo Registrar",
        icon: "error",
        text: JSON.stringify(jsonRes.error),
        onClose: ()=>Swal.close()
      });
    }
    else{

      Swal.close();
      window.location.href = `${process.env.REACT_APP_HOST}/login`;
      dispatch( setRegisterDatos() );
    }
  }
}

export const setRegisterDatos = ()=>({
  type: types.register,
  payload: {
    
  }
});

