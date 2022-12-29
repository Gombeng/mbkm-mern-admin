import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button, Table, FlexBox } from '../../../components/Components';
import { ClipLoader } from 'react-spinners/ClipLoader';

// pdf maker
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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

	// component to open pdf
	const open = (id) => {
		const dataBorangs = student.idBorangs.filter((x) => x._id === id)[0];

		const tableHead = [
			{ text: 'No', style: 'tableHeader' },
			{ text: 'Deskripsi CPMK', style: 'tableHeader' },
			{ text: 'Jawaban Mahasiswa', style: 'tableHeader' },
		];
		const dataBody = dataBorangs.idAnswers.map((x, i) => {
			return [i + 1, x.name, x.answer];
		});
		const dd = {
			pageSize: 'A4',
			// todo: tambah ttd mhs, dosen pengampu dan kajur
			content: [
				{ text: `Nama Mahasiswa: ${student?.fullName}`, style: 'subheader' },
				{ text: `NIM: ${student?.nim}`, style: 'subheader' },
				{ text: `Mata Kuliah: ${dataBorangs?.subject}`, style: 'subheader' },
				{
					style: 'tableExample',
					table: {
						headerRows: 1,
						widths: [24, 200, '*'],
						body: [tableHead, ...dataBody],
					},
				},
				{
					margin: [40, 30, 40, 80],
					top: 100,
					columns: [
						{
							width: '50%',
							text: 'Mahasiswa',
						},
						{
							alignment: 'right',
							width: '50%',
							text: 'Dosen Pengampu',
						},
					],
				},
				{
					margin: [0, 0, 0, 80],
					alignment: 'center',
					text: 'Kepala Jurusan',
				},
			],

			styles: {
				subheader: {
					fontSize: 13,
					bold: true,
					margin: [0, 5, 0, 5],
				},
				tableHeader: {
					bold: true,
					fontSize: 13,
					color: 'black',
				},
				tableExample: {
					margin: [0, 15, 0, 25],
				},
			},
		};
		pdfMake.createPdf(dd).open();
	};

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
				Surat Keterangan diterima Mitra :
				{!student?.skAcc ? (
					' Belum Diupload'
				) : (
					<a href={student?.skAcc}> {student?.skAcc}</a>
				)}
			</p>
			<p className="mb-1">
				Laporan Akhir :
				{!student?.laporanAkhir ? (
					' Belum Diupload'
				) : (
					<a href={student?.laporanAkhir}> {student?.laporanAkhir}</a>
				)}
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
									title={loading ? <ClipLoader size={20} /> : 'Open PDF File'}
									className="button mr-1"
									style={{
										background: '#3792cb',
										marginRight: '1rem',
									}}
									onClick={() => open(_id)}
								/>

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
								{idAnswers?.length === 0 ? (
									<tr>
										<td colSpan={2}>Data Kosong</td>
									</tr>
								) : (
									idAnswers?.map(({ _id, name, answer, acc }) => (
										<tr key={_id}>
											<td>{i++}</td>
											<td>{name}</td>
											<td>{answer}</td>
										</tr>
									))
								)}
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
					{student?.logsheet?.length === 0 ? (
						<tr>
							<td colSpan={2}>Data Kosong</td>
						</tr>
					) : (
						student?.logsheet?.map((item) => (
							<tr key={item}>
								<td>{j++}</td>
								<td>
									<a href={item} target="_blank" rel="noreferrer">
										{item}
									</a>
								</td>
							</tr>
						))
					)}
				</tbody>
			</Table>
		</div>
	);
};

export default DetailMhsMBKM;
