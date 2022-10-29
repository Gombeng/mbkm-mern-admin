import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';
import { Button, Input } from '../../components/Components';

const subjects = [
	{
		id: 1,
		code: 1234,
		name: 'Pemrograman Website',
	},
	{
		id: 2,
		code: 1234,
		name: 'Pemrograman Jaringan',
	},
	{
		id: 3,
		code: 1234,
		name: 'Pemrograman Berorientasi Objek',
	},
];

const InputMatkul = () => {
	const [loading, setLoading] = useState(false);

	return (
		<div>
			<Helmet>
				<title>Input Mata Kuliah | ADMIN Lapor MBKM </title>
			</Helmet>

			<h2 className="mb-1">Input Mata Kuliah</h2>
			<hr className="mb-1" />

			{/* form untuk inputan kode cpmk dan deskcripsi cpmk beserta button submit */}
			<form action="" className="mb-1">
				<Input className="border p-1" placeholder="Kode Mata Kuliah" />
				<Input className="border p-1 mb-1" placeholder="Nama Mata Kuliah" />

				<Button
					title={loading ? <ClipLoader size={20} /> : 'Submit'}
					className="button mr-1"
					type="submit"
				/>
			</form>

			<div className="mb-1">
				<h3 className="mb-1">Daftar Mata Kuliah Yang Sudah Diinput</h3>

				<hr className="mb-1" />

				{subjects.map(({ code, name }, index) => (
					<div key={index} className="mb-1">
						<p>
							<span>{code}</span> | {name}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default InputMatkul;
