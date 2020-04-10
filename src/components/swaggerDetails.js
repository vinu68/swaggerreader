import React from 'react';

const SwaggerAPIDetails = (props) => {
	return (
		<div className='flex-50 h100'>
			<div className='content'>
				<div className='content-title'>
					{props.endPoint && props.endPoint.charAt(0).toUpperCase() + props.endPoint.slice(1)}
				</div>
				<div className='content-subtitle'>{props.verbData.length && props.verbData[0].data.summary }</div>
				<div className='content-desc'>{props.verbData.length && props.verbData[0].data.description }</div>
				<div className='data-table'>
					<div className='data-table__title'>Query String Parameters</div>
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
				</div>
			</div>
		</div>
	);
};

export default SwaggerAPIDetails;
