import React, { Fragment } from 'react';
import { render } from '@testing-library/react';

const QueryStringparameters = (props) => {
	console.log('string');
	if (props.schema && props.schema.length) {
		return props.schema.map((data, index) => {
			console.log('data', data);
			return (
				<div className='data-table__row'>
					<div className='flex-50 '>
						<div className='content'>
							<div className='data-table__subtitle'>Parameter</div>
						</div>
					</div>
					<div className='flex-50 '>
						<div className='content'>
							<div className='data-table__subtitle'>Description</div>
						</div>
					</div>
				</div>
			);
		});
	}
};

const SwaggerAPIDetails = (props) => {
	console.log('props', props);

	return (
		<div className='flex-50 h100'>
			<div className='content'>
				<div className='content-title'>
					{props.endPoint && props.endPoint.charAt(0).toUpperCase() + props.endPoint.slice(1)}
				</div>
				<div className='content-subtitle'>{props.verbData.length && props.verbData[0].data.summary}</div>
				<div className='content-desc'>{props.verbData.length && props.verbData[0].data.description}</div>
				<div className='data-table'>
					<div className='data-table__title'>Query String Parameters</div>
					{/*<QueryStringparameters schema={props.schema} />*/}
				</div>
			</div>
		</div>
	);
};

export default SwaggerAPIDetails;
