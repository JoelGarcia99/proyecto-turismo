import {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import {allRoutes, available_menus} from '../../../router/routes';

// static resource
const active_class_name = "bg-gradient-to-tr from-light-green-500 to-light-green-700 text-white shadow-md";


export default function Sidebar({title = "None", activeRoute = null}) {
	const [showSidebar, setShowSidebar] = useState('-left-64');
	const navigator = useNavigate();

	return (
		<>
			<AdminNavbar
				title={title}
				showSidebar={showSidebar}
				setShowSidebar={setShowSidebar}
			/>
			<div
				className={`h-screen drop-shadow-lg fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
			>
				<div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
					<a
						style={{userSelect: "none"}}
						onClick={() => navigator(allRoutes.home)}
						rel="noreferrer"
						className="cursor-pointer mt-2 text-center w-full inline-block"
					>
						<div className="bg-gradient-to-tr from-red-500 to-red-700 px-4 rounded-lg text-white">
							<div
								target="_blank"
								rel="noreferrer"
								className="flex items-center justify-center gap-4 text-lg font-bold py-3"
							>
								Inicio
                                </div>
						</div>
					</a>
					{/* Menu items */}
					<div className="flex flex-col">
						<hr className="my-4 min-w-full" />
						<ul className="flex-col min-w-full flex list-none">
							{
								// mapping all available menu items
								available_menus.map((item, index) => {
									return <li
										key={index}
										className={"rounded-lg mb-4" + " " + (activeRoute === item.route ? active_class_name : "")}
									>
										<NavLink
											className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
											to={item.route}
										>
											{item.icon}
											{item.name}
										</NavLink>
									</li>
								})
							}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
