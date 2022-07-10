/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
	// ...
	plugins: [
	  // ...
	  require('@tailwindcss/aspect-ratio'),
	],
  }
  ```
*/

import {faLocation, faLocationDot, faLocationPin} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router";
import {allRoutes} from "../../router/routes";

const PlacesListComponent = ({title, items}) => {

	const navigator = useNavigate();

	// color for borders on the card of maravillas
	const borderColor = "#4AE050";

	return (
		<div className="bg-white">
			<div className="w-full mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
				<h2 className="text-2xl font-extrabold tracking-tight text-3xl text-green-900">{title}</h2>

				<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8 xl:grid-cols-4">
					{items.map((product) => (
						<div key={product._id} className="border-8 rounded-2xl group">
							<div 
								style={{height: "10rem !important"}}
								className="w-full bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
								<img
									src={`${process.env.REACT_APP_NG_API_HOST}${product.main_image_url}`}
									className="w-full h-full object-center object-cover lg:w-full lg:h-full"
								/>
							</div>
							<div className="mt-4 px-2 py-2">
								<div>
									<h3 className="text-xl text-gray-700 font-bold uppercase">
										{product.name}
									</h3>
									<div className="flex flex-row items-center">
										<FontAwesomeIcon icon={faLocationDot} />
										&nbsp;
										<p className="mt-1 text-lg text-gray-500">{product.address}</p>
									</div>
									<div className="flex flex-row justify-end w-full">
										<button
											onClick={() => navigator(allRoutes.punto_detail + `${product.slug}`)}
											style={{borderColor: borderColor}}
											className="z-50 bg-transparent hover:bg-green-600 hover:text-white text-black border-2 font-bold py-2 px-4 rounded-2xl"
										>
											Ver detalles
									  </button>
									</div>
								</div>
							</div>

						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default PlacesListComponent;
