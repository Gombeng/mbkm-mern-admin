import React from 'react';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
	const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
	// console.log(adminInfo);
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
