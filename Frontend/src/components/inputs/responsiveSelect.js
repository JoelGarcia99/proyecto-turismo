/**
 * Creates a custom responsive select component
 *
 * @param {string} name - the name of the select
 * @param {string} title - the title of the select
 * @param {string} setData - action callback
 * @param {data} data - the data to fill the select
 * @param {string} displayProp - the property name to display in the select
 * @param {string} valueProp - the property name to use as value in the select
 */
const ResponsiveSelect = ({
	title, name, setData, initVal,
	data, displayProp, valueProp, className="",
	formater=e=>e, customDisplay
}) => {
	return <div className="col-span-6 sm:col-span-3">
		<label htmlFor="country" className="block text-sm font-medium text-gray-700">
			{title}
	    </label>
		<select
			name={name}
			onChange={setData}
			defaultValue={initVal}
			value={initVal}
			className={"mt-1 w-max block w-full py-2 px-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" + " " + className}
		>
			{
				data?.map((cat, index) => {

					const value = valueProp ? cat[valueProp] : cat;

					return <option 
						value={value}
						key={index}
						selected={initVal == value}
					>
						{customDisplay?
							customDisplay(cat) :
								formater(displayProp? cat[displayProp]:cat)
						}
					</option>
				})
			}

		</select>
	</div>
}

export default ResponsiveSelect
