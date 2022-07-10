import {useDispatch} from 'react-redux';

import {startDeletingPunto} from '../../../redux/actions/locations/action.location';
import {allRoutes} from '../../../router/routes';
import _MediaForm from './components/_MediaForm';
import _GeneralForm from './components/_GeneralForm';
import Sidebar from '../../../modules/admin_dashboard/components/Sidebar';
import {ToastContainer} from 'react-toastify';
import _TypicPlate from './components/_TypicPlate';


/**
 * Interface for touristic point creation/update
 * guides={guides}
 *
 **/
const ManagePuntoturisCreate = ({initS}) => {

	const dispatch = useDispatch();

	// Permanently removes this touristic point from DB
	const handleDelete = (e) => {
		e.preventDefault();

		dispatch(startDeletingPunto(initS._id, () => {
			navigator(allRoutes.manage_puntoturis);
		}));
	}

	return <div>
		<Sidebar title="Registrar punto turístico" activeRoute={allRoutes.manage_puntoturis} />
		<_GeneralForm initS={initS} />
		<hr />
		{
			!!initS &&
			<>
				<_TypicPlate touristicPoint={initS} />
				<hr />
				<_MediaForm touristicPoint={initS} />
				<button onClick={handleDelete} className="btn">
					Eliminar
				</button>
			</>
		}
		<ToastContainer />
	</div>
}

export default ManagePuntoturisCreate
