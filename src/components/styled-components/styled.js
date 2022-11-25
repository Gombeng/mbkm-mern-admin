import styled from 'styled-components';

export const FlexBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Table = styled.table`
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
