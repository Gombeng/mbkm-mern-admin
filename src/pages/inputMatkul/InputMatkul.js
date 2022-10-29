import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';
import { Button, Input, Table } from '../../components/Components';

const InputMatkul = () => {
	const [loading, setLoading] = useState(false);
	const [code, setCode] = useState('');
	const [matkul, setMatkul] = useState('');
	const [name, setName] = useState('');

	const columns = useMemo(
		() => [
			{
				Header: 'No',
				id: 'index',
				accessor: (_row: any, i: number) => i + 1,
			},
			{
				Header: 'Kode Mata Kuliah',
				accessor: 'code',
			},
			{
				Header: 'Nama Mata Kuliah',
				accessor: 'name',
			},
		],
		[]
	);

	useEffect(() => {
		(async () => {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));

			const { data } = await axios.get(
				`http://localhost:8910/api/admin/getOne/${adminInfo?._id}`,
				config
			);

			setMatkul(data.subjects);

			localStorage.setItem('adminInfo', JSON.stringify(data));
			console.log(data.subjects);
		})();
	}, []);

	const submitHandler = async (e) => {
		// e.preventDefault();
		// ! dont forget to parse the json data
		const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));

		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			setLoading(true);

			const { data } = await axios.post(
				`http://localhost:8910/api/admin/input-matkul/${adminInfo?._id}`,
				{
					code,
					name,
				},
				config
			);

			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error.response);
			// setError(error.response.data.message);
		}
	};

	return (
		<div>
			<Helmet>
				<title>Input Mata Kuliah | ADMIN Lapor MBKM </title>
			</Helmet>

			<h2 className="mb-1">Input Mata Kuliah</h2>
			<hr className="mb-1" />

			{/* form untuk inputan kode cpmk dan deskcripsi cpmk beserta button submit */}
			<form action="" className="mb-1" onSubmit={submitHandler}>
				<Input
					value={code}
					onChange={(e) => setCode(e.target.value)}
					className="border p-1"
					placeholder="Kode Mata Kuliah"
				/>
				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="border p-1 mb-1"
					placeholder="Nama Mata Kuliah"
				/>

				<Button
					title={loading ? <ClipLoader size={20} /> : 'Submit'}
					className="button mr-1"
					type="submit"
				/>
			</form>

			<div className="mb-1">
				<h3 className="mb-1">Daftar Mata Kuliah Yang Sudah Diinput</h3>

				<hr className="mb-1" />

				{/* {matkul.length > 0
					? matkul.map(({ code, name }, index) => (
							<div key={index}>
								<p>
									{code} | {name}
								</p>
							</div>
					  ))
					: null} */}
				{matkul.length > 0 ? <Table columns={columns} data={matkul} /> : null}
			</div>
		</div>
	);
};

export default InputMatkul;
