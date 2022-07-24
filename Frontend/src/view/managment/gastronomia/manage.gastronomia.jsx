import {ToastContainer} from "react-toastify"
import Sidebar from "../../../modules/admin_dashboard/components/Sidebar"
import {allRoutes} from "../../../router/routes"

const ManageGastronomia = () => {
	return <div id="gastronomia-manage">
		<ToastContainer />
		<Sidebar
			title="Gastronomia"
			currentRoute={allRoutes.manage_gastronomia}
		/>
	</div>
}

export default ManageGastronomia
