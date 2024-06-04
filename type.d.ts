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

type FormatUserEntriesAction = {
  type: string;
  users: IUserBase[];
};

type SearchForUsersAction = {
  type: string;
  searchKeyword: string;
};

type UserAction = FormatUserEntriesAction | SearchForUsersAction;
type DispatchType = (args: UserAction) => UserAction;
