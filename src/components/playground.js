import React, { useRef, useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view';
import Prism from 'prismjs';
import { generateNodejsCodeSnippet } from '../utility';
require('prismjs/plugins/line-numbers/prism-line-numbers.js');
require('prismjs/themes/prism-coy.css');

//TODO: 1. code gen 2. Textarea 3. add curl command 4. copy command [event.currentTarget.children[1].select();
//document.execCommand('copy');]

const SwaggerAPIPlayground = (props) => {
	let model = props.parameters && props.parameters.model;
	const parameterBodyRef = useRef();
	let [authType, setAuthType] = useState('');
	let [keyvalue, setAuthKeyValue] = useState('');
	let [apiusername, setAuthUsername] = useState('');
	let [apipassword, setAuthPassword] = useState('');
	let [apiresponse, setAPIResponse] = useState('');
	let [bodyText, setBodyText] = useState({});
	let [curlRequest, setcurlRequest] = useState('');
	let [allowEditing, setEditing] = useState(false);
	// let curlrequest =
	// 	`curl --request ` +
	// 	props.verb.toUpperCase() +
	// 	` '` +
	// 	props.baseUrl +
	// 	'' +
	// 	props.endpointPath +
	// 	`' --header 'Content-Type: application/json'` +
	// 	` --data-raw '` +
	// 	JSON.stringify(model, null, 2) +
	// 	`'`;

	useEffect(() => {
		setTimeout(() => {
			Prism.highlightAll();
		}, 2000);
	}, []);

	useEffect(() => {
		setBodyText({ ...bodyText, ...model });
	}, [model]);

	// useEffect(() => {
	// 	setcurlRequest(curlrequest);
	// }, [curlrequest]);

	useEffect(() => {
		console.log('authType', authType);
		console.log('apiusername', apiusername);
		console.log('apipassword', apipassword);
		let curlrequest = `curl --request ` + props.verb.toUpperCase();
		if (authType && authType === 'basicauth  ') {
			curlrequest = curlrequest + ` -u ` + apiusername + `:` + apipassword;
		}
		curlrequest =
			curlrequest +
			` '` +
			props.baseUrl +
			'' +
			props.endpointPath +
			`' --header 'Content-Type: application/json'` +
			` --data-raw '` +
			JSON.stringify(bodyText, null, 2) +
			`'`;
		if (authType && authType === 'apikey') {
			curlrequest = curlrequest + ` --header 'Authorization: Bearer ` + keyvalue + `'`;
		}
		//setcurlRequest(updatedcurlrequest);
		setcurlRequest(curlrequest);
	}, [props, bodyText, authType, keyvalue, apiusername, apipassword, apiresponse]);

	function handleBodyTextChange(e) {
		let value = e.currentTarget.value;
		value = JSON.parse(value);
		setBodyText(value);
	}

	function copyCurlCommand(event) {
		event.currentTarget.nextElementSibling.select();
		document.execCommand('copy');
	}

	function editParameterBody() {
		setEditing(true);
	}
	function cancelEditingParam() {
		setEditing(false);
	}
	function saveParameterBody() {
		let value = JSON.parse(parameterBodyRef.current.value);
		setBodyText(value);
		setEditing(false);
	}

	function callApiEndPoint() {
		let axioscall = {};
		axioscall.method = props.verb;
		axioscall.url = props.baseUrl + '' + props.endpointPath;
		axioscall.data = props.parameters && props.parameters.model;
		if (authType === 'basicauth') {
			axioscall.auth = { username: apiusername, password: apipassword };
		} else if (authType === 'apikey') {
			axioscall.config = { headers: { Authorization: `Bearer ${keyvalue}` } };
		}
		axios(axioscall)
			.then((response) => {
				//console.log(response.data);
				setAPIResponse(response.data);
			})
			.catch((error) => {
				//console.log('error', error.response);
				setAPIResponse(error.response);
			});
	}
	//console.log('curlRequest', curlRequest);
	console.log('updated request', curlRequest);

	let nodeSnippetData = {
		url: 'http://petstore.swagger.io/v2/pet',
		verb: 'POST',
		body: {
			id: 0,
			category: { id: 0, name: 'string' },
			name: 'doggie',
			photoUrls: ['string'],
			tags: [{ id: 0, name: 'string' }],
			status: 'available',
		},
	};

	return (
		<div className='flex-50 dark h100'>
			<div className='content'>
				<div className='code'>
					<div className='code-label'>Definition</div>
					<div className='code-placeholder'>
						<span>{props.verb && props.verb.toUpperCase()}</span>
						{props.baseUrl + '' + props.endpointPath}
					</div>
				</div>
				<div className='code'>
					<div className='code-label'>Authentication</div>
					<div className='code-placeholder'>
						<div className='code-placeholder__authType'>
							<div className='code-placeholder__authType'>
								<select
									name='authType'
									onChange={(e) => setAuthType(e.currentTarget.value)}
									className='dropdown'
									placeholder='Select Auth type'>
									<option value=''>Select Auth type</option>
									<option value='apikey'>API Key</option>
									<option value='basicauth'>Basic auth</option>
								</select>
							</div>
							<div
								className={
									authType === 'apikey'
										? 'code-placeholder__authValue_apikey'
										: 'code-placeholder__authValue_apikey hidden'
								}>
								<div className='code-placeholder__authValue_input'>Token</div>
								<div className='code-placeholder__authValue_input'>
									<input
										type='text'
										name='keyvalue'
										placeholder='Value'
										value={keyvalue}
										onChange={(e) => setAuthKeyValue(e.currentTarget.value)}
									/>
								</div>
							</div>
							<div
								className={
									authType === 'basicauth'
										? 'code-placeholder__authValue_basicauth'
										: 'code-placeholder__authValue_basicauth  hidden'
								}>
								<div className='code-placeholder__authValue_input'>
									<input
										type='text'
										name='apiusername'
										placeholder='username'
										value={apiusername}
										onChange={(e) => setAuthUsername(e.currentTarget.value)}
									/>
								</div>
								<div className='code-placeholder__authValue_input'>
									<input
										type='text'
										name='apipassword'
										placeholder='password'
										value={apipassword}
										onChange={(e) => setAuthPassword(e.currentTarget.value)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='code'>
					<div className='code-label'>Parameters</div>
					{model ? (
						<>
							<div className={allowEditing ? 'code-placeholder' : 'code-placeholder hidden'}>
								<div className='code-placeholder__paramBody'>
									<textarea
										className='paramBody'
										ref={parameterBodyRef}
										defaultValue={JSON.stringify(model, null, 2)}
										cols={40}
										rows={10}
									/>
								</div>
								<div className='code-placeholder__paramBodyBtn'>
									<button
										type='button'
										className='code-placeholder__button'
										onClick={saveParameterBody}>
										Save
									</button>
									<button type='submit' onClick={cancelEditingParam}>
										Cancel
									</button>
								</div>
							</div>

							<div className={allowEditing ? 'code-placeholder hidden' : 'code-placeholder'}>
								<button type='button' className='code-placeholder__button' onClick={editParameterBody}>
									Edit
								</button>

								<pre className='language-js line-numbers'>
									<code
										className='language-js'
										dangerouslySetInnerHTML={{ __html: JSON.stringify(bodyText, null, 2) }}
									/>
								</pre>
							</div>
						</>
					) : (
						<div className='code-placeholder'>No parameter</div>
					)}
				</div>

				<div className='code'>
					<div className='code-label'>Example Request</div>
					{!allowEditing ? (
						<>
							<div className='code-placeholder mt-20'>{curlRequest}</div>
							<button type='button' onClick={copyCurlCommand}>
								Copy
							</button>
							<textarea defaultValue={curlRequest} className='visually-hidden' />
						</>
					) : (
						'Save params to generate curl request'
					)}
				</div>

				<div className='code'>
					<div className='code-label'>Live Response</div>
					<div className='code-placeholder'>
						<button type='submit' className='app-btn' onClick={callApiEndPoint}>
							Try Request!
						</button>
						<pre className='language-js line-numbers'>
							<code
								className='language-js'
								dangerouslySetInnerHTML={{
									__html: decodeURIComponent(generateNodejsCodeSnippet(nodeSnippetData))
								}}
							/>
						</pre>
					</div>
					<div className={apiresponse ? 'code-placeholder mt-20' : 'code-placeholder mt-20 hidden'}>
						<pre className='language-js line-numbers'>
							<code
								className='language-js'
								dangerouslySetInnerHTML={{ __html: JSON.stringify(apiresponse, null, 2) }}
							/>
						</pre>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SwaggerAPIPlayground;
