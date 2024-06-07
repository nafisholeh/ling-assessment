interface IUserBase {
  uid: string;
  name: string;
  bananas: number;
}

interface IUser extends IUserBase {
  rank: number;
  lowerName: string;
  isHighlighted?: boolean;
}

type SortParams = 'rank_asc' | 'rank_desc' | 'name_asc' | 'name_desc' | null;

type UserState = {
  users: IUser[];
  searchKeyword: string | null;
  sortParams: SortParams;
};

type FormatUserEntriesAction = {
  type: string;
  users: IUserBase[];
};

type SearchForUsersAction = {
  type: string;
  searchKeyword: string;
};

type SortSearchResultsAction = {
  type: string;
  sortParams: SortParams;
};

type UserAction =
  | FormatUserEntriesAction
  | SearchForUsersAction
  | SortSearchResultsAction;
type DispatchType = (args: UserAction) => UserAction;
