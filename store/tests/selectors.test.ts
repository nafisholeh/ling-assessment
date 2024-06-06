import { getSearchedUser } from '../selectors';

const initialState = {
  users: [
    {
      uid: 'a3f5d9',
      name: 'T-ran TheMan',
      bananas: 5600,
      lowerName: 't-ran theman',
      rank: 1,
    }, // Unique characters
    {
      uid: 'b7e4a2',
      name: '李小雅',
      bananas: 800,
      lowerName: '李小雅',
      rank: 2,
    }, // Chinese name
    { uid: 'c8b3f1', name: 'A!ice', bananas: 25, lowerName: 'a!ice', rank: 3 }, // Unique characters
    {
      uid: 'd9c2e0',
      name: 'Allice',
      bananas: 25,
      lowerName: 'allice',
      rank: 4,
    }, // Unique characters
    {
      uid: 'e0d1f2',
      name: ' Mario Bros',
      bananas: 22,
      lowerName: ' mario bros',
      rank: 5,
    }, // Leading space
    {
      uid: 'f2e3c4',
      name: 'Chaplie Chaplin',
      bananas: 20,
      lowerName: 'chaplie chaplin',
      rank: 6,
    },
    {
      uid: 'a1b2c3',
      name: 'Charlie Chaplin',
      bananas: 15,
      lowerName: 'charlie chaplin',
      rank: 7,
    },
    { uid: 'b3c4d5', name: '张伟', bananas: 12, lowerName: '张伟', rank: 8 }, // Chinese name
    { uid: 'c5d6e7', name: 'Alice', bananas: 10, lowerName: 'alice', rank: 9 },
    {
      uid: 'd7e8f9',
      name: '다니엘',
      bananas: 8,
      lowerName: '다니엘',
      rank: 10,
    }, // Korean name
    { uid: 'e9f0a1', name: 'Dav!d', bananas: 7, lowerName: 'dav!d', rank: 11 }, // Unique characters
    { uid: 'f1a2b3', name: '', bananas: 5, lowerName: '', rank: 12 }, // Empty string
    {
      uid: 'a2b3c4',
      name: 'Nur Gümüş',
      bananas: 0,
      lowerName: 'nur gümüş',
      rank: 13,
    }, // Special characters
    {
      uid: 'b4c5d6',
      name: '王连辟',
      bananas: 0,
      lowerName: '王连辟',
      rank: 14,
    }, // Chinese name
    {
      uid: 'c6d7e8',
      name: 'Shawn Griswold',
      bananas: 0,
      lowerName: 'shawn griswold',
      rank: 15,
    }, // Regular name
  ],
  searchKeyword: null,
  error: null,
};

describe('getSearchedUser selector', () => {
  it('should return null if no search keyword is provided', () => {
    const state = { ...initialState, searchKeyword: null };
    const filteredUsers = getSearchedUser(state);
    expect(filteredUsers).toBeNull();
  });

  it('should return null if empty search keyword is provided', () => {
    const state = { ...initialState, searchKeyword: '' };
    const filteredUsers = getSearchedUser(state);
    expect(filteredUsers).toBeNull();
  });

  it('should return empty array if no users match the search keyword', () => {
    const state = { ...initialState, searchKeyword: 'NonExistentUser' };
    const filteredUsers = getSearchedUser(state);
    expect(filteredUsers).toEqual([]);
  });

  it('should return top 10 users if only one user matches the search keyword and rank <= 10', () => {
    const state = { ...initialState, searchKeyword: 'Alice' };
    const filteredUsers = getSearchedUser(state);
    expect(filteredUsers?.length).toBeLessThanOrEqual(10);
    for (let i = 0; i < 10; i++) {
      if (i < (filteredUsers?.length || 0)) {
        expect(filteredUsers?.[i].name).toBe(state.users[i].name);
      }
    }
  });

  it('should highlight user if only one user matches the search keyword and rank <= 10', () => {
    const state = { ...initialState, searchKeyword: 'Alice' };
    const filteredUsers = getSearchedUser(state);
    expect(filteredUsers?.[8]).toEqual({
      ...state.users[8],
      isHighlighted: true,
    });
  });

  it('should return top 9 users and the matched user if only one user matches the search keyword and rank > 10', () => {
    const state = { ...initialState, searchKeyword: 'Shawn Griswold' };
    const filteredUsers = getSearchedUser(state);
    expect(filteredUsers?.length).toBe(10);
    expect(filteredUsers?.[9]).toEqual({
      ...state.users[14],
      isHighlighted: true,
    });
  });

  it('should return filtered users if more than one user matches the search keyword', () => {
    const state = { ...initialState, searchKeyword: 'Al' };
    const filteredUsers = getSearchedUser(state);
    expect(filteredUsers?.length).toBe(2);
    expect(filteredUsers?.[0].name).toBe(state.users[3].name);
    expect(filteredUsers?.[1].name).toBe(state.users[8].name);
  });

  it('should exclude filtered users from being highlighted if more than one user matches the search keyword', () => {
    const state = { ...initialState, searchKeyword: 'Al' };
    const filteredUsers = getSearchedUser(state);
    expect(filteredUsers?.length).toBe(2);
    expect(filteredUsers?.[0].isHighlighted).toBeFalsy;
    expect(filteredUsers?.[1].isHighlighted).toBeFalsy;
  });

  it('should return filtered users with case insensitive search', () => {
    const state = { ...initialState, searchKeyword: 'cha' };
    const filteredUsers = getSearchedUser(state);
    expect(filteredUsers?.length).toBe(2);
    expect(filteredUsers?.[0]).toEqual(state.users[5]);
    expect(filteredUsers?.[1]).toEqual(state.users[6]);
  });

  it('should return filtered users with korean character search', () => {
    const state = { ...initialState, searchKeyword: '다니엘' };
    const filteredUsers = getSearchedUser(state);
    expect(filteredUsers?.[9].name).toBe('다니엘');
  });

  it('should return filtered users with chinese character search', () => {
    const state = { ...initialState, searchKeyword: '王连辟' };
    const filteredUsers = getSearchedUser(state);
    expect(filteredUsers?.[9].name).toBe('王连辟');
  });

  it('should return filtered users with special character search', () => {
    const state = { ...initialState, searchKeyword: 'Gümüş' };
    const filteredUsers = getSearchedUser(state);
    expect(filteredUsers?.[9].name).toBe('Nur Gümüş');
  });
});
