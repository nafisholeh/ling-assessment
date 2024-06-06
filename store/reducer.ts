import * as actionTypes from './actionTypes';

export const initialState: UserState = {
  users: [],
  searchKeyword: null,
  error: null,
};

const reducer = (
  state: UserState = initialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case actionTypes.FORMAT_USER_ENTRIES: {
      const sortedUsers = action.users
        .map((user: IUser) => ({
          ...user,
          lowerName: user.name.toLowerCase(),
        }))
        .sort((a: IUser, b: IUser) => {
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
    case actionTypes.SEARCH_FOR_USERS:
      return {
        ...state,
        searchKeyword: action.searchKeyword,
      };
    default:
      return state;
  }
};

export default reducer;
