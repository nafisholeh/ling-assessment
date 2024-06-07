import * as actionTypes from './actionTypes';

export const initialState: UserState = {
  users: [],
  searchKeyword: null,
  sortParams: null,
};

const reducer = (
  state: UserState = initialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case actionTypes.FORMAT_USER_ENTRIES: {
      const sortedUsers = (action as FormatUserEntriesAction).users
        .map((user: IUserBase) => ({
          ...user,
          lowerName: user.name.toLowerCase(),
        }))
        .sort((a: IUserBase, b: IUserBase) => {
          if (b.bananas !== a.bananas) {
            return b.bananas - a.bananas;
          } else {
            // alphabetically sort names if banana counts match, respecting locale
            return a.name.localeCompare(b.name);
          }
        });
      const rankedUsers = sortedUsers.map((user: IUserBase, index: number) => ({
        ...user,
        rank: index + 1,
      })) as IUser[];

      return {
        ...state,
        users: rankedUsers,
      };
    }
    case actionTypes.SEARCH_FOR_USERS:
      return {
        ...state,
        searchKeyword: (action as SearchForUsersAction).searchKeyword,
      };
    case actionTypes.SORT_SEARCH_RESULTS:
      return {
        ...state,
        sortParams: (action as SortSearchResultsAction).sortParams,
      };
    default:
      return state;
  }
};

export default reducer;
