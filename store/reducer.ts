import * as actionTypes from './actionTypes';

const initialState: UserState = {
  users: [],
  searchKeyword: null,
  error: null,
};

const reducer = (
  state: UserState = initialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case actionTypes.SET_USERS: {
      const sortedUsers = action.users.sort((a: IUser, b: IUser) => {
          if (b.bananas !== a.bananas) {
            return b.bananas - a.bananas;
          } else {
            // alphabetically sort names if banana counts match, respecting locale
            return a.name.localeCompare(b.name);
          }
      });
      const rankedUsers = sortedUsers.map((user: IUser, index: number) => ({
        ...user,
        rank: index + 1,
      }));

      return {
        ...state,
        users: rankedUsers,
      };
    }
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
