import axios from 'axios';
import React, { useMemo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Table } from '../../components/Components';

const MahasiswaMbkm = () => {
	const [data, setData] = useState([]);

	// Using useEffect to call the API once mounted and set the data
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

			// localStorage.setItem('adminInfo', JSON.stringify(data));
			console.log(data);
		})();
	}, []);

	const columns = useMemo(
		() => [
			{
				Header: 'No',
				id: 'index',
				accessor: (_row: any, i: number) => i + 1,
			},
			{
				Header: 'NIM',
				accessor: 'nim',
			},
			{
				Header: 'Nama Lengkap',
				accessor: 'fullName',
			},
			{
				Header: 'SK Mitra',
				accessor: 'skMitra',
			},
			{
				Header: 'Borang Konversi',
				accessor: '',
			},
			{
				Header: 'Logsheet Harian',
				accessor: 'show.runtime',
			},
			{
				Header: 'Laporan Akhir',
				accessor: 'show.status',
			},
		],
		[]
	);

	return (
		<div>
			<Helmet>
				<title>Mahasiswa MBKM | ADMIN Lapor MBKM </title>
			</Helmet>

			<h2 className="mb-1">Mahasiswa MBKM</h2>
			<hr className="mb-1" />

			{data.length > 0 ? (
				<Table columns={columns} data={data} />
			) : (
				<p>Data tidak tersedia!</p>
			)}
		</div>
	);
};

export default MahasiswaMbkm;
