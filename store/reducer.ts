import * as actionTypes from './actionTypes';

const initialState: UserState = {
  users: [],
  searchKeyword: null,
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
        users: action.users.sort((a: IUser, b: IUser) => {
          if (b.bananas !== a.bananas) {
            return b.bananas - a.bananas;
          } else {
            // alphabetically sort names if banana counts match, respecting locale
            return a.name.localeCompare(b.name);
          }
        }),
      };
    case actionTypes.SET_SEARCH_KEYWORD:
      return {
        ...state,
        searchKeyword: action.searchKeyword,
      };
    default:
      return state;
  }
};

export default reducer;
