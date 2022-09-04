import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '../../components/Components';

const Dashboard = () => {
	let mhsInfo = JSON.parse(localStorage.getItem('mhsInfo'));
	return (
		<div>
			<Helmet>
				<title>Dashboard | Lapor MBKM</title>
			</Helmet>
			<div className="mb-1">
				<h2>Selamat datang, {mhsInfo.fullName}!</h2>
				<p>Nim {mhsInfo.nim}</p>
				<p>Jangan lupa isi borangnya hehe!</p>
			</div>

			<div className="mb-1">
				<h2>Todo</h2>
				<li>
					Upload Surat Keterangan diterima Mitra{' '}
					<Button className="button" title="Upload SK" />
				</li>
				<li>Isi borang penyetaraan mata kuliah</li>
				<li>Isi Logsheet Harian</li>
			</div>
		</div>
	);
};

export default Dashboard;
