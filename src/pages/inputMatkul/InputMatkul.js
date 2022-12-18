import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';
import { Button, Input, Table } from '../../components/Components';

const InputMatkul = () => {
	const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
	const [loading, setLoading] = useState(false);
	const [code, setCode] = useState('');
	const [matkul, setMatkul] = useState('');
	const [name, setName] = useState('');

	useEffect(() => {
		const fetchMatkul = async () => {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};
			const { data } = await axios.get(
				`http://localhost:8910/api/admins/subjects/${adminInfo?._id}`,
				config
			);
			console.log('subjects', data.data.idSubjects);
			setMatkul(data.data.idSubjects);
		};
		fetchMatkul();
	}, [adminInfo?._id]);

	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	const submitHandler = async (e) => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`http://localhost:8910/api/admins/input-matkul/${adminInfo?._id}`,
				{
					code,
					name,
				},
				config
			);
			console.log(data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error.response);
			// setError(error.response.data.message);
		}
	};

	const deleteHandler = async (e) => {
		setLoading(true);
		let confirmBox = window.confirm('Hapus Mata Kuliah?');
		if (confirmBox) {
			await axios
				.delete(`http://localhost:8910/api/admins/hapus-subject/${e}`, config)
				.then((data) => {
					console.log(data);
					setLoading(false);
				})
				.catch((err) => {
					setLoading(false);
					console.log(err);
				});
		}
		window.location.reload();
	};

	let i = 1;
	return (
		<div>
			<Helmet>
				<title>Input Mata Kuliah | ADMIN Lapor MBKM </title>
			</Helmet>

			<p className="mb-1">Input Kode dan nama Mata Kuliah</p>

			<form action="" className="mb-1" onSubmit={submitHandler}>
				<Input
					value={code}
					onChange={(e) => setCode(e.target.value)}
					className="p-1"
					placeholder="Kode Mata Kuliah"
				/>
				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="p-1 mb-1"
					placeholder="Nama Mata Kuliah"
				/>

				<Button
					title={loading ? <ClipLoader size={20} /> : 'Submit'}
					className="button mr-1"
					type="submit"
				/>
			</form>

			<p className="mb-1">Daftar Mata Kuliah Yang Sudah Diinput</p>

			<Table className="mb-1">
				<thead>
					<tr>
						<th style={{ width: '3rem' }}>No</th>
						<th style={{ width: '10rem' }}>Kode</th>
						<th style={{ width: '' }}>Nama</th>
						<th style={{ width: '5rem' }}>Aksi</th>
					</tr>
				</thead>
				<tbody>
					{!matkul?.length ? (
						<tr>
							<td colSpan={3}>Mata Kuliah belum diinput.</td>
						</tr>
					) : (
						matkul?.map(({ _id, code, name }) => (
							<tr key={_id}>
								<td>{i++}</td>
								<td>{code}</td>
								<td>{name}</td>

								<td>
									{/* <p style={{ padding: '.3rem' }}>Edit</p> */}
									<DelButton onClick={() => deleteHandler(_id)}>
										Hapus
									</DelButton>
								</td>
							</tr>
						))
					)}
				</tbody>
			</Table>
		</div>
	);
};

export default InputMatkul;

const DelButton = styled.button`
	all: unset;
	padding: 0.8rem 1rem;
	cursor: pointer;
	background-color: #d0a616;
	border-radius: 0.3rem;
`;
