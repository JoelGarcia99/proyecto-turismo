import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard";


// Tailwind CSS Style Sheet
import './assets/styles/index.css';
import {allRoutes} from "../../router/routes";

const AdminmanagmentPanel = () => {
  return <>
    <Sidebar title="Dashboard" activeRoute={allRoutes.dashboard}/>
    <div className="md:ml-64">
      <Dashboard />
    </div>
    </>;
}

export default AdminmanagmentPanel
