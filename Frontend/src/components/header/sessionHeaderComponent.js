/* This example requires Tailwind CSS v2.0+ */
import {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {BellIcon, MenuIcon, XIcon} from '@heroicons/react/outline'
import {allRoutes} from '../../router/routes'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {startLogout} from '../../redux/actions/auth/action.logout'

import logoFinal from "../../assets/logoFinal.png";
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const SessionHeaderComponent = ({currentRoute = allRoutes.home, setShowSidebar, fullWidth = false, fixed = false}) => {
	// hooks 
	const dispatch = useDispatch();
	const {user: db_user} = useSelector(state => state.auth);

	const userNavigation = [
		{name: 'Mi cuenta', route: '#'},
		{name: 'Ajustes', route: '#'},
		{name: 'Cerrar sesión', route: '#', action: () => dispatch(startLogout())},

	]
	// Hook definitions

	const navigation = [
		{name: 'Inicio', route: allRoutes.home, current: currentRoute === allRoutes.home},
		{
			name: 'Puntos turísticos',
			route: allRoutes.puntos_turis,
			current: currentRoute === allRoutes.puntos_turis
		},
		{name: 'Reservas', route: allRoutes.reservation, current: currentRoute === allRoutes.reservation},
		db_user?.role === "admin" && {
			name: 'Panel administrativo',
			route: allRoutes.dashboard,
			current: currentRoute === allRoutes.manage
		}
	]

	// Only basic data is needed
	const user = {
		name: db_user.name,
		email: db_user.email,
		imageUrl:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	}


	return (
		<>
			<div className="flex flex-row justify-between z-50 relative fixed">
				<div id="logo" className="flex px-2 md:px-0 md:flex-1 justify-start">
					<img src={logoFinal} className="mx-auto py-0.5" alt="" style={{height: "5rem"}} />
				</div>
				<div className={`z-10 ${fullWidth ? "w-full" : "w-min md:w-10/12 xl:w-9/12 min-h-full"} ${fixed ? "fixed top-0" : ""} float-right`}>
					<Disclosure as="nav" className={`bg-green-800 py-3 ${fullWidth ? "" : "rounded-bl-3xl"}`}>
						{({open}) => (
							<>
								<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
									<div className="flex items-center justify-between h-16">
										<div className="flex items-center">
											<div className="hidden md:block">
												<div className="ml-10 flex items-baseline space-x-4">
													{navigation.map((item, index) => (
														<NavLink
															key={index}
															to={item.route ?? '#'}
															className={classNames(
																item.current
																	? 'bg-green-900 text-white'
																	: 'text-green-300 hover:bg-green-700 hover:text-white',
																'px-3 py-2 rounded-md text-sm font-medium'
															)}
															aria-current={item.current ? 'page' : undefined}
														>
															{item.name}
														</NavLink>
													))}
												</div>
											</div>
										</div>

										{/* Responsive menu */}
										<div className="hidden md:block">
											<div className="ml-4 flex items-center md:ml-6">
												<button
													type="button"
													className="bg-green-800 p-1 rounded-full text-green-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white"
												>
													<span className="sr-only">View notifications</span>
													<BellIcon className="h-6 w-6" aria-hidden="true" />
												</button>

												<div id="user-name" className="text-white font-light">
													{db_user.name}
												</div>
												{/* Profile dropdown */}
												<Menu as="div" className="z-20 ml-3 relative">
													<div>
														<Menu.Button className="max-w-xs bg-green-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white">
															<span className="sr-only">Open user menu</span>
															<img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
														</Menu.Button>
													</div>
													<Transition
														as={Fragment}
														enter="transition ease-out duration-100"
														enterFrom="transform opacity-0 scale-95"
														enterTo="transform opacity-100 scale-100"
														leave="transition ease-in duration-75"
														leaveFrom="transform opacity-100 scale-100"
														leaveTo="transform opacity-0 scale-95"
													>
														<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
															{userNavigation.map((item, index) => (
																<Menu.Item key={index}>
																	{({active}) => (
																		item.action ?
																			<a className={classNames(
																				active ? 'bg-green-100' : '',
																				'block px-4 py-2 text-sm text-green-700 cursor-pointer'
																			)} onClick={item.action}>{item.name}</a>

																			: <NavLink
																				to={item?.route ?? '#'}
																				className={classNames(
																					active ? 'bg-green-100' : '',
																					'block px-4 py-2 text-sm text-green-700'
																				)}
																			>
																				{item.name}
																			</NavLink>
																	)}
																</Menu.Item>
															))}
														</Menu.Items>
													</Transition>
												</Menu>
											</div>
										</div>
										<div className="w-full -mr-2 flex flex-row justify-between md:hidden">
											{
												setShowSidebar && <Button
													color="transparent"
													buttonType="link"
													iconOnly
													className="float-left text-green-400 hover:text-white"
													onClick={() => setShowSidebar()}
												>
													ADMIN LTE
												</Button>
											}
											{/* Mobile menu button */}
											<Disclosure.Button className="bg-green-800 inline-flex items-center justify-center p-2 rounded-md text-green-400 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white">
												<span className="sr-only">Open main menu</span>
												{open ? (
													<XIcon className="block h-6 w-6" aria-hidden="true" />
												) : (
													<MenuIcon className="block h-6 w-6" aria-hidden="true" />
												)}
											</Disclosure.Button>
										</div>
									</div>
								</div>

								{/* This is what is expanded on responsive for mobile */}
								<Disclosure.Panel className="md:hidden">
									<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
										{navigation.map((item, key) => (
											<NavLink
												key={key}
												to={item?.route ?? '#'}
												className={classNames(
													item.current ? 'bg-green-900 text-white' : 'text-green-300 hover:bg-green-700 hover:text-white',
													'block px-3 py-2 rounded-md text-base font-medium'
												)}
												aria-current={item.current ? 'page' : undefined}
											>
												{item.name}
											</NavLink>
										))}
									</div>
									<div className="pt-4 pb-3 border-t border-green-700">
										<div className="flex items-center px-5">
											<div className="flex-shrink-0">
												<img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
											</div>
											<div className="ml-3">
												<div className="text-base font-medium leading-none text-white">{user.name}</div>
												<div className="text-sm font-medium leading-none text-green-400">{user.email}</div>
											</div>
											<button
												type="button"
												className="ml-auto bg-green-800 flex-shrink-0 p-1 rounded-full text-green-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white"
											>
												<span className="sr-only">View notifications</span>
												<BellIcon className="h-6 w-6" aria-hidden="true" />
											</button>
										</div>
										<div className="mt-3 px-2 space-y-1">
											{userNavigation.map((item, index) => (
												item.action ? <a key={index} className={classNames(
													'block px-4 py-2 text-sm text-green-700 cursor-pointer'
												)} onClick={item.action}>{item.name}</a>
													: <Disclosure.Button
														key={index}
														as="a"
														href={item.href}
														className="block px-3 py-2 rounded-md text-base font-medium text-green-400 hover:text-white hover:bg-green-700"
													>
														{item.name}
													</Disclosure.Button>
											))}
										</div>
									</div>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				</div>
			</div>
		</>
	)
}

export default SessionHeaderComponent;
