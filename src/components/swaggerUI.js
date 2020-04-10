import React, { useEffect, useState } from 'react';
import swaggerData from '../data/swagger.json';
import SwaggerAPIPlayground from './playground';
import { getEndPoints, getEndPoint, getEndPointVerb, genearteParameterBody } from '../utility';

const SwaggerUI = () => {
	const [endpoints, setEndpoints] = useState([]);

	useEffect(() => {
		setEndpoints(getEndPoints(paths));
	}, []);

	let paths = swaggerData['paths'];
	let definitions = swaggerData['definitions'];
	//let endpoints = getEndPoints(paths);
	let petAPI = getEndPoint(endpoints, '/pet');
	let petAPIPostVerbData = getEndPointVerb(petAPI, 'post');
	let petAPIPostVerbParams = getEndPointVerb(petAPI, 'post', true);
	let createAPIParamtersBody = genearteParameterBody(petAPIPostVerbParams, definitions);
	console.log(createAPIParamtersBody);
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-sm-6'>Details</div>
				<div className='col-sm-6'>{<SwaggerAPIPlayground />}</div>
			</div>
		</div>
	);
};

export default SwaggerUI;
