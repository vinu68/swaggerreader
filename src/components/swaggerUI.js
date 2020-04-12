import React, { useEffect, useState } from 'react';
import swaggerData from '../data/swagger.json';
import SwaggerAPIPlayground from './playground';
import SwaggerAPIDetails from './swaggerDetails';
import { getEndPoints, getEndPoint, getEndPointVerb, genearteParameterBody } from '../utility';

const SwaggerUI = (props) => {
	const [endpoints, setEndpoints] = useState([]);
	const [endpoint, setEndpoint] = useState([]);
	const [endpointPostVerbData, setendpointPostVerbData] = useState([]);
	const [endpointPostVerbDataParams, setendpointPostVerbParams] = useState([]);
	const [endpointParamtersBody, setendpointParamtersBody] = useState([]);
	
	let paths = swaggerData['paths'];
	let definitions = swaggerData['definitions'];
	let verb = 'post';
	let endpointPath = '/pet';
	if(props.match.params.type){
		endpointPath = '/'+props.match.params.type
		verb = props.match.params.method
	}
	console.log("endpointPath >", endpointPath);
	console.log("verb >", verb);
	console.log("response", swaggerData['paths'][endpointPath]);
	let response = swaggerData['paths'][endpointPath][verb] ? swaggerData['paths'][endpointPath][verb]['responses'] : swaggerData['paths'][endpointPath]['data'][0]['data']['responses']
	let baseUrl = 'http://' + swaggerData['host'] + swaggerData['basePath'];

	useEffect(() => {
		setEndpoints(getEndPoints(paths));
	}, [paths]);
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

	return (
		<div className='container border'>
			<SwaggerAPIDetails
				verbData={endpointPostVerbData}
				endPoint={endpointPath.slice(1)}
				schema={endpointParamtersBody.modalSchema}
				baseUrlPath={baseUrl}
				responses={response}
			/>
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
