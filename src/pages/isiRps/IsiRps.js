import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';
import { Button, Input, Table } from '../../components/Components';

const Isirps = () => {
	const columns = useMemo(
		() => [
			{
				Header: 'No',
				id: 'index',
				accessor: (_row: any, i: number) => i + 1,
			},
			{
				Header: 'Kode CPL',
				accessor: 'code',
			},
			{
				Header: 'Deskripsi CPL',
				accessor: 'name',
			},
			{
				Header: 'Aksi',
				// accessor: 'name',
			},
		],
		[]
	);

	const [data, setData] = useState([]);
	const [subject, setSubject] = useState('');
	const [name, setName] = useState('');
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);

	console.log('data matkul', data);

	useEffect(() => {
		(async () => {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			const { data } = await axios.get(
				`http://localhost:8910/api/admin/getAll/cpmks`,
				config
			);

			console.log(data.data);

			setData(data.data);

			// localStorage.setItem('subjectInfo', JSON.stringify(data));
		})();
	}, []);

	const submitHandler = async (e) => {
		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			setLoading(true);

			const { data } = await axios.post(
				`http://localhost:8910/api/admin/input-rps/${subject}`,
				{
					code,
					name,
				},
				config
			);

			console.log(data.data);

			// localStorage.setItem('adminInfo', JSON.stringify(data.0`data));
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error.response);
			// setError(error.response.data.message);
		}
	};

	let i = 1;

	return (
		<div>
			<Helmet>
				<title>Isi RPS | ADMIN Lapor MBKM </title>
			</Helmet>

			<h3 className="mb-1">Isi RPS</h3>
			<hr className="mb-1" />

			<form className="mb-1" onSubmit={submitHandler}>
				<Select
					className=" p-1"
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
					required
				>
					<option value="">-- Pilih Mata Kuliah --</option>
					{data?.map(({ _id, name }) => (
						<option value={_id}>{name}</option>
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

			<hr className="mb-1" />

			{/* tampilan informasi mengenai poin rps yang sudah diisi oleh dosen */}
			{data.length &&
				data?.map(({ name, _cpmks }, index) => (
					<div key={index}>
						<h3>{name}</h3>

						<Table className="mb-1">
							<thead>
								<tr>
									<th style={{ width: '5rem' }}>No</th>
									<th style={{ width: '10rem' }}>Kode CPL</th>
									<th style={{ width: '' }}>Deskripsi CPL</th>
									<th style={{ width: '' }}>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{_cpmks.length &&
									_cpmks?.map(({ _id, code, name }) => (
										<tr key={_id}>
											<td>{i++}</td>
											<td>{code}</td>
											<td>{name}</td>
										</tr>
									))}
							</tbody>
						</Table>
					</div>
				))}
		</div>
	);
};

export default Isirps;

const Select = styled.select`
	cursor: pointer;
	width: 100%;
	outline: none;
	/* padding: 0.8rem 1rem; */
	border-radius: 0.3rem;
`;
