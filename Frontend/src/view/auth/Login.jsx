/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
	// ...
	plugins: [
	  // ...
	  require('@tailwindcss/forms'),
	],
  }
  ```
*/
import {LockClosedIcon} from '@heroicons/react/solid'
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import SpinLoader from '../../components/loader/SpinLoader';
import useCustomForm from '../../hooks/useCustomForm';
import {startLogin} from '../../redux/actions/auth/action.login';
import {allRoutes} from '../../router/routes';

import logo from '../../assets/logoFinal.png';
import mainImg from '../../assets/header/ROTONDA  LUCES.webp';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import CustomModal from '../../components/modal/component.modal';
import Registro from './Registro';

export default function LoginComponent() {

	const {logged} = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const navigator = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [showPass, setShowPass] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const [fields, setFields] = useCustomForm({
		email: '',
		password: ''
	});
	const handlelogin = (e) => {
		e.preventDefault();
		setIsLoading(true);
		dispatch(startLogin(fields.email, fields.password, () => setIsLoading(false)));
	}

	// If you successfully logged in, then redirect to home
	if (logged) {
		navigator(allRoutes.home);
		return <></>;
	}


	return (
		<div className="mx-auto shadow-md">
			<div
				className="min-h-full flex flex-row-reverse items-center justify-between"
			>

				<div
					className="hidden md:block bg-blue-500 flex-col justify-center items-center h-full w-full"
					style={{width: '50%', height: '100vh'}}
				>
					<img src={mainImg} alt=""
						className='mx-auto'
						style={{width: "100%", height: "100%", objectFit: "cover"}}
					/>
				</div>
				<div className="py-16 md:py-0 px-16 max-w-md mx-auto w-full space-y-8">
					<div>
						<img
							className="mx-auto h-12 w-auto"
							style={{width: "8rem", height: "8rem"}}
							src={logo}
							alt="Workflow"
						/>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Ingresa a tu cuenta
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							No tienes cuenta?
							<a  
								onClick={() => setShowModal(true)}
								className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500"
							>
								&nbsp;Crea una nueva.
							</a>
						</p>
					</div>
					<form className="mt-8 space-y-6" onSubmit={handlelogin}>
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label htmlFor="email-address" className="sr-only">
									Correo
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									onChange={setFields}
									value={fields?.value}
									autoComplete="email"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Email address"
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">
									Contraseña
								</label>
								<div className="relative">
									<input
										id="password"
										name="password"
										onChange={setFields}
										value={fields?.value}
										type={showPass ? 'text' : 'password'}
										autoComplete="current-password"
										required
										className="appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder="Password"
									/>
									<button
										className="absolute z-10 float-right"
										style={{right: "10px", top: "10px"}}
										onClick={(e) => {
											e.preventDefault();
											setShowPass(!showPass)
										}}
									>
										<FontAwesomeIcon
											icon={showPass ? faEye : faEyeSlash}
										/>
									</button>
								</div>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">

							</div>

							<div className="text-sm">
								<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
									Olvidaste tu contraseña?
								</a>
							</div>
						</div>

						<button 
							type="submit"
							className='bg-blue-500 hover:bg-blue-600 w-content cursor-pointer rounded-md px-4 py-2 flex flex-row shadow hover:shadow-md justify-center'>
							<LockClosedIcon className="text-white h-5 w-5 text-indigo-500 group-hover:text-white" aria-hidden="true" />
							&nbsp;
							<span className="text-white font-semibold">
							Iniciar sesión
							</span>
						</button>
					</form>
					<CustomModal
						isOpen={showModal}
						content={<Registro />}
						onClose={() => {setShowModal(false)}}
					/>
				</div>
			</div>
		</div>
	)
}
