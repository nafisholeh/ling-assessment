import { createSelector } from 'reselect';

const getUsers = (state: UserState) => state.users;

const getSearchTerm = (state: UserState) => state.searchKeyword;

export const getSearchedUser = createSelector(
  [getUsers, getSearchTerm],
  (users, searchKeyword) => {
    if (!searchKeyword) {
      return null;
    }

    const lowerSearchKeyword = searchKeyword.toLowerCase();
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(lowerSearchKeyword),
    );

    if (filteredUsers.length === 0) {
      return null;
    } else if (filteredUsers.length === 1) {
      const topTenUsers = users.slice(0, 10);
      const searchedUser = filteredUsers[0];

      if (!searchedUser.rank || searchedUser.rank < 10) {
        return topTenUsers;
      } else {
        return [...topTenUsers.slice(0, 9), searchedUser];
      }
    } else {
      return filteredUsers;
    }
  },
);
