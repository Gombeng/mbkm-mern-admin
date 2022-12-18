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
			.post(`http://localhost:8910/api/students/acc-borang/${e}`, config)
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
			.post(`http://localhost:8910/api/students/dec-borang/${e}`, config)
			.then((data) => {
				console.log(data);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
				window.location.reload();
			});
	};

	return (
		<div>
			<Helmet>
				<title>Detail Mahasiswa MBKM | ADMIN Lapor MBKM</title>
			</Helmet>

			<h3 className="mb-1">Detail Mahasiswa MBKM</h3>
			<hr className="mb-1" />

			<p className="mb-1">{student?.fullName}</p>
			<p className="mb-1">{student?.nim}</p>

			<h4 className="mb-1">Tabel Borang mahasiswa</h4>

			{student?.idBorangs?.map(({ _id, idAnswers, status, subject, i = 1 }) =>
				!idAnswers.length ? null : (
					<div
						key={_id}
						// style={{ border: '1px solid black', padding: '1rem ' }}
						className="mb-1"
					>
						<FlexBox className="mb-1">
							<p>
								<strong>{status}</strong> - {subject}
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
									<th style={{ width: '' }}>Status Ketua Jurusan</th>
								</tr>
							</thead>
							<tbody>
								{idAnswers?.map(({ _id, name, answer, acc }) => (
									<tr key={_id}>
										<td>{i++}</td>
										<td>{name}</td>
										<td>{answer}</td>
										<td>{acc}</td>
									</tr>
								))}
							</tbody>
						</Table>

						<hr className="mb-1" />
					</div>
				)
			)}
		</div>
	);
};

export default DetailMhsMBKM;
