import { FETCH_USER } from '../actions/types';

const authReducer = (state = null, action) => { //1
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false; //2
        default: 
            return state;
    }
};

export default authReducer;

//1 by default we dont know if user is logged in

//2 make sure it returns false if payload is empty (meaning user is not logged in)