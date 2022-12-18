import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Button, Gap, Input, Message } from '../../components/Components';
import { LoginBg } from '../../assets/Assets';
import styled from 'styled-components';

const Login = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const adminInfo = localStorage.getItem('adminInfo');

		if (adminInfo) {
			navigate('/dashboard');
		}
	}, [navigate]);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			setLoading(true);

			const { data } = await axios.post(
				'http://localhost:8910/api/admins/login',
				{
					email,
					password,
				},
				config
			);

			console.log(data.data);

			localStorage.setItem('adminInfo', JSON.stringify(data.data));
			setLoading(false);
			navigate('/dashboard');
		} catch (error) {
			setLoading(false);
			console.log(error.response);
			setError(error.response.data.message);
		}
	};

	return (
		<Container>
			<Helmet>
				<title>Masuk | ADMIN Lapor MBKM</title>
			</Helmet>

			<div className="left">
				<img src={LoginBg} alt="background" className="bg" />
			</div>

			<form className="right" onSubmit={submitHandler}>
				<h3 className="mb-1">Silahkan Masuk</h3>

				{error && <Message className="mb-1 error">{error}</Message>}

				<Input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					label="Email"
					type="email"
					placeholder="user@gmail.com"
				/>
				<Gap height={20} />

				<Input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					label="Kata Sandi"
					type="password"
					placeholder="********"
				/>
				<Gap height={20} />

				<div>
					<Button
						title={loading ? <ClipLoader size={20} /> : 'Masuk'}
						className="button mr-1"
						type="submit"
					/>
				</div>
			</form>
		</Container>
	);
};

export default Login;

const Container = styled.div`
	display: flex;
	min-height: 100vh;

	.left,
	.right {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.left {
		flex: 2;
		background: #b6c2ff;

		.bg {
			max-width: 70%;
		}
	}

	.right {
		padding: 2rem;
		flex: 1;
		color: #fff;
		flex-direction: column;
		background: #043175;
		align-items: flex-start;

		.bg {
			width: 5rem;
			border-radius: 50%;
		}
	}

	.mr-1 {
		margin-right: 1rem;
	}
`;
