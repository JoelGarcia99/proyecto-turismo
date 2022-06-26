const CustomTextArea = ({title, name, placeholder, value, onChange, maxLength, description}) => {
	return <div>
		<label htmlFor="about" className="block text-sm font-medium text-gray-700">
			{title}
		</label>
		<div className="mt-1">
			<textarea
				name={name}
				value={value}
				onChange={onChange}
				rows={3}
				maxLength={maxLength}
				className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
				placeholder={placeholder}
			/>
		</div>
		<p className="mt-2 text-sm text-gray-500">
			{description}
		</p>
	</div>
}

export default CustomTextArea
