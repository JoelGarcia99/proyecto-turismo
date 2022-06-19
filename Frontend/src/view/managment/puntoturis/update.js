import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router';
import ManagePuntoturisCreate from './create';

const ManagePuntoturisUpdate = () => {

  // fetching data for this location
  const [puntoTuris, setPuntoTuris] = useState(null);
  const {token} = useSelector(state=>state.auth);

  // this comes from URL params
  const {id} = useParams();

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_HOST}/punto-turistico/manage/${id}`, {
      method: "GET",
      headers: {
	auth: token
      },
    }).then(async response=>{
      const jsonRes = await response.json();

      if(response.status === 200) {
	setPuntoTuris(jsonRes.punto);
      }
    })
  }, [setPuntoTuris]);

  if(!puntoTuris) {
    return <h1>Cargando</h1>
  }

  return <ManagePuntoturisCreate initS={puntoTuris} />;
}

export default ManagePuntoturisUpdate
