import {faAdd, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {allRoutes} from '../../../router/routes';
import {Link, NavLink} from 'react-router-dom';
import Sidebar from '../../../modules/admin_dashboard/components/Sidebar';
import {startFetchingCategories} from '../../../redux/actions/category/action.category';

const ManageCategoryIndex = ()=>{

  const dispatch = useDispatch();
  const {categories} = useSelector(state=>state.category);

  useEffect(()=>{
    dispatch(startFetchingCategories());
  }, [dispatch]);
  

  return <div className="max-h-full bg-slate-100">
    <Sidebar title="Control de Categorías" activeRoute={allRoutes.manage_category}/>
      <div className="md:ml-64 w-100 py-5 px-10 bg-slate-100 flex-1">
	<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
	<table className="w-full text-sm text-left px-4 text-gray-500">
	    <caption className="w-full text-xl my-4">
	      <div>Control de Categorías</div>
	      <NavLink
		to={allRoutes.manage_category_add}
		className="text-xs cursor-pointer select-none bg-lime-800 rounded text-zinc-50 py-2 px-5 hover:bg-lime-700"
	      >
		Nueva Categoría &nbsp;
		<FontAwesomeIcon icon={faAdd} />
	      </NavLink>
	    </caption>
	    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
		<tr>
		    <th scope="col" className="px-6 py-3">
		      Título
		    </th>
		    <th scope="col" className="px-6 py-3">
		      Descripción
		    </th>
		    <th scope="col" className="px-6 py-3">
		      Target
		    </th>
		    <th scope="col" className="px-6 py-3">
		      Activa
		    </th>
		    <th scope="col" className="px-6 py-3">
		      Acciones
		    </th>
		</tr>
	    </thead>
	    <tbody>
	      {
		categories.map((category)=>{
		  return <tr key={category._id} className="bg-white border-b ">
		    <th 
		      scope="row" 
		      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
		    >{category.title || "N/A"}</th>
		    <td className="px-6 py-4">{category.description|| "N/A"}</td>
		    <td className="px-6 py-4">{category.target || "N/A"}</td>
		    <td className="px-6 py-4">{category.active? "Sí":"No"}</td>
		    <td className="px-6 py-4">
		      <Link
			to={`${allRoutes.manage_category_edit}${category._id}`}
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

export default ManageCategoryIndex;

