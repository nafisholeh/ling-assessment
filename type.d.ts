interface IUser {
  name: string;
  bananas: number;
}

type UserState = {
  users: IUser[];
  searchResult: IUser[];
  searchedUser: string | null;
  error: string | null;
};

type UserAction = {
  type: string;
  users: IUser[];
};

type DispatchType = (args: UserAction) => UserAction;
