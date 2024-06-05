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
