import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Button, Input } from '../../components/Components';
import { ClipLoader } from 'react-spinners/ClipLoader';

const Profil = () => {
	const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
	const [loading, setLoading] = useState(false);

	return (
		<div>
			<Helmet>
				<title>Profil | SUPER ADMIN Lapor MBKM </title>
			</Helmet>

			<h3 className="mb-1">Profil</h3>
			<hr className="mb-1" />

			<div className="mb-1">
				<p>Nama Lengkap</p>
				<strong>{adminInfo?.fullName}</strong>
			</div>
			<div className="mb-1">
				<p>Email</p>
				<strong>{adminInfo?.email}</strong>
			</div>

			<Button
				title={loading ? <ClipLoader size={20} /> : 'Edit'}
				className="button mr-1"
				type="submit"
			/>
		</div>
	);
};

export default Profil;
