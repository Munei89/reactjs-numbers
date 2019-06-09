import { GET_DATA, ON_DATA } from './types';
import axios from 'axios';

const apiUrl = 'http://localhost:4000/posts';

export const getFact = ({ month, date }) => {
	return dispatch => {
		return axios
			.get(`http://numbersapi.com/${month}/${date}/date`)
			.then(response => {
				dispatch({
					type: ON_DATA,
					payload: response.data,
				});
			})
			.catch(error => {
				throw error;
			});
	};
};
