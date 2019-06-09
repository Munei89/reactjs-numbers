import { ON_DATA, GET_DATA } from '../actions/types';

const initialState = {isLoading: false, data: ""};

export default function infoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return {isLoading:true, data: {}};
    case ON_DATA:
      console.log(action.payload)
      return {isLoading:false, data: action.payload};
    default:
      return state;
  }
}