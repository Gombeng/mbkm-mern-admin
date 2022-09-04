import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Footer, Header } from '../../components/Components';

const MainApp = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const mhsInfo = localStorage.getItem('mhsInfo');

		if (!mhsInfo) {
			navigate('/login');
		}
	}, [navigate]);

	return (
		<div>
			<Header />
			<Container>
				<div className="sidenav">
					<NavLink
						className={({ isActive }) => (isActive ? 'link active' : 'link')}
						to="dashboard"
					>
						Dashboard
					</NavLink>
					<NavLink
						className={({ isActive }) => (isActive ? 'link active' : 'link')}
						to="upload-sk"
					>
						Upload SK
					</NavLink>
					<NavLink
						className={({ isActive }) => (isActive ? 'link active' : 'link')}
						to="isi-borang"
					>
						Isi borang
					</NavLink>
					<NavLink
						className={({ isActive }) => (isActive ? 'link active' : 'link')}
						to="logsheet"
					>
						Logsheet
					</NavLink>
					<NavLink
						className={({ isActive }) => (isActive ? 'link active' : 'link')}
						to="profil"
					>
						Profil
					</NavLink>
				</div>

				<div className="content">
					<Outlet />
				</div>
			</Container>
			<Footer />
		</div>
	);
};

export default MainApp;

const Container = styled.div`
	display: flex;
	min-height: 90vh;

	.sidenav {
		display: flex;
		flex-direction: column;
		min-width: 15rem;
		background: #b6c2ff;
		color: #fff;
		background: #043175;

		.link {
			color: #fff;
			padding: 1rem 2rem;
			text-decoration: none;
			transition: 0.3s;

			&.active {
				color: #000;
				font-weight: bold;
				background: #d0a616;
				position: relative;

				&::after {
					content: '';
					position: absolute;
					width: 0.5rem;
					height: 0.5rem;
					top: 39%;
					border: 3px solid rgb(0, 0, 0);
					border-left: 0;
					border-bottom: 0;
					left: calc(100% - 1rem - 0.3rem);
					transform: rotate(45deg);
				}
			}
		}
	}
	.content {
		flex: 1;
		padding: 1rem;
	}
`;
