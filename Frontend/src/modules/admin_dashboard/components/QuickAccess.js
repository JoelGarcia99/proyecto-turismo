import React from 'react';

import PropTypes from 'prop-types';

const QuickAccess = ({title, value, color, foreground}) => {
	return (
		<div 
			id="quick-access-component"
			className={`rounded-xl cursor-pointer shadow hover:shadow-xl px-20 py-3 flex flex-col mx-2 flex-wrap justify-evenly items-center ${color} ${foreground}`}
		>
			<small className="text-xs font-medium">{title}</small>
			<span className="text-6xl font-bold">{value}</span>
		</div>
	);
}

QuickAccess.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	foreground: PropTypes.string.isRequired
}

export default QuickAccess
