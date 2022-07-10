
const DescriptionInputPanelLayout = ({isCreate, onSubmit, title, description, child}) => {
	return <form onSubmit={onSubmit} >
		<div className="box-border py-3 px-3 overflow-x-hidden md:ml-64">
			<div className="md:grid md:grid-cols-3 md:gap-6">
				<div className="md:col-span-1">
					<h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
					<p className="mt-1 text-sm text-gray-600"> {description} </p>
				</div>
				<div className="mt-5 md:mt-0 md:col-span-2">
					{child}
				</div>
			</div>

			{

				<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
					{
						onSubmit &&
						<button
							type="submit"
							className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{isCreate && "Crear" || "Actualizar"}
						</button>
					}

				</div>
			}
		</div>
	</form>
}

export default DescriptionInputPanelLayout
