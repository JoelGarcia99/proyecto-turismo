import {useDispatch} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import ResponsiveInput from "../../components/inputs/responsiveInput"
import useCustomForm from "../../hooks/useCustomForm"
import {startRegister} from '../../redux/actions/auth/action.register';
import {useNavigate} from 'react-router-dom';
import {allRoutes} from '../../router/routes';

const Registro = () => {

	const dispatch = useDispatch();
	const navigator = useNavigate();
	const [data, setData] = useCustomForm({});

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(startRegister(data, ()=>navigator(allRoutes.login)));
	}

	return <div id="register-form" className="container mt-5 mb-5">
		<h1 className="text-xl font-bold text-center">Registro de usuario</h1>
		<hr />
		<form id="register-form" onSubmit={handleSubmit} className="px-2 py-4 shadow-md rounded-md" action="">
			<ResponsiveInput
				title="Nombre"
				name="name"
				value={data.name}
				onChange={setData}
				placeholder="Nombre"
			/>
			<ResponsiveInput
				title="Correo"
				name="email"
				onChange={setData}
				placeholder="alguien@admin.com"
				value={data.email}
			/>
			<ResponsiveInput
				title="Contraseña"
				value={data.password}
				name="password"
				onChange={setData}
				placeholder="Contraseña"
			/>

			<button 
				type="submit"
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
			>
				Registrarse
			</button>
		</form>
		<ToastContainer />
	</div>
}

export default Registro
