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
        users: action.users.sort((a: IUser, b: IUser) => b.bananas - a.bananas),
      };
    default:
      return state;
  }
};

export default reducer;
