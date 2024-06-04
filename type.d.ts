interface IUser {
  uid: string;
  name: string;
  bananas: number;
  rank?: number;
}

type UserState = {
  users: IUser[];
  searchKeyword: string | null;
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
