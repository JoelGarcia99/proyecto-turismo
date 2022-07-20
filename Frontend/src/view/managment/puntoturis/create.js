import {useDispatch} from 'react-redux';

import {startDeletingPunto} from '../../../redux/actions/locations/action.location';
import {allRoutes} from '../../../router/routes';
import _MediaForm from './components/_MediaForm';
import _GeneralForm from './components/_GeneralForm';
import Sidebar from '../../../modules/admin_dashboard/components/Sidebar';
import {ToastContainer} from 'react-toastify';
import _TypicPlate from './components/_TypicPlate';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';


/**
 * Interface for touristic point creation/update
 * guides={guides}
 *
 **/
const ManagePuntoturisCreate = ({initS}) => {

	const dispatch = useDispatch();
	const navigator = useNavigate();

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
				<button onClick={handleDelete} className="float-right mx-8 my-4 bg-red-600 hover:bg-red-800 px-4 py-2 rounded-md text-white">
					<FontAwesomeIcon icon={faTrash} /> &nbsp;
					Eliminar
				</button>
			</>
		}
		<ToastContainer />
	</div>
}

export default ManagePuntoturisCreate
