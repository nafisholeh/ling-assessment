interface IUser {
  name: string;
  bananas: number;
}

type UserState = {
  users: IUser[];
  searchKeyword: string | null;
  searchedUser: string | null;
  error: string | null;
};

type SetUserAction = {
  type: string;
  users: IUser[];
};

type SetSearchKeywordAction = {
  type: string;
  searchKeyword: string;
};

type UserAction = SetUsersAction | SetSearchKeywordAction;
type DispatchType = (args: UserAction) => UserAction;
