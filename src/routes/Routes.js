import React from 'react';
import {
	BrowserRouter as Router,
	Routes as Switch,
	Route,
} from 'react-router-dom';
import {
	Login,
	MainApp,
	Dashboard,
	Profil,
	NotFound,
	Isirps,
	MahasiswaMbkm,
} from '../pages/Pages';

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route index exact path="login" element={<Login />} />
				<Route exact path="/" element={<MainApp />}>
					<Route index element={<Dashboard />} />
					<Route exact path="dashboard" element={<Dashboard />} />
					<Route exact path="isi-rps" element={<Isirps />} />
					<Route exact path="mahasiswa-mbkm" element={<MahasiswaMbkm />} />
					<Route exact path="profil" element={<Profil />} />
					<Route exact path="*" element={<NotFound />} />
				</Route>
			</Switch>
		</Router>
	);
};

export default Routes;
