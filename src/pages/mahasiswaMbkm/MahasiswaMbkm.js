import axios from 'axios';
import React, { useMemo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Table } from '../../components/Components';

const MahasiswaMbkm = () => {
	const [data, setData] = useState([]);

	// Using useEffect to call the API once mounted and set the data
	useEffect(() => {
		(async () => {
			const result = await axios('https://api.tvmaze.com/search/shows?q=snow');
			setData(result.data);
			console.log(result.data);
		})();
	}, []);

	const columns = useMemo(
		() => [
			{
				Header: 'NIM',
				accessor: 'show.name',
			},
			{
				Header: 'Nama Lengkap',
				accessor: 'show.type',
			},
			{
				Header: 'SK Mitra',
				accessor: 'show.language',
			},
			{
				Header: 'Borang Konversi',
				accessor: 'show.genres',
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

			<Table columns={columns} data={data} />
		</div>
	);
};

export default MahasiswaMbkm;
