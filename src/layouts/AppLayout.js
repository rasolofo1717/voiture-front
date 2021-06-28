import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/cars';

const AppLayout = ({ children }) => {

	const dispatch = useDispatch();
	const user = useSelector((state) => state.cars.user);

	const disconnect = (e) => {
		e.preventDefault();
		dispatch(logout());
	}

	return (
		<div className='app-layout'>
			<nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
				<div className='container-fluid'>
					<Link className='navbar-brand' to='/home'>
						APP
					</Link>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
							<li className='nav-item'>
								<Link
									className='nav-link active'
									aria-current='page'
									to='/home'
								>
									Liste des voitures
								</Link>
							</li>
							<li
								className='nav-item'
								style={{ visibility: !user ? 'hidden' : 'visible' }}
							>
								<a
									className='nav-link'
									href='true'
									onClick={(e) => disconnect(e)}
								>
									Logout
								</a>
							</li>

							<li
								className='nav-item'
								style={{ visibility: !user ? 'visible' : 'hidden' }}
							>
								<Link
									className='nav-link active'
									aria-current='page'
									to='/signin'
								>
									Se connecter
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			{children}
		</div>
	);
};

export default AppLayout;
