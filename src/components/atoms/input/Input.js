import React from 'react';
import styled from 'styled-components';

const Input = ({ label, ...rest }) => {
	return (
		<Container>
			<p className="label">{label}</p>
			<input className="input" {...rest} required />
		</Container>
	);
};

export default Input;

const Container = styled.div`
	display: grid;
	min-width: 100%;

	.label {
		font-size: 1rem;
		margin-bottom: 0.3rem;
	}

	.input {
		all: unset;
		background: #fff;
		color: #000;
		padding: 0.8rem 1rem;
		border-radius: 0.3rem;
		cursor: text;
	}
`;
