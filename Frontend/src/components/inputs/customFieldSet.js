/**
 * example of a custom fieldset param
 * {
 * 		title: '',
 * 		description: '',
 * 		checked: true,
 *
 * }
 *
 * you can pass whatever parameters you want if it belongs to an input field
 */
const CustomFieldSet = ({groupTitle, children}) => {
	return <fieldset>
		<legend className="text-base font-medium text-gray-900">{groupTitle}</legend>
		<div className="space-y-4">
			{
				children.map((param, index) => {
					return <div key={index} className="flex items-start">
						<div className="flex items-center h-5">
							<input
								{...param.properties}
								className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
							/>
						</div>
						<div className="ml-3 text-sm">
							<label htmlFor="comments" className="font-medium text-gray-700">
								{param.title}
							</label>
							<p className="text-gray-500">{param.description}</p>
						</div>
					</div>
				})
			}
		</div>
	</fieldset>
}

export default CustomFieldSet
