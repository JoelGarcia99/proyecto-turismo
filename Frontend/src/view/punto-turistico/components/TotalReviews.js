const TotalReviews = ({stats}) => {

	// avoiding division by 0
	let total = 0.0000000001;

	for (let key in stats) {
		total += stats[key];
	}

	return <div className="w-full px-4 py-4 mb-1 tracking-wide">
		<h2 className="mt-1 font-semibold text-gray-800">Este punto ha recibido {Math.ceil(total)} calificaciones</h2>
		<div className="px-8 pb-3 -mx-8 border-b">
			{
				['5', '4', '3', '2', '1'].map(key => {

					let percentage = Math.round(((stats[key] ?? 0) / total) * 100);

					return <div key={key} className="flex items-center mt-1">
						<div className="w-1/5 tracking-tighter text-gray-500">
							<span>{key} Estrella{key !== '1' && 's'}</span>
						</div>
						<div className="w-3/5">
							<div className="w-full h-2 bg-gray-300 rounded-lg">
								<div 
									style={{width: `${percentage}%`}}
									className="w-1/12 h-2 bg-blue-500 rounded-lg"
								></div>
							</div>
						</div>
						<div className="w-1/5 pl-3 text-gray-700">
							<span className="text-sm">{percentage}%</span>
						</div>
					</div>
				})
			}
		</div>
	</div>
}

export default TotalReviews
