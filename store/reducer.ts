import * as actionTypes from './actionTypes';

const initialState: UserState = {
  users: [],
  searchResult: [],
  searchedUser: null,
  error: null,
};

const reducer = (
  state: UserState = initialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case actionTypes.SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
};

export default reducer;
