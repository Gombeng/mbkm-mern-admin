import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Gap, Input } from '../../components/Components';

const UploadSK = () => {
	return (
		<div>
			<Helmet>
				<title>Upload SK | Lapor MBKM</title>
			</Helmet>

			<h2 className="mb-1">Silahkan Upload SK diterima mitra</h2>

			<hr className="mb-1" />

			<form className="">
				{/* {error && <Message className="mb-1 error">{error}</Message>} */}

				<Input
					// value={password}
					// onChange={(e) => setPassword(e.target.value)}
					label="SK Diterima mitra"
					type="file"
					// className="border-1"
					placeholder="********"
				/>
				<Gap height={20} />

				<Button
					// title={loading ? <ClipLoader size={20} /> : 'Upload Borang'}
					title="Upload SK"
					className="button mr-1"
					type="submit"
				/>
			</form>
		</div>
	);
};

export default UploadSK;
