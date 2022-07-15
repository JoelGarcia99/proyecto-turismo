import {faComment} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const NoData = ({text="Sin datos"}) => {
	return <div className="flex flex-col items-center text-gray-400">
		<FontAwesomeIcon className="text-8xl" icon={faComment} />
			<small className="font-bold text-xl">
				{text}
			</small>
		</div>
}

export default NoData
