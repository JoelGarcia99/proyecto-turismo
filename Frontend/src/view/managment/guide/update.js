import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import {customHTTPRequest} from '../../../helpers/helper.network';
import ManageGuideCreate from './create';

const ManageGuideUpdate = () => {

	// fetching data for this location
	const [guide, setGuide] = useState(null);
	const {token} = useSelector(state => state.auth);
	const dispatch = useDispatch();

	// this comes from URL params
	const {id} = useParams();

	// This is not for updating purposes, this is querying in DB for the full
	// object since tables in management screen only get a limited object to
	// avoid high data consumption
	useEffect(() => {
		customHTTPRequest(dispatch, `${process.env.REACT_APP_NG_API_HOST}/api/manage/guide/${id}`, {
			headers: {
				'Authorization': `Bearer ${token}`
			},
		}).then(async response => {
			setGuide(response.data);
		})
	}, [setGuide]);

	if (!guide) {
		return <h1>Cargando</h1>
	}

	return <ManageGuideCreate initS={guide} />;
}

export default ManageGuideUpdate
