import React, { useEffect } from 'react';
import axios from 'axios';
import PR from 'code-prettify';
console.log(PR);

const SwaggerAPIPlayground = (props) => {
	useEffect(() => {
		document.addEventListener('load', function () {
			PR.prettyPrint();
		});
	}, []);
	function callApiEndPoint() {
		console.log('api nd point called');
		axios({
			method: props.verb,
			url: props.baseUrl + '' + props.endpointPath,
			data: props.parameters && props.parameters.model,
		}).then((response) => {
			console.log('response', response);
		});
	}
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
					<div className='code-label'>Parameters</div>
					<div className='code-placeholder'>
						<pre className='prettyprint lang-js'>{props.parameters && JSON.stringify(props.parameters.model)}</pre>
					</div>
				</div>

				<div className='code'>
					<div className='code-label'>Live Response</div>
					<div className='code-placeholder'>
						<button type='submit' className='app-btn' onClick={callApiEndPoint}>
							Try Request!
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SwaggerAPIPlayground;
