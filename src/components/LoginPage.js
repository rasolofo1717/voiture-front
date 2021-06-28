import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../actions/cars';
import { useDispatch, useSelector } from 'react-redux';

const LoginPage = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const user = useSelector(state => state.cars.user)

	const dispatch = useDispatch();

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(login(formData));
	}

	if (user) return <Redirect to='/home' />;

	return (
		<div className='container mt-5' style={{ maxWidth: '500px' }}>
			<h3 style={{ textAlign: 'center' }}>CONNEXION</h3>

			<form onSubmit={handleLogin}>
				<div className='mb-3'>
					<label htmlFor='email' className='form-label'>
						Email
					</label>
					<input
						type='email'
						className='form-control'
						id='email'
						name='email'
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value})}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='password' className='form-label'>
						Mot de passe
					</label>
					<input
						type='password'
						className='form-control'
						id='password'
						name='password'
						value={formData.password}
						onChange={(e) => setFormData({ ...formData, password: e.target.value})}
					/>
				</div>
				<button
					type='submit'
					className='btn btn-primary'
					style={{ marginRight: '10px' }}
				>
					Se connecter
				</button>
				<Link to='/home' className='btn btn-default'>Voir liste des voitures</Link>
			</form>
		</div>
	);
};

export default LoginPage;
