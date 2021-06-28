import axios from 'axios';
import { GET_CARS, LOGIN, GET_USER, COMMENTER, LOGOUT, GET_COMMENT } from './types';

export const getCars = () => (dispatch) => {
	axios
		.get(`http://localhost:3001/car/all`)
		.then((res) => {
			dispatch({
				type: GET_CARS,
				payload: res.data,
			});
		})
		.catch((error) => console.log(error));
};

export const login = (payload) => (dispatch) => {
	axios
		.post(`http://localhost:3001/auth/login`, payload)
		.then((res) => {
			dispatch({
				type: LOGIN,
				payload: res.data.accessToken,
			});
			dispatch(me(res.data.accessToken));
		})
		.catch((error) => console.log(error));
};

export const me = (token) => (dispatch) => {
	axios
		.get(`http://localhost:3001/comment/me`, {
			params: { secret_token: token },
		})
		.then((res) => {
			dispatch({
				type: GET_USER,
				payload: res.data,
			});
		})
		.catch((error) => console.log(error));
};

export const commenter = (payload, token) => (dispatch) => {
	axios
		.post(`http://localhost:3001/comment/create`, payload, {
			params: { secret_token: token },
		})
		.then((res) => {
			dispatch({
				type: COMMENTER,
			});
			dispatch(getCars())
		})
		.catch((error) => console.log(error));
};

export const logout = () => dispatch => {
	dispatch({
		type: LOGOUT
	});
}

export const getComments = (cars, id) => dispatch => {
	const comments = !cars ? null : cars.cars.filter((car) => car._id === id)[0].comments;
	dispatch({
		type: GET_COMMENT,
		payload: comments
	});
}
