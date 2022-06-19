import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

const LocationComponent = ({location, handleClick})=>{
  
  return <>
    <div className="location" onClick={handleClick} >
	<img src={location['url']} alt="" />
      <div className="desc">
        <h2>{location.nombre}</h2>
	<div className="foot">
	  <h4>{location.direccion}</h4>
	  {/* <span>{location.descripcion}</span> */}
	</div>

      </div>

      <button>Ver detalles&nbsp;<FontAwesomeIcon icon={faChevronRight}/></button>
    </div>
    </>
}

export default LocationComponent;
