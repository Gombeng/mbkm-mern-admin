import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button, Table, FlexBox } from '../../../components/Components';
import { ClipLoader } from 'react-spinners/ClipLoader';

const DetailMhsMBKM = () => {
	const { idStudent } = useParams();
	const [student, setStudent] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const config = {
			headers: {
				'Content-type': 'application/json',
			},
		};

		async function fetchStudent() {
			const { data } = await axios.get(
				`http://localhost:8910/api/students/student-borangs/${idStudent}`,
				config
			);
			setStudent(data.data);
		}
		fetchStudent();
	}, [idStudent]);

	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	const handleAcc = async (e) => {
		await axios
			.post(
				`http://localhost:8910/api/students/acc-borang-by-admin/${e}`,
				config
			)
			.then((data) => {
				console.log(data);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
				window.location.reload();
			});
	};

	const handleDec = async (e) => {
		await axios
			.post(
				`http://localhost:8910/api/students/dec-borang-by-admin/${e}`,
				config
			)
			.then((data) => {
				console.log(data);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
				window.location.reload();
			});
	};

	let j = 1;

	return (
		<div>
			<Helmet>
				<title>Detail Mahasiswa MBKM | Lapor MBKM</title>
			</Helmet>

			<h3 className="mb-1">Detail Mahasiswa MBKM</h3>
			<hr className="mb-1" />

			<p className="mb-1">Nama : {student?.fullName}</p>
			<p className="mb-1">NIM : {student?.nim}</p>
			<p className="mb-1">
				Laporan Akhir :
				{!student?.laporanAkhir ? ' Belum Diupload' : <a href={student?.laporanAkhir}> {student?.laporanAkhir}</a> }
			</p>

			<h4 className="mb-1">Tabel Borang mahasiswa</h4>

			{student?.idBorangs?.map(
				({ _id, idAnswers, statusKajur, statusDosen, subject, i = 1 }) => (
					<div
						key={_id}
						// style={{ border: '1px solid black', padding: '1rem ' }}
						className="mb-1"
					>
						<FlexBox className="mb-1">
							<p>
								<strong>{statusDosen}</strong> - {subject}
							</p>

							<div>
								<Button
									title={loading ? <ClipLoader size={20} /> : 'Terima'}
									className="button mr-1"
									style={{
										background: '#25d253',
										marginRight: '1rem',
									}}
									onClick={() => handleAcc(_id)}
								/>

								<Button
									title={loading ? <ClipLoader size={20} /> : 'Tolak'}
									className="button mr-1"
									style={{
										background: '#d22525',
									}}
									onClick={() => handleDec(_id)}
								/>
							</div>
						</FlexBox>

						<Table className="mb-1">
							<thead>
								<tr>
									<th style={{ width: '3rem' }}>No</th>
									<th style={{ width: '25rem' }}>Deskripsi CPMK</th>
									<th style={{ width: '' }}>Jawaban Mahasiswa</th>
								</tr>
							</thead>
							<tbody>
								{idAnswers?.map(({ _id, name, answer, acc }) => (
									<tr key={_id}>
										<td>{i++}</td>
										<td>{name}</td>
										<td>{answer}</td>
									</tr>
								))}
							</tbody>
						</Table>

						<hr className="mb-1" />
					</div>
				)
			)}

			<h4 className="mb-1">Tabel Logsheet / Logbook harian mahasiswa</h4>

			<Table className="mb-1">
				<thead>
					<tr>
						<th style={{ width: '3rem' }}>No</th>
						{/* <th style={{ width: '8rem' }}>Tanggal</th> */}
						<th style={{ width: '' }}>
							Link Logsheet / Logbook harian Mahasiswa
						</th>
					</tr>
				</thead>
				<tbody>
					{student?.logsheet?.map((item) => (
						<tr key={item}>
							<td>{j++}</td>
							<td>
								<a href={item} target="_blank" rel="noreferrer">
									{item}
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default DetailMhsMBKM;
