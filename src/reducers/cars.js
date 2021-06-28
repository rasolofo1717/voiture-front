/* eslint-disable import/no-anonymous-default-export */
import { GET_CARS, LOGIN, GET_USER, LOGOUT, GET_COMMENT } from '../actions/types';

const initialState = {
  cars: null,
	user: null,
	token: null,
	comments: []
}

export default function(state = initialState, action) {
  switch (action.type) {
		case GET_CARS:
			return {
				...state,
				cars: action.payload,
			};
		case LOGIN:
			return {
				...state,
				token: action.payload,
			};
		case GET_USER:
			return {
				...state,
				user: action.payload,
			};
		case LOGOUT:
			return {
				...state,
				user: null,
				token: null,
			};
		case GET_COMMENT:
			return {
				...state,
				comments: action.payload,
			};
		default:
			return state;
	}
}