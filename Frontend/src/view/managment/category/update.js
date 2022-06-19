import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router';
import ManageCategoryCreate from './create';
import ManageGuideCreate from './create';

const ManageCategoryUpdate = () => {

  // fetching data for this location
  const [category, setCategory] = useState(null);
  const {token} = useSelector(state=>state.auth);

  // this comes from URL params
  const {id} = useParams();

  // This is not for updating purposes, this is querying in DB for the full
  // object since tables in management screen only get a limited object to
  // avoid high data consumption
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_HOST}/category/${id}`, {
      method: "GET",
      headers: {
	auth: token
      },
    }).then(async response=>{
      const jsonRes = await response.json();

      if(response.status === 200) {
	setCategory(jsonRes.category);
      }
    })
  }, [setCategory]);

  if(!category) {
    return <h1>Cargando</h1>
  }

  return <ManageCategoryCreate initS={category} />;
}

export default ManageCategoryUpdate
