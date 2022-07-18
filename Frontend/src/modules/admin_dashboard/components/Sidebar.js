import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {allRoutes, available_menus} from '../../../router/routes';
import SessionHeaderComponent from '../../../components/header/sessionHeaderComponent';

// static resource
const active_class_name = "bg-gradient-to-tr from-light-green-500 to-light-green-700 text-white shadow-md";


export default function Sidebar({title = "None", activeRoute = null}) {
	const [showSidebar, setShowSidebar] = useState('-left-64');

	return (
		<>
			<SessionHeaderComponent
				currentRoute={allRoutes.manage}
				fullWidth={true}
				setShowSidebar={()=>setShowSidebar(showSidebar === '-left-64' ? '-left-0' : '-left-64')}
				fixed={true}
			/>
			<div
				className={`h-screen drop-shadow-lg fixed md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-0 py-4 px-6 transition-all duration-300`}
			>
				<div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
					{/* Menu items */}
					<div className="flex flex-col">
					<span className="mx-auto font-bold my-4 text-2xl uppercase">ADMIN Panel</span>
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
