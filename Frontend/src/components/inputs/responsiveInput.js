const ResponsiveInput = ({title, placeholder, name, value, onChange, isRequired=true}) => {
	return <div className="col-span-6 sm:col-span-3">
		<label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
			{title}
	    </label>
		<input
			type="text"
			name={name}
			required={isRequired}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
		/>
	</div>
}

export default ResponsiveInput
