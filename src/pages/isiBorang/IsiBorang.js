import React from 'react';
import { Helmet } from 'react-helmet';
import { Outlet, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
// import Select from 'react-select';
import styled from 'styled-components';
import { Button, FlexBox, Gap, Input } from '../../components/Components';

let options = [
	{
		value: 'adbo',
		label: 'Analisis Desain Berorientasi Objek',
	},
	{
		value: 'pemweb',
		label: 'Pemrograman Website',
	},
];

const IsiBorang = () => {
	let navigate = useNavigate();

	let changeUrl = (e) => {
		navigate(`${e}`);
	};

	return (
		<div>
			<Helmet>
				<title>Isi Borang | Lapor MBKM</title>
			</Helmet>

			<div>
				<FlexBox className="mb-1">
					<h2>Silahkan Upload borang MK yang akan dikonversi</h2>

					{/* <Container>
						<Select onChange={(e) => changeUrl(e.target.value)}>
							<option value="">--Silahkan Pilih MK--</option>
							{options.map((option) => (
								<option value={option.value}>{option.label}</option>
							))}
						</Select>
					</Container> */}
				</FlexBox>

				<hr className="mb-1" />

				<form className="">
					{/* {error && <Message className="mb-1 error">{error}</Message>} */}

					<Input
						// value={namaMK}
						// onChange={(e) => setNamaMK(e.target.value)}
						label="Nama Mata Kuliah"
						type="text"
						placeholder="Analisis Desain Berorientasi Objek"
						className="border-1 p-1"
					/>
					<Gap height={20} />

					<Input
						// value={password}
						// onChange={(e) => setPassword(e.target.value)}
						label="Borang"
						type="file"
						className="border-1 p-1"
						placeholder="********"
					/>
					<Gap height={20} />

					<Button
						// title={loading ? <ClipLoader size={20} /> : 'Upload Borang'}
						title="Upload Borang"
						className="button mr-1"
						type="submit"
					/>
				</form>

				{/* <Outlet /> */}
			</div>
		</div>
	);
};

// const Container = styled.div`
// 	position: relative;

// 	&::after {
// 		content: '';
// 		position: absolute;
// 		width: 0.5rem;
// 		height: 0.5rem;
// 		top: 39%;
// 		border: 2px solid rgb(0, 0, 0);
// 		border-left: 0;
// 		border-bottom: 0;
// 		left: calc(100% - 2rem);
// 		/* left: 2rem; */
// 		transform: rotate(135deg);
// 	}
// `;

// const Select = styled.select`
// 	all: unset;
// 	background-color: transparent;
// 	border: 2px solid black;
// 	border-radius: 0.3rem;
// 	padding: 1rem 3rem 1rem 1rem;
// 	cursor: pointer;

// 	option {
// 		cursor: pointer;
// 	}
// `;

export default IsiBorang;
