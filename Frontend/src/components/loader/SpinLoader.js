import './SpinLoader.css';

const SpinLoader = ({message=""}) => {
	return <>
		<div className="sk-chase mx-auto">
			<div className="sk-chase-dot"></div>
			<div className="sk-chase-dot"></div>
			<div className="sk-chase-dot"></div>
			<div className="sk-chase-dot"></div>
			<div className="sk-chase-dot"></div>
			<div className="sk-chase-dot"></div>
		</div>
		<span className="text-center text-xl font-bold mx-auto">{message}</span>
	</>
}

export default SpinLoader
