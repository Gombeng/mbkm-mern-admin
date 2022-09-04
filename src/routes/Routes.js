import React from 'react';
import {
	BrowserRouter as Router,
	Routes as Switch,
	Route,
} from 'react-router-dom';
import {
	Login,
	Register,
	MainApp,
	Dashboard,
	UploadSK,
	IsiBorang,
	Logsheet,
	Profil,
	NotFound,
} from '../pages/Pages';

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route index exact path="login" element={<Login />} />
				<Route exact path="register" element={<Register />} />
				<Route exact path="/" element={<MainApp />}>
					<Route index element={<Dashboard />} />
					<Route exact path="dashboard" element={<Dashboard />} />
					<Route exact path="upload-sk" element={<UploadSK />} />
					<Route exact path="isi-borang" element={<IsiBorang />} />
					<Route exact path="logsheet" element={<Logsheet />} />
					<Route exact path="profil" element={<Profil />} />
					<Route exact path="*" element={<NotFound />} />
				</Route>
			</Switch>
		</Router>
	);
};

export default Routes;
