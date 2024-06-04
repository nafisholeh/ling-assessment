import { createSelector } from 'reselect';

const getUsers = (state: UserState) => state.users;

const getSearchTerm = (state: UserState) => state.searchKeyword;

export const getSearchedUser = createSelector(
  [getUsers, getSearchTerm],
  (users, searchKeyword) =>
    users.filter(
      (user) =>
        searchKeyword &&
        user.name.toLowerCase().includes(searchKeyword.toLowerCase()),
    ),
);
