// Actions
const SERVER_INIT = 'SERVER_INIT';
const CLIENT_INIT = 'CLIENT_INIT';
const UPDATE_DATA = 'app/UPDATE_DATA';

// Default state
const initialState = {}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SERVER_INIT: {
      const savedState = {
        // ...
      };

      return {
        ...state,
        ...savedState
      }
    }
    case CLIENT_INIT: {
      const savedState = {
        // ...
      };

      return {
        ...state,
        ...savedState
      }
    }
    case UPDATE_DATA: {
      const { data } = action.payload;

      return {
        ...state,
        ...data
      };
    }
    default:
      return state;
  }
};

// Action Creators
export function updateData(data) {
  return {
    type: UPDATE_DATA,
    payload: { data }
  }
}
