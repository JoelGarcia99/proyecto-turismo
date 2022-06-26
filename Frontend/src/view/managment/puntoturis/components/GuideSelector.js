import {faAdd, faRemove} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const GuideSelector = ({guides, available_guides, linkedGuides, handleRemoveGuide, setLinkedGuides}) => {
	return <div className="py-5 col-span-6 bg-space-y-6 ">
		<div style={{maxWidth: "8rem"}} onClick={() => {
			//TODO: add a swal
			if (available_guides.length === 0) {
				return;
			}

			setLinkedGuides([
				...linkedGuides,
				available_guides[0]._id,
			]);
		}}
			id="add-guide"
			className="text-sm font-bold cursor-pointer"
		>
			Agregar guia &nbsp;
			<FontAwesomeIcon icon={faAdd} />
		</div>
		<div id="guide-list">
			{
				(linkedGuides || []).map((guide_id, index) => {
					return <div key={index} className="flex flex-row items-center">
						<select
							key={index}
							value={guide_id}
							onChange={(value) => {
								let guides = [...linkedGuides];
								guides[index] = value.target.value;

								setLinkedGuides(guides);
							}}
							className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						>
							{
								[...available_guides, ...guides.filter(e => e._id === guide_id)].map((guide) => {
									return <option
										value={guide?._id}
										key={guide?._id}
									>
										{guide?.cedula}&nbsp;|&nbsp;{guide?.name}
									</option>
								})
							}

						</select>
						&nbsp;
					    <FontAwesomeIcon
							icon={faRemove}
							className="cursor-pointer ml-3"
							onClick={() => handleRemoveGuide(guide_id)}
						/>
					</div>
				})
			}
		</div>
	</div>
}

export default GuideSelector
