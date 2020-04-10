import React, { useEffect, useState } from 'react';
import swaggerData from '../data/swagger.json';
import SwaggerAPIPlayground from './playground';
import SwaggerAPIDetails from './swaggerDetails';
import { getEndPoints, getEndPoint, getEndPointVerb, genearteParameterBody } from '../utility';

const SwaggerUI = () => {
	const [endpoints, setEndpoints] = useState([]);
	const [endpoint, setEndpoint] = useState([]);
	const [endpointPostVerbData, setendpointPostVerbData] = useState([]);
	const [endpointPostVerbDataParams, setendpointPostVerbParams] = useState([]);
	const [endpointParamtersBody, setendpointParamtersBody] = useState([]);
	let paths = swaggerData['paths'];
	let definitions = swaggerData['definitions'];
	let verb = 'post';
	let endpointPath = '/pet';
	let baseUrl = 'http://' + swaggerData['host'] + swaggerData['basePath'];

	useEffect(() => {
		setEndpoints(getEndPoints(paths));
	}, []);
	useEffect(() => {
		setEndpoint(getEndPoint(endpoints, endpointPath));
	}, [endpoints, endpointPath]);

	useEffect(() => {
		if (endpoint.length) {
			setendpointPostVerbData(getEndPointVerb(endpoint, verb));
			setendpointPostVerbParams(getEndPointVerb(endpoint, verb, true));
		}
	}, [endpoint, verb]);
	useEffect(() => {
		if (Object.keys(endpointPostVerbDataParams).length) {
			setendpointParamtersBody(genearteParameterBody(endpointPostVerbDataParams, definitions));
		}
	}, [endpointPostVerbDataParams, definitions]);

	console.log('endpointPostVerbData', endpointParamtersBody);

	return (
		<div className='container border'>
			<SwaggerAPIDetails verbData={endpointPostVerbData} endPoint={endpointPath.slice(1)} />
			<SwaggerAPIPlayground
				parameters={endpointParamtersBody}
				verb={verb}
				baseUrl={baseUrl}
				endpointPath={endpointPath}
			/>
		</div>
	);
};

export default SwaggerUI;
