import * as actionTypes from './actionTypes';

export function setUsers(users: IUserBase[]) {
  const action: SetUserAction = {
    type: actionTypes.SET_USERS,
    users,
  };
  return action;
}

export function setSearchKeyword(searchKeyword: string) {
  const action: SetSearchKeywordAction = {
    type: actionTypes.SET_SEARCH_KEYWORD,
    searchKeyword,
  };
  return action;
}
