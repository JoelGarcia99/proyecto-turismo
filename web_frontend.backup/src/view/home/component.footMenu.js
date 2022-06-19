import PropTypes from 'prop-types';

/**
 * Creates a footer menu component for the home page of the application.
 */
const FooterMenuComponent = ({title, items}) => {

	return <div className="select-none mx-8">
		<h2 className="text-white py-2 font-bold">{title}</h2>
		<div
			style={{
				border: "none",
				borderLeft: "1px solid white",
				marginLeft: "1rem",
			}}
			className="text-white px-2 flex flex-col"
		>
			{
				items.map((item, index) => {
					return <a key={index} target="_blank" className="hover:font-bold my-1" href={item.href}>{item.title}</a>
						
			})}
		</div>
	</div>
}

FooterMenuComponent.propTypes = {
	title: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired,
}


export default FooterMenuComponent
