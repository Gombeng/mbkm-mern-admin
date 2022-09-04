import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const ContainerItem = styled.div`
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;
`;

const Item = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	width: 6rem;
	height: 6rem;
	background-color: #244b6d;
	border-radius: 0.3rem;
`;

const Logsheet = () => {
	let week = 1;
	let days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

	return (
		<div>
			<Helmet>
				<title>Logsheet | Lapor MBKM</title>
			</Helmet>

			<div>
				<h2 className="mb-1">Upload Logsheet harian anda</h2>
				<hr className="mb-1" />

				<p className="mb-1">
					<strong>Minggu ke - {week++}</strong>
				</p>
				<ContainerItem className="mb-1">
					{days.map((day) => (
						<Item>{day}</Item>
					))}
				</ContainerItem>

				<p className="mb-1">
					<strong>Minggu ke - {week++}</strong>
				</p>
				<ContainerItem className="mb-1">
					{days.map((day) => (
						<Item>{day}</Item>
					))}
				</ContainerItem>
			</div>
		</div>
	);
};

export default Logsheet;
