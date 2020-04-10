function getEndPoints(paths) {
	let endpoints = Object.keys(paths).map((key) => {
		let verbs = getVerbs(paths[key]);
		paths[key].name = key;
		paths[key].data = verbs;
		return paths[key];
	});
	return endpoints;
}

function getEndPoint(endpoints, endpointName) {
	return endpoints.filter((endpoint) => {
		return endpoint.name === endpointName;
	});
}

function getVerbs(verbsObj) {
	let verbs = [];
	Object.keys(verbsObj).map((verb) => {
		verbs.push({
			type: verb,
			data: verbsObj[verb],
		});
		delete verbsObj[verb];
	});
	return verbs;
}

function getEndPointVerb(endpoint, verbType, parameter = null) {
	if (parameter) {
		return endpoint[0].data.reduce((verb) => {
			return verb.type === verbType ? verb.data.parameters[0] : '';
		});
	} else {
		return endpoint[0].data.filter((verb) => {
			return verb.type === verbType;
		});
	}
}

function genearteParameterBody(parameters, definitions) {
	let paramData = {};
	
	switch (parameters['in']) {
		case 'body': {
			paramData.name = 'body';
			paramData.type = 'body';
			paramData.description = parameters['description'];
			paramData.model = generateModel(parameters['schema'], definitions);
			break;
		}
		case 'query': {
			paramData.name = 'query';
			paramData.type = parameters['type'];
			paramData.description = parameters['description'];
			paramData.model = '';
			break;
		}
		case 'path': {
			paramData.name = 'path';
			paramData.type = parameters['type'];
			paramData.description = parameters['description'];
			paramData.model = '';
			break;
		}
		default:
			break;
	}
	return paramData;
}

function setParamValues(paramdetails, definitions = null) {
	let paramValue = '';
	switch (paramdetails['type']) {
		case 'integer': {
			paramValue = 0;
			break;
		}
		case 'string': {
			paramValue = paramdetails['example']
				? paramdetails['example']
				: 'enum' in paramdetails
				? paramdetails['enum'][0]
				: 'string';
			break;
		}
		case 'array': {
			let setParamValue = [];
			if ('$ref' in paramdetails['items']) {
				setParamValue.push(generateModel(paramdetails['items'], definitions));
			} else {
				setParamValue.push(setParamValues(paramdetails['items']));
			}
			paramValue = setParamValue;
			break;
		}
		default:
			break;
	}
	return paramValue;
}

function generateModel(paramScehema, definitions) {
	if (paramScehema) {
		let referenceSplit = [];
		referenceSplit =
			'items' in paramScehema ? paramScehema['items']['$ref'].split('/') : paramScehema['$ref'].split('/');
		let schemaName = referenceSplit[referenceSplit.length - 1];
		let modelParams = definitions[schemaName]['properties'];
		let jsonData = {};

		Object.keys(modelParams).map((params, index) => {
			if ('$ref' in modelParams[params]) {
				jsonData[params] = generateModel(modelParams[params], definitions);
			} else {
				jsonData[params] = setParamValues(modelParams[params], definitions);
			}
			return null;
		});
		return jsonData;
	}
}

export { getEndPoints, getEndPoint, getVerbs, getEndPointVerb, generateModel, setParamValues, genearteParameterBody };
