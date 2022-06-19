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
import { LockClosedIcon } from '@heroicons/react/solid'
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import useCustomForm from '../../hooks/useCustomForm';
import {startLogin} from '../../redux/actions/auth/action.login';
import {allRoutes} from '../../router/routes';

export default function LoginComponent() {

  const {logged} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [fields, setFields] = useCustomForm({
      email: '',
      password: ''
  });
  const handlelogin = (e) => {
      e.preventDefault();
      dispatch( startLogin(fields.email, fields.password) );
  }

  // If you successfully logged in, then redirect to home
  if(logged) {
      navigator(allRoutes.home);
      return <></>;
  }

  return (
    <div className="container mx-auto shadow-md my-9">
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
	      Ingresa a tu cuenta
	    </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
	      No tienes cuenta? 
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
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
                <input
                  id="password"
                  name="password"
		  onChange={setFields}
		  value={fields?.value}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
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

            <div>
              <button
                type="submit"
		className="group relative w-full flex justify-center py-2 px-4 border border-2 text-sm font-medium rounded-md text-black hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
		  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-white" aria-hidden="true" />
                </span>
		Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
