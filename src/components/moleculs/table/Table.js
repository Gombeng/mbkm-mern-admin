import React, { useState } from 'react';
import { useFilters, useTable } from 'react-table';
import styled from 'styled-components';
import { Input } from '../../Components';

const Table = ({ columns, data }) => {
	// Use the useTable Hook to send the columns and data to build the table
	const {
		getTableProps, // table props from react-table
		getTableBodyProps, // table body props from react-table
		headerGroups, // headerGroups, if your table has groupings
		rows, // rows for the table based on the data passed
		prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
		setFilter, // The useFilter Hook provides a way to set the filter
	} = useTable(
		{
			columns,
			data,
		},
		useFilters
	);

	const [filterInput, setFilterInput] = useState('');

	// Update the state when input changes
	const handleFilterChange = (e) => {
		const value = e.target.value || undefined;
		setFilter('show.name', value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
		setFilterInput(value);
	};

	return (
		<div>
			{/* <Input
				className="border p-1 mb-1"
				value={filterInput}
				onChange={handleFilterChange}
				placeholder={'Search name'}
			/> */}
			<StyledTable {...getTableProps()} className="mb-1">
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
				{/* <tfoot>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
						</tr>
					))}
				</tfoot> */}
			</StyledTable>
		</div>
	);
};

export default Table;

const StyledTable = styled.table`
	width: 100%;

	border-collapse: collapse;
	font-size: 0.9em;
	font-family: sans-serif;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

	thead tr {
		background-color: #043175;
		color: #ffffff;
		text-align: left;
	}

	th,
	td {
		padding: 12px 15px;
	}

	tbody tr {
		border-bottom: 1px solid #dddddd;
	}

	tbody tr:nth-of-type(even) {
		background-color: #f3f3f3;
	}
	tbody tr:last-of-type {
		border-bottom: 2px solid #043175;
	}
`;
