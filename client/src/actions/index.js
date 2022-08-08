import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async (dispatch) => {
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data });
};

// REDUX thunk allows to access the dispatch function directly from the action creators
// without it having to return an ACTION

// Therefore if REDUX THUNK sees that the action creator returns a function, it calls the function
// automatically and passes 'dispatch' as an argument to it
