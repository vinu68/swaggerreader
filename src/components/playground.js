import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view';

const SwaggerAPIPlayground = (props) => {
	let [authType, setAuthType] = useState('');
	let [key, setAuthKey] = useState('');
	let [keyvalue, setAuthKeyValue] = useState('');
	let [apiusername, setAuthUsername] = useState('');
	let [apipassword, setAuthPassword] = useState('');
	let [apiresponse, setAPIResponse] = useState('');

	useEffect(() => {
		//PR.prettyPrint();
	}, []);
	function callApiEndPoint() {
		let axioscall = {};
		axioscall.method = props.verb;
		axioscall.url = props.baseUrl + '' + props.endpointPath;
		axioscall.data = props.parameters && props.parameters.model;
		if (authType === 'basicauth') {
			axioscall.auth = { username: apiusername, password: apipassword };
		} else if (authType === 'apikey') {
			axioscall.auth = { username: key, password: keyvalue };
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
	let model = props.parameters && props.parameters.model;

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
								<div className='code-placeholder__authValue_input'>
									<input
										type='text'
										name='key'
										placeholder='Key'
										value={key}
										onChange={(e) => setAuthKey(e.currentTarget.value)}
									/>
								</div>
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
					<div className='code-placeholder'>
						<ReactJson src={model} theme='monokai' />
					</div>
				</div>

				<div className='code'>
					<div className='code-label'>Live Response</div>
					<div className='code-placeholder'>
						<button type='submit' className='app-btn' onClick={callApiEndPoint}>
							Try Request!
						</button>
					</div>
					<div className={apiresponse ? 'code-placeholder mt-20' : 'code-placeholder mt-20 hidden'}>
						<ReactJson src={apiresponse} theme='monokai' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SwaggerAPIPlayground;
