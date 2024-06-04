import { createStore, Store } from 'redux';

import reducer from './reducer';

const store: Store<UserState, UserAction> & {
  dispatch: DispatchType;
} = createStore(reducer);

export default store;
