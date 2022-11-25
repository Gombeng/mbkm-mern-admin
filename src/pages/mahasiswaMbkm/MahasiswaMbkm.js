import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Table } from './../../components/Components';

const MahasiswaMbkm = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		(async () => {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			const { data } = await axios.get(
				`http://localhost:8910/api/student/getAll`,
				config
			);

			setData(data);
		})();
	}, []);

	let i = 1;

	return (
		<div>
			<Helmet>
				<title>Mahasiswa MBKM | ADMIN Lapor MBKM </title>
			</Helmet>

			<h3 className="mb-1">Mahasiswa MBKM</h3>
			<hr className="mb-1" />
			<Table className="mb-1">
				<thead>
					<tr>
						<th style={{ width: '3rem' }}>No</th>
						<th style={{ width: '9rem' }}>NIM</th>
						<th style={{ width: '' }}>Nama</th>
						<th style={{ width: '' }}>SK Mitra</th>
						<th style={{ width: '' }}>Detail</th>
					</tr>
				</thead>
				<tbody>
					{data.length &&
						data?.map(({ _id, nim, fullName, skAcc }) => (
							<tr key={_id}>
								<td>{i++}</td>
								<td>{nim}</td>
								<td>{fullName}</td>
								<td>
									{skAcc ? 'Uploaded' : 'Belum'}
									<hr style={{ margin: '.5rem 0' }} />
									<p>approve/not</p>
								</td>
								<td>
									<Link
										style={{ color: 'black', textDecoration: 'none' }}
										key={_id}
										to={`/mahasiswa-mbkm/detail/${_id}`}
									>
										<p
											style={{
												padding: '.8rem 1rem',
												backgroundColor: '#d0a616',
												borderRadius: '.3rem',
												width: 'fit-content',
											}}
										>
											Detail
										</p>
									</Link>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
		</div>
	);
};

export default MahasiswaMbkm;

const DelButton = styled.button`
	all: unset;
	padding: 0.8rem 1rem;
	cursor: pointer;
	background-color: #d0a616;
	border-radius: 0.3rem;
`;
