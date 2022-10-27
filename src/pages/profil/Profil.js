import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Button, Input } from '../../components/Components';

const Profil = () => {
	let adminInfo = JSON.parse(localStorage.getItem('adminInfo'));

	return (
		<div>
			<Helmet>
				<title>Profil | ADMIN Lapor MBKM </title>
			</Helmet>

			<h2 className="mb-1">Profil</h2>
			<hr className="mb-1" />

			<Flexbox>
				<Container className="p-1">
					<div className="mb-1">
						<p>Nama Lengkap</p>
						<strong>{adminInfo?.fullName}</strong>
					</div>
					<div className="mb-1">
						<p>Email</p>
						<strong>{adminInfo?.email}</strong>
					</div>
				</Container>
			</Flexbox>
		</div>
	);
};

const Container = styled.div`
	flex: 1;
`;
const Flexbox = styled.div`
	display: flex;
`;

export default Profil;
