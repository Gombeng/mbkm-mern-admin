import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../../assets/Assets';
import { Button } from '../../Components';
import styled from 'styled-components';

const Header = () => {
	const navigate = useNavigate();

	const logOut = () => {
		let confirmBox = window.confirm('Logout?');
		if (confirmBox) {
			localStorage.clear();
			navigate('/login');
		}
	};

	return (
		<Container>
			<Flex>
				<img className="mr-1" src={Logo} width={30} alt="Logo" />
				<p>Lapor MBKM | Admin</p>
			</Flex>
			<Button title="Keluar" className="button link" onClick={logOut} />
		</Container>
	);
};

export default Header;

const Flex = styled.div`
	display: flex;
	align-items: center;
`;

const Container = styled.div`
	/* position: sticky;
	top: 0; */
	padding: 0 2rem;
	display: flex;
	background: #043175;
	color: #fff;
	min-height: 10vh;
	justify-content: space-between;
	align-items: center;
`;
