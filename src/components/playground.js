import React from 'react';
import axios from 'axios';

const SwaggerAPIPlayground = () => {
	function callApiEndPoint() {
		console.log('api nd point called');
	}
	return (
		<div className='container'>
			<div className='row d-block'>
				<div>Definition</div>
				<div>PUT https:google.com</div>
			</div>
			<div className='row row d-block'>
				<div>Parameters</div>
				<div>Params</div>
			</div>
			<div className='row row d-block'>
				<div>Live Response</div>
				<div>
					<button type='submit' className='btn btn-primary' onClick={callApiEndPoint}>
						Try this request
					</button>
				</div>
			</div>
		</div>
	);
};

export default SwaggerAPIPlayground;
