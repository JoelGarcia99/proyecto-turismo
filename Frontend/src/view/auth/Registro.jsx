import Alerta from '../../components/alerta/Alerta'
import { useDispatch } from 'react-redux'
import { startRegister } from '../../redux/actions/auth/action.register'
import useCustomForm from '../../hooks/useCustomForm'


const Registro = () => {

//   const nuevoTuristaSchema = Yup.object().shape({
//     nombre: Yup.string().min(3,'El Nombre es muy corto')
//                         .max(20,'El Nombre es muy largo').matches(RegExp('^[a-zA-Záéíóú ]+$'),'El nombre solo puede tener letras')
//                         .required('El Nombre es Obligatorio'),
//     apellido: Yup.string().min(3,'El Apellido es muy corto')
//                         .max(20,'El Apellido es muy largo').matches(RegExp('^[a-zA-Záéíóú ]+$'),'El apellido solo puede tener letras')
//                         .required('El Apellido es Obligatorio'),
//     email: Yup.string()
//             .email('Email no valido')
//             .required('El Email es Obligatorio'),
//     telefono: Yup.string().matches(RegExp('^0[0-9]{8,9}$'),'Telefono incorrecto'),
//           
//     password: Yup.string()
//               .password()
//               .minNumbers(1,'La contraseña debe contener al menos un Número')
//               .minUppercase(1, 'La contraseña debe contener al menos una letra mayúscula')
//               .minSymbols(1, 'La contraseña debe contener al menos un Simbolo') 
//               .min(8,'La contraseña debe tener al menos 8 caracteres')
//               .required('La Contraseña es Obligatoria'),
//     
//     password2: Yup.string()
//               .password()
//               .minNumbers(1,'La contraseña debe contener al menos un Número')
//               .minUppercase(1, 'La contraseña debe contener al menos una letra mayúscula')
//               .minSymbols(1, 'La contraseña debe contener al menos un Simbolo') 
//               .min(8,'La contraseña debe tener al menos 8 caracteres')
//               .required('La Contraseña es Obligatoria'),
//     cedula_pas: Yup.string()
//                     .min(10,'Cédula o Pasaporte Incorrecta')
//                     .max(10,'Cédula o Pasaporte Incorrecta')
//                     .required('La Cédula o Pasaporte es Obligatorio'),
// })

  const dispatch = useDispatch();
  
  const errors = {};
  const touched = {};
  const [values, handleChange, _] = useCustomForm({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    cedula_pas: '',
    telefono: ''
  });

  const handleRegisterEvent = (e) =>{
    e.preventDefault();
    dispatch(startRegister(values.email, values.password, values.nombre, values.apellido,values.cedula_pas, values.telefono));
  }

  return (
    
    <div className='contenedor'>
        <form onSubmit={handleRegisterEvent}>
          <div className='contenedor-registro'>
          <h1>Registrate</h1>
          <div>
            <label htmlFor="nombre">Nombres:</label>
            <input
	      onChange={handleChange}
	      value={values.nombre}
              id='nombre'
              type="text"
              placeholder='Ingrese su Nombre'
              name='nombre'
            />
            {errors.nombre && touched.nombre ? (
                        <Alerta>{errors.nombre}</Alerta>
                    ): null}
          </div>
          <div>
            <label htmlFor="apellido">Apellidos:</label>
            <input
	      onChange={handleChange}
	      value={values.apellido}
              id='apellido'
              type="text"
              placeholder='Ingrese su Apellido'
              name='apellido'
            />
            {errors.apellido && touched.apellido ? (
                        <Alerta>{errors.apellido}</Alerta>
                    ): null}
          </div>
          <div>
          <label 
           htmlFor='cedula_pas'>Cédula o Pasaporte:</label>
            <input 
	      onChange={handleChange}
	      value={values.cedula_pas}
                id='cedula_pas'
                type="tel"
                placeholder='Ingrese Cédula o Pasaporte'
                name='cedula_pas'
            />
            {errors.cedula_pas && touched.cedula_pas ? (
              <Alerta>{errors.cedula_pas}</Alerta>
            ): null}          
          </div>
          <div>
            <label htmlFor="email">Correo:</label>
            <input
	      onChange={handleChange}
	      value={values.email}
              id='email'
              type="email"
              placeholder='Ingrese su Correo Electrónico'
              name='email'
            />
            {errors.email && touched.email ? (
                        <Alerta>{errors.email}</Alerta>
                    ): null}
          </div>
          <div>
          <label 
           htmlFor='telefono'>Telefono:</label>
            <input 
	      onChange={handleChange}
		value={values.telefono}
                id='telefono'
                type="tel"
                placeholder='Ingrese su Número de Teléfono'
                name='telefono'
            />
            {errors.telefono && touched.telefono ? (
              <Alerta>{errors.telefono}</Alerta>
            ): null}          
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
	      onChange={handleChange}
	      value={values.password}
              id='password'
              type="password"
              placeholder='Ingrese su Contraseña'
              name='password'
            />
            {errors.password && touched.password ? (
                        <Alerta>{errors.password}</Alerta>
                    ): null}
          </div>
          
          <div>
            <label htmlFor="password2">Confirmar Contraseña:</label>
            <input
              id='password2'
              type="password"
              placeholder='Repita su Contraseña'
              name='password2'
            />

          </div>

          <button className='boton' type="submit" title="Ingresar" name="Ingresar">Ingresar</button>
          </div>
        </form>
    </div>
  )
}

export default Registro
