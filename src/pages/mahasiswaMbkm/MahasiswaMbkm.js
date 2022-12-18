import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Table } from './../../components/Components';

const MahasiswaMbkm = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchStudent = async () => {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};
			const { data } = await axios.get(
				`http://localhost:8910/api/students`,
				config
			);
			console.log('student', data.data);
			setData(data.data);
		};
		fetchStudent();
	}, []);

	let i = 1;

	return (
		<div>
			<Helmet>
				<title>Mahasiswa MBKM | SUPER ADMIN Lapor MBKM </title>
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
					{!data?.length ? (
						<tr>
							<td colSpan={3}>Data kosong</td>
						</tr>
					) : (
						data?.map(({ _id, nim, fullName, skAcc }) => (
							<tr key={_id}>
								<td>{i++}</td>
								<td>{nim}</td>
								<td>{fullName}</td>
								<td>{skAcc ? 'Uploaded' : 'Belum'}</td>
								<td>
									<Link
										key={_id}
										style={{ color: 'black', textDecoration: 'none' }}
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
						))
					)}
				</tbody>
			</Table>
		</div>
	);
};

export default MahasiswaMbkm;
