import { createSelector } from 'reselect';

const getUsers = (state: UserState) => state.users;

const getSearchTerm = (state: UserState) => state.searchKeyword;

export const getSortParams = (state: UserState) => state.sortParams;

export const getSearchedUser = createSelector(
  [getUsers, getSearchTerm],
  (users, searchKeyword) => {
    if (!searchKeyword) {
      return null;
    }

    const lowerSearchKeyword = searchKeyword.toLowerCase();
    const filteredUsers = users.filter((user) =>
      user.lowerName.includes(lowerSearchKeyword),
    );

    if (filteredUsers.length === 0) {
      return [];
    } else if (filteredUsers.length === 1) {
      const topTenUsers = users.slice(0, 10).map((user) => ({
        ...user,
        isHighlighted: false,
      }));
      const searchedUser = { ...filteredUsers[0], isHighlighted: true };

      if (searchedUser.rank <= 10) {
        return topTenUsers.map((user) =>
          user.uid === searchedUser.uid ? searchedUser : user,
        );
      } else {
        return [...topTenUsers.slice(0, 9), searchedUser];
      }
    } else {
      return filteredUsers;
    }
  },
);

export const getSortedUser = createSelector(
  [getSearchedUser, getSortParams],
  (searchedUsers, sortParams) => {
    if (!searchedUsers) return undefined;
    const searchedUserCopy = [...searchedUsers];
    switch (sortParams) {
      case 'rank_asc':
        return searchedUserCopy.sort((a, b) => {
          // same score are listed alphabetically
          if (a.bananas === b.bananas) {
            return a.name.localeCompare(b.name);
          }
          return a.rank - b.rank;
        });
      case 'rank_desc':
        return searchedUserCopy.sort((a, b) => {
          // same score are listed alphabetically
          if (a.bananas === b.bananas) {
            return a.name.localeCompare(b.name);
          }
          return b.rank - a.rank;
        });
      case 'name_asc':
        return searchedUserCopy.sort((a, b) => a.name.localeCompare(b.name));
      case 'name_desc':
        return searchedUserCopy.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return undefined;
    }
  },
);
