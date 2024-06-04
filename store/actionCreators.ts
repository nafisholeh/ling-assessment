import * as actionTypes from './actionTypes';

export function formatUserEntries(users: IUserBase[]) {
  const action: FormatUserEntriesAction = {
    type: actionTypes.FORMAT_USER_ENTRIES,
    users,
  };
  return action;
}

export function searchForUsers(searchKeyword: string) {
  const action: SearchForUsersAction = {
    type: actionTypes.SEARCH_FOR_USERS,
    searchKeyword,
  };
  return action;
}
