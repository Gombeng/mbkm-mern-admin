import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';
import { Button, Input } from '../../components/Components';

const rps = [
	{
		id: 1,
		name: 'Perancangan dan Analisis Algoritma',
		code: 'INF11011',
		cpl: [
			{
				id: 1,
				code: 'S8',
				name: 'Menunjukkan sikap bertanggungjawab atas pekerjaan di bidang keahliannya secara mandiri',
			},
			{
				id: 2,
				code: 'S11',
				name: 'Memiliki Tekad/Kesungguhan dalam mencapai hasil yang maksimal',
			},
			{
				id: 3,
				code: 'KU1',
				name: 'Mampu menerapkan pemikiran logis, kritis, sistematis, dan inovatif dalam konteks pengembangan atau implementasi ilmu pengetahuan dan teknologi yang memperhatikan dan menerapkan nilai humaniora yang sesuai dengan bidang keahliannya',
			},
		],
	},
];

const Isirps = () => {
	const [loading, setLoading] = useState(false);

	return (
		<div>
			<Helmet>
				<title>Isi RPS | ADMIN Lapor MBKM </title>
			</Helmet>

			<h2 className="mb-1">Isi RPS</h2>
			<hr className="mb-1" />

			{/* form untuk inputan kode cpmk dan deskcripsi cpmk beserta button submit */}
			<form action="" className="mb-1">
				<Input className="border p-1" placeholder="Kode CPL" />
				<Input className="border p-1 mb-1" placeholder="Deskripsi CPL" />

				<Button
					title={loading ? <ClipLoader size={20} /> : 'Submit'}
					className="button mr-1"
					type="submit"
				/>
			</form>

			<hr className="mb-1" />

			{/* tampilan informasi mengenai poin rps yang sudah diisi oleh dosen */}
			{rps.map(({ name, cpl }, index) => (
				<div key={index}>
					<h3>{name}</h3>

					{cpl.map(({ name, code }, index) => (
						<div className="mb-1">
							<strong>Kode CPL - {code}</strong>
							<p>{name}</p>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Isirps;

const Textarea = styled.textarea`
	padding: 0.8rem 1rem;
	border-radius: 0.3rem;
	resize: vertical;
`;
