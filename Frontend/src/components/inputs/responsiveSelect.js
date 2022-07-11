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
const ResponsiveSelect = ({title, name, setData, data, displayProp, valueProp, formater=e=>e, customDisplay}) => {
	return <div className="col-span-6 sm:col-span-3">
		<label htmlFor="country" className="block text-sm font-medium text-gray-700">
			{title}
	    </label>
		<select
			name={name}
			onChange={setData}
			className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
		>
			{
				data?.map((cat, index) => {
					return <option value={cat[valueProp]} key={index}>
						{customDisplay?customDisplay(cat) : formater(cat[displayProp])}
					</option>
				})
			}

		</select>
	</div>
}

export default ResponsiveSelect
