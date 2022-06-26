/**
 * Creates a custom input group layout with a description, title & submit button if needed.
 */
const DescriptionFormLayout = ({title, description, child}) => {
	return <div className="box-border md:ml-64 py-3 px-3">
		<div className="md:grid md:grid-cols-3 md:gap-6">
			<div className="md:col-span-1">
				<h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
				<p className="mt-1 text-sm text-gray-600"> {description} </p>
			</div>
			<div className="mt-5 md:mt-0 md:col-span-2">
				<div className="shadow overflow-hidden sm:rounded-md">
					<div className="px-4 py-5 bg-white sm:p-6">
						<div className="grid grid-cols-6 gap-6">
							{child}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
}

export default DescriptionFormLayout
