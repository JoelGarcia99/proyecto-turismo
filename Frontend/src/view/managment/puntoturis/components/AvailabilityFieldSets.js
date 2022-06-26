import CustomFieldSet from "../../../../components/inputs/customFieldSet";

const AvailabilityFieldSets = ({data, setData}) => {
	return <CustomFieldSet
		groupTitle="Dispobilidad"
		children={[
			{
				title: "Permitir reservas",
				description: "Permitir reservas para este punto turístico",
				properties: {
					name: "allow_reservations",
					checked: data.allow_reservations,
					type: "checkbox",
					onChange: (e) => {
						setData({target: {value: Boolean(e.target.checked), name: 'allow_reservation'}});
					}
				}
			},
			{
				title: "Maravilla",
				description: "Marcar este punto turístico como una maravilla",
				properties: {
					name: "is_wonder",
					checked: data.is_wonder,
					type: "checkbox",
					onChange: (e) => {
						setData({target: {value: Boolean(e.target.checked), name: 'is_wonder'}});
					}

				}
			}
		]}
	/>
}

export default AvailabilityFieldSets
