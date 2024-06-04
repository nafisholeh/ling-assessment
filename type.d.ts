interface IUserBase {
  uid: string;
  name: string;
  bananas: number;
}

interface IUser extends IUserBase {
  rank: number;
  lowerName: string;
}

type UserState = {
  users: IUser[];
  searchKeyword: string | null;
  error: string | null;
};

type SetUserAction = {
  type: string;
  users: IUserBase[];
};

type SetSearchKeywordAction = {
  type: string;
  searchKeyword: string;
};

type UserAction = SetUsersAction | SetSearchKeywordAction;
type DispatchType = (args: UserAction) => UserAction;
