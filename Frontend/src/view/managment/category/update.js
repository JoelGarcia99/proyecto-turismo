import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import {customHTTPRequest} from '../../../helpers/helper.network';
import ManageCategoryCreate from './create';

const ManageCategoryUpdate = () => {

	// fetching data for this location
	const [category, setCategory] = useState(null);
	const {token} = useSelector(state => state.auth);
	const dispatch = useDispatch();

	// this comes from URL params
	const {id} = useParams();

	// This is not for updating purposes, this is querying in DB for the full
	// object since tables in management screen only get a limited object to
	// avoid high data consumption
	useEffect(() => {
		customHTTPRequest(dispatch, `${process.env.REACT_APP_NG_API_HOST}/api/manage/categories/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			},
		}).then(async response => {
			setCategory(response.data);
		})
	}, [setCategory, dispatch]);

	if (!category) {
		return <h1>Cargando</h1>
	}

	return <ManageCategoryCreate initS={category} />;
}

export default ManageCategoryUpdate
