import { 
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS
} from '../actions/types';

const initialState = {
  error: false,
  errorMessage: '',
  isLoading: false,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    default:
      return state;
  }
};