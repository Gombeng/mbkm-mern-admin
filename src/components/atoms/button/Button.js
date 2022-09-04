import React from 'react';
import styled from 'styled-components';

const Button = ({ title, ...rest }) => {
	return <ButtonSc {...rest}>{title}</ButtonSc>;
};

export default Button;

const ButtonSc = styled.button`
	all: unset;
	padding: 0.8rem 1.3rem;
	letter-spacing: 0.3px;
	background: #d0a616;
	border-radius: 0.3rem;
	cursor: pointer;
	transition: 0.3s ease;

	&.secondary {
		color: #fff;
		background: #043175;
	}

	&.outline {
		background: transparent;
	}

	&.notfound {
		color: #fff;
		background: #d0a616;
	}

	&:hover {
		background: #fff;
		color: #043175;
	}

	&.link {
		background: transparent;

		&:hover {
			color: #fff;
			text-decoration: underline;
		}
	}
`;
