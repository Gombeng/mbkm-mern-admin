import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '../../components/Components';

const Dashboard = () => {
	let adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
	return (
		<div>
			<Helmet>
				<title>Dashboard | ADMIN Lapor MBKM</title>
			</Helmet>
			<div className="mb-1">
				<h2>Selamat datang, {adminInfo?.fullName}!</h2>
				<p>{adminInfo?.email}</p>
			</div>
		</div>
	);
};

export default Dashboard;