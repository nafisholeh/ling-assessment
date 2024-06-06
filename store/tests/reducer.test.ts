import * as actionTypes from '../actionTypes';
import reducer, { initialState } from '../reducer';

describe('reducer', () => {
  describe('FORMAT_USER_ENTRIES', () => {
    const Bob = { uid: '1', name: 'Bob', bananas: 10 };
    const David = { uid: '2', name: 'David', bananas: 30 };
    const Alice = { uid: '3', name: 'Alice', bananas: 20 };
    const Greg = { uid: '4', name: 'Greg', bananas: 20 };

    it('should have correct rank', () => {
      const users: IUserBase[] = [Alice, David, Bob, Greg];
      const action = {
        type: actionTypes.FORMAT_USER_ENTRIES,
        users,
      };
      expect(reducer(initialState, action).users[0].rank).toBe(1);
      expect(reducer(initialState, action).users[1].rank).toBe(2);
      expect(reducer(initialState, action).users[2].rank).toBe(3);
      expect(reducer(initialState, action).users[3].rank).toBe(4);
    });

    it('should reorder based on the number of bananas', () => {
      const users: IUserBase[] = [Bob, David, Alice];
      const action = {
        type: actionTypes.FORMAT_USER_ENTRIES,
        users,
      };
      expect(reducer(initialState, action).users[0].name).toBe(David.name);
      expect(reducer(initialState, action).users[1].name).toBe(Alice.name);
      expect(reducer(initialState, action).users[2].name).toBe(Bob.name);
    });

    it('should retain rank for users with the same number of bananas', () => {
      const users: IUserBase[] = [Alice, Greg, Bob];
      const action = {
        type: actionTypes.FORMAT_USER_ENTRIES,
        users,
      };
      expect(reducer(initialState, action).users[0].name).toBe(Alice.name);
      expect(reducer(initialState, action).users[1].name).toBe(Greg.name);
      expect(reducer(initialState, action).users[2].name).toBe(Bob.name);
    });

    it('should maintain alphabetical order for users with the same number of bananas', () => {
      const Daniel = { uid: '5', name: '다니엘', bananas: 20 };
      const Nur1 = { uid: '6', name: 'Nur Gümüş', bananas: 20 };
      const Nur2 = { uid: '7', name: 'Nür Gümüş', bananas: 20 };
      const LiXiaoya = { uid: '8', name: '李小雅', bananas: 20 };
      const Special = { uid: '9', name: '!@dus', bananas: 20 };

      const users: IUserBase[] = [
        LiXiaoya,
        Nur2,
        Nur1,
        Daniel,
        Greg,
        Alice,
        Special,
      ];
      const action = {
        type: actionTypes.FORMAT_USER_ENTRIES,
        users,
      };
      expect(reducer(initialState, action).users[0].name).toBe(Special.name);
      expect(reducer(initialState, action).users[1].name).toBe(Alice.name);
      expect(reducer(initialState, action).users[2].name).toBe(Greg.name);
      expect(reducer(initialState, action).users[3].name).toBe(Nur1.name);
      expect(reducer(initialState, action).users[4].name).toBe(Nur2.name);
      expect(reducer(initialState, action).users[5].name).toBe(Daniel.name);
      expect(reducer(initialState, action).users[6].name).toBe(LiXiaoya.name);
    });
  });

  describe('SEARCH_FOR_USERS', () => {
    it('should have correct value', () => {
      const searchKeyword = 'Alice';
      const action = {
        type: actionTypes.SEARCH_FOR_USERS,
        searchKeyword,
      };
      const expectedState = {
        ...initialState,
        searchKeyword,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
