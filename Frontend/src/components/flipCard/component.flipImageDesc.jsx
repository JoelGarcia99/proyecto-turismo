import "./flipImageDescriptor.css";

const FlipImageDescriptor = ({
	imageUrl, title, desc
}) => {
	return <div style={{width: "300px", height: "350px"}} className="mx-2 rounded-xl shadow flip-card bg-gray-200">
		<div className="flip-card-inner rounded-xl shadow">
			<div className="flip-card-front rounded-xl flex flex-col justify-between">
				<img 
					src={imageUrl}
					alt="plato imagen"
					className="rounded-xl"
					style={{objectFit: "fill", height: "300px", width: "100%"}}
				/>
				<span className={"flex flex-col justify-center h-full text-xl font-semibold"}>
					{title}
				</span>
			</div>
			<div className="flip-card-back rounded-xl flex flex-col justify-center items-center">
				<span className="px-2 py-2 text-md">
					{desc}
				</span>
			</div>
		</div>
	</div>
}

export default FlipImageDescriptor
