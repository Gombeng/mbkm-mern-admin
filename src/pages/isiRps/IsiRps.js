import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';
import { Button, Input, Table } from '../../components/Components';

const Isirps = () => {
	const [data, setData] = useState([]);
	const [subject, setSubject] = useState('');
	const [name, setName] = useState('');
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchCpmk = async () => {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};
			const { data } = await axios.get(
				`http://localhost:8910/api/admins/getAll/cpmks`,
				config
			);
			console.log('cpmks', data.data);
			setData(data.data);
		};
		fetchCpmk();
	}, []);

	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	const submitHandler = async (e) => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`http://localhost:8910/api/admins/input-rps/${subject}`,
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
		let confirmBox = window.confirm('Hapus RPS?');
		if (confirmBox) {
			await axios
				.delete(`http://localhost:8910/api/admins/hapus-cpmk/${e}`, config)
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

	return (
		<div>
			<Helmet>
				<title>Isi RPS |  Lapor MBKM </title>
			</Helmet>

			<p className="mb-1">Input RPS Mata Kuliah</p>

			{!data?.length ? (
				<p className="mb-1">-- Mata Kuliah belum diinput --</p>
			) : (
				<>
					<form className="mb-1" onSubmit={submitHandler}>
						<Select
							className=" p-1"
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
							required
						>
							<option value="">-- Pilih Mata Kuliah --</option>
							{data?.map(({ _id, name }) => (
								<option key={_id} value={_id}>
									{name}
								</option>
							))}
						</Select>

						<Input
							value={code}
							onChange={(e) => setCode(e.target.value)}
							className=" p-1"
							placeholder="Kode CPL"
						/>
						<Input
							value={name}
							onChange={(e) => setName(e.target.value)}
							className=" p-1 mb-1"
							placeholder="Deskripsi CPL"
						/>

						<Button
							title={loading ? <ClipLoader size={20} /> : 'Submit'}
							className="button mr-1"
							type="submit"
						/>
					</form>

					{/* tampilan informasi mengenai poin rps yang sudah diisi oleh dosen */}
					{data?.length &&
						data?.map(({ name, idCpmks, i = 1 }, index) => (
							<div key={index}>
								<p style={{ marginBottom: '.5rem' }}>{name}</p>

								<Table className="mb-1">
									<thead>
										<tr>
											<th style={{ width: '3rem' }}>No</th>
											<th style={{ width: '10rem' }}>Kode CPL</th>
											<th style={{ width: '' }}>Deskripsi CPL</th>
											<th style={{ width: '5rem' }}>Aksi</th>
										</tr>
									</thead>
									<tbody>
										{!idCpmks?.length ? (
											<tr>
												<td colSpan={4}>RPS belum diisi</td>
											</tr>
										) : (
											idCpmks?.map(({ _id, code, name }) => (
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
						))}
				</>
			)}
		</div>
	);
};

export default Isirps;

const Select = styled.select`
	cursor: pointer;
	width: 100%;
	outline: none;
	border-radius: 0.3rem;
`;

const DelButton = styled.button`
	all: unset;
	padding: 0.8rem 1rem;
	cursor: pointer;
	background-color: #d0a616;
	border-radius: 0.3rem;
`;
