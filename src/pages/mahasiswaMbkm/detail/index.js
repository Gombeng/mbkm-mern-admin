import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Table } from '../../../components/Components';

const DetailMhsMBKM = () => {
	const { idStudent } = useParams();
	const [student, setStudent] = useState('');

	async function fetchStudentBorang() {
		const config = {
			headers: {
				'Content-type': 'application/json',
			},
		};

		const { data } = await axios.get(
			`http://localhost:8910/api/student/getAll/borangs/${idStudent}/answers`,
			config
		);
		setStudent(data);
	}

	useEffect(() => {
		fetchStudentBorang();
	}, []);

	console.log(student);

	let i = 1;
	return (
		<div>
			<Helmet>
				<title>Detail Mahasiswa MBKM | ADMIN Lapor MBKM </title>
			</Helmet>

			<h3 className="mb-1">Detail Mahasiswa MBKM</h3>
			<hr className="mb-1" />

			<p className="mb-1">Tabel Borang mahasiswa</p>
			{student.length &&
				student?.map(({ _id, subject, _answers }) => (
					<>
						<p>Mata Kuliah: {subject}</p>
						<Table className="mb-1">
							<thead>
								<tr>
									<th style={{ width: '3rem' }}>No</th>
									<th style={{ width: '9rem' }}>CPMK</th>
									<th style={{ width: '' }}>Jawaban Mahasiswa</th>
									<th style={{ width: '' }}>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{_answers.length &&
									_answers?.map(({ _id, name, answer, acc }) => (
										<tr key={_id}>
											<td>{i++}</td>
											<td>{name}</td>
											<td>{answer}</td>
											<td>
												{acc ? 'Uploaded' : 'Belum'}
												<hr style={{ margin: '.5rem 0' }} />
												<p>approve/not</p>
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					</>
				))}
		</div>
		// <p>hello</p>
	);
};

export default DetailMhsMBKM;
