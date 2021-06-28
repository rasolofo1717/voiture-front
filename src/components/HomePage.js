import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCars } from '../actions/cars';
import { Link } from 'react-router-dom';

const HomePage = () => {

	const dispatch = useDispatch();
	const datas = useSelector(state => state.cars.cars);
	const user = useSelector(state => state.cars.user);

	const btnAction = (car) => {
		return !user ? (
			<span> --- </span>
		) : (
			<Link to={'/comments/' + car._id} className='btn btn-primary'>
				Commenter
			</Link>
		);
	}

	useEffect(() => {
		dispatch(getCars());
	}, [dispatch]);

	if (!datas) return null;

	return (
		<div className='container mt-5'>
			<table className='table table-bordered'>
				<thead>
					<tr>
						<th>Matricule</th>
						<th>Marque</th>
						<th>Couleur</th>
						<th>Catégorie</th>
						<th>Puissance</th>
						<th>Année</th>
						<th>Comments</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{datas.cars.map((car) => (
						<tr key={car._id}>
							<td>{car.matricule}</td>
							<td>{car.mark}</td>
							<td>{car.color}</td>
							<td>{car.categorie}</td>
							<td>{car.puissance}</td>
							<td>{car.year}</td>
							<td>
								<span className='badge bg-secondary'>
									{car.comments.length}
								</span>
							</td>
							<td style={{ textAlign: 'center' }}>{btnAction(car)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};


export default HomePage;
