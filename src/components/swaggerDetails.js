import React, { Fragment } from 'react';
import { render } from '@testing-library/react';

const QueryStringparameters = (props) => {
	if (props.schema && Object.keys(props.schema).length) {
		return Object.keys(props.schema).map((data, index) => {
			let dataKey = data;
			let tempData = dataKey.split('');
			tempData[0] = tempData[0].toUpperCase()
			dataKey = tempData.join('');
			if (props['schema'][data].length || props['schema'][data][dataKey]) {
				return (
					<Fragment key={index}>
						<div className='data-table__title'>Query String Parameters: {dataKey}</div>
						<div className='data-table__wrapper'>
							<DataTableHeader schema={props.schema}/>
							<TableData dataTable={props['schema'][data]} dataKey={dataKey}/>
						</div>
					</Fragment>
				);
			}
		});
	} else {
		return null
	}
};


const Responses = (props) => {
	console.log("Responses props>", props);
	if (props.responses && Object.keys(props.responses).length) {
		return Object.keys(props.responses).map((data, index) => {
			return (
				<Fragment key={index}>
					<div className='data-table__row' key={index}>
						<div className='flex-50 '>
							<div className='content'>
								<div className='data-table__data'>{data}</div>
							</div>
						</div>
						<div className='flex-50 '>
							<div className='content'>
								<div className='content'>
									<div className='data-table__data'>{props['responses'][data]['description']}</div>
								</div>
							</div>
						</div>
					</div>
				</Fragment>
			);
		});
	} else {
		return null
	}
};

const TableData = (props) => {
	// console.log("props TableData:", props);
	let dataTable = null,
		dataKey = props.dataKey;
	if (props.dataTable && props.dataTable.length) {
		dataTable =props.dataTable
	}else if(props.dataTable && Object.keys(props.dataTable).length){
		dataTable = props['dataTable'][dataKey]
	}
	if (dataTable) {
		return dataTable.map((data, index) => {
			console.log("data:",dataTable[index]);
			return (
			<div className='data-table__row' key={index}>
				<div className='flex-50 '>
					<div className='content'>
						<div className='data-table__data'>{dataTable[index]['name']}</div>
					</div>
				</div>
				<div className='flex-50 '>
					<div className='content'>
						<div className='data-table__data'>
							{dataTable[index]['data'] !==''
							?	dataTable[index]['data']['description']
								? dataTable[index]['data']['description']
								: "------" 
							: dataTable[index]['name'] }
							{ dataTable[index]['data'] ==='' ? " (Schema for this field is defined below.)":null}
							<span>
								-- {dataTable[index]['data']['type']}
							</span>
						</div>
					</div>
				</div>
			</div>
			)
		});
	} else {
		return null
	}
}

const DataTableHeader = (props) => {
	if (props.schema && Object.keys(props.schema).length) {
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
	}else {
		return null
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
				<div className='content-url'>
					<strong>Basepath:</strong> {props.baseUrlPath}
				</div>
				<div className='data-table'>
					<QueryStringparameters schema={props.schema} />
					{ props.responses
						?<Fragment>
							<div className='data-table__title'>Response:</div>
							<div className='data-table__wrapper'>
								<div className='data-table__row'>
									<div className='flex-50 '>
										<div className='content'>
											<div className='data-table__subtitle'>Code</div>
										</div>
									</div>
									<div className='flex-50 '>
										<div className='content'>
											<div className='data-table__subtitle'>Description</div>
										</div>
									</div>
								</div>
								<Responses responses={props.responses}/>
							</div>
						</Fragment>
						: null}
				</div>
			</div>
		</div>
	);
};

export default SwaggerAPIDetails;
