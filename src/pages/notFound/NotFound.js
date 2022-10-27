import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { NotFoundBg } from '../../assets/Assets';
import { Button } from '../../components/Components';
import styled from 'styled-components';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<Container>
			<Helmet>
				<title>Not Found | ADMIN Lapor MBKM</title>
			</Helmet>
			<h1 className="mb-1">Page Not Found</h1>
			<img className="mb-1" src={NotFoundBg} alt="Page Not Found" />

			<Button
				title="Back to Dashboard"
				className="button notfound"
				onClick={() => navigate('/dashboard')}
			/>
		</Container>
	);
};

export default NotFound;

const Container = styled.div`
	height: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	img {
		max-width: 30%;
	}
`;
