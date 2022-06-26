const CustomUrlInput = ({title, name, value, onChange}) => {
	return <div className="col-span-4 sm:col-span-2">
		<label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
			(YouTube)&nbsp;{title}
	  </label>
		<div className="mt-1 flex rounded-md shadow-sm">
			<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
				http://
			</span>
			<input
				type="text"
				name={name}
				value={value}
				onChange={onChange}
				className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
				placeholder="www.example.com"
			/>
		</div>
		{
			value && 
			<div className="animate__animated animate__fadeIn my-3">
				<iframe
					width="100%"
					height="350rem"
					src={'https://www.youtube.com/embed/' + value.split('v=')[1]}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen={true}
				>
				</iframe>
			</div>
		}
	</div>
}

export default CustomUrlInput
