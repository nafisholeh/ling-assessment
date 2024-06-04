import * as actionTypes from './actionTypes';

export function setUsers(users: IUser[]) {
  const action: UserAction = {
    type: actionTypes.SET_USERS,
    users,
  };
  return action;
}
