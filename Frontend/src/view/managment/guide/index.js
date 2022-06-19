import {faAdd, faInfoCircle, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {allRoutes} from '../../../router/routes';
import {Link, NavLink} from 'react-router-dom';
import Sidebar from '../../../modules/admin_dashboard/components/Sidebar';
import {startFetchingGuides} from '../../../redux/actions/guideman/action.guideman';

const ManagaGuideIndex = ()=>{

  const dispatch = useDispatch();
  const {guidemen:guides} = useSelector(state=>state.guideman);

  useEffect(()=>{
    dispatch(startFetchingGuides());
  }, [dispatch]);
  

  return <div className="max-h-full bg-slate-100">
    <Sidebar title="Gestión puntos turísticos" activeRoute={allRoutes.manage_guide}/>
      <div className="md:ml-64 w-100 py-5 px-10 bg-slate-100 flex-1">
	<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
	<table className="w-full text-sm text-left px-4 text-gray-500">
	    <caption className="w-full text-xl my-4">
	      <div>Mostrando lista de guías</div>
	      <NavLink
		to={allRoutes.manage_guide_new}
		className="text-xs cursor-pointer select-none bg-lime-800 rounded text-zinc-50 py-2 px-5 hover:bg-lime-700"
	      >
		Nuevo guía &nbsp;
		<FontAwesomeIcon icon={faAdd} />
	      </NavLink>
	    </caption>
	    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
		<tr>
		    <th scope="col" className="px-6 py-3">
		      Nombre
		    </th>
		    <th scope="col" className="px-6 py-3">
		      Cédula/Pasaporte
		    </th>
		    <th scope="col" className="px-6 py-3">
		      Teléfono
		    </th>
		    <th scope="col" className="px-6 py-3">
		      Horarios
		    </th>
		    <th scope="col" className="px-6 py-3">
		      Disponible
		    </th>
		    <th scope="col" className="px-6 py-3">
		      Acciones
		    </th>

		</tr>
	    </thead>
	    <tbody>
	      {
		guides.map((guide)=>{
		  return <tr key={guide._id} className="bg-white border-b ">
		    <th 
		      scope="row" 
		      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
		    >{guide.name || "N/A"}</th>
		    <td className="px-6 py-4">{guide.identification || "N/A"}</td>
		    <td className="px-6 py-4">{guide.cellphone || "N/A"}</td>
		    <td className="px-6 py-4">{(guide.schedules || []).length}&nbsp;disponibles</td>
		    <td className="px-6 py-4">{guide.available? "Sí":"No"}</td>
		    <td className="px-6 py-4">
		      <Link
			to={`${allRoutes.manage_guide_update}${guide._id}`}
		      >
	 		<FontAwesomeIcon icon={faInfoCircle} />&nbsp;Ver detalles
		      </Link>
		    </td>
		  </tr>
	      })
	      }
	    </tbody>
	</table>
    </div>
      </div>
  </div>
};

export default ManagaGuideIndex;
