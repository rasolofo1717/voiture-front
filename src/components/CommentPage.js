import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import { commenter, getComments } from '../actions/cars';

const CommentPage = () => {
	let { id } = useParams();
	const [comment, setComment] = useState('');
	const datas = useSelector((state) => state.cars.user);
	const token = useSelector((state) => state.cars.token);
	const comments = useSelector(state => state.cars.comments);
	const cars = useSelector((state) => state.cars.cars);

	const car = !cars ? null : cars.cars.filter((car) => car._id === id)[0];

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getComments(cars, id));
	});

	const handleComment = (e) => {
		e.preventDefault();

		if (datas) {
			const payload = {
				comment: comment,
				userId: datas.user._id,
				carId: id,
			};

			dispatch(commenter(payload, token));
			dispatch(getComments(cars, id));
		}
		setComment('');
	};

	const showComments = () => {
		if (comments && comments.length) {
			return comments.map((comment) => (
				<li key={comment._id} className='list-group-item'>
					{comment.comment}{' '}
					<span style={{ float: 'right' }}>Par : {comment.userId.name}</span>
				</li>
			));
		} else {
			return <li className='list-group-item'>Aucun comentaire</li>;
		}
	}

	if (!datas) return <Redirect to='/signin' /> 

	return (
		<div className='container mt-5'>
			<Link className='btn btn-primary mb-2' to='/home'>
				Retour
			</Link>
			<div className='row'>
				<div className='col-sm-4'>
					<ul className='list-group list-group-flush mb-5'>
						<li className='list-group-item'>Matricule : {car.matricule}</li>
						<li className='list-group-item'>Marque : {car.mark}</li>
						<li className='list-group-item'>Couleur :{car.color}</li>
						<li className='list-group-item'>Catégorie :{car.categorie}</li>
					</ul>

					<form onSubmit={handleComment}>
						<div className='mb-3'>
							<label htmlFor='comment' className='form-label'>
								Faire une commentaire
							</label>
							<textarea
								type='text'
								className='form-control'
								id='comment'
								name='comment'
								required
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							/>
						</div>
						<button
							type='submit'
							className='btn btn-primary'
							style={{ marginRight: '10px' }}
						>
							Commenter
						</button>
					</form>
				</div>
				<div className='col-sm-8'>
					<h3 className='mb-4'>Les commentaire pour cette voiture : </h3>
					<ul style={{ maxHeight: '400px', overflowY: 'scroll' }} className='list-group list-group-flush'>{showComments()}</ul>
				</div>
			</div>
		</div>
	);
};

export default CommentPage;
