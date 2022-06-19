import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import {customHTTPRequest} from '../../../helpers/helper.network';
import ManagePuntoturisCreate from './create';

const ManagePuntoturisUpdate = () => {

	// fetching data for this location
	const [puntoTuris, setPuntoTuris] = useState(null);
	const {token} = useSelector(state => state.auth);
	const dispatch = useDispatch();

	// this comes from URL params
	const {id} = useParams();

	useEffect(() => {
		customHTTPRequest(dispatch, `${process.env.REACT_APP_NG_API_HOST}/api/manage/punto-turistico/${id}`, {
			headers: {
				'Authorization': `Bearer ${token}`
			},
		}).then(async response => {
				setPuntoTuris(response.data);
		})
	}, [setPuntoTuris]);

	if (!puntoTuris) {
		return <h1>Cargando</h1>
	}

	return <ManagePuntoturisCreate initS={puntoTuris} />;
}

export default ManagePuntoturisUpdate
