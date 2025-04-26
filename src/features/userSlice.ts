import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  _id: string;
  username: string;
  email: string;
  balance: number;
  profilePic: string;
  Role: string;
  token: string;
}

// Helper to load from localStorage
const loadFromLocalStorage = (): UserState | null => {
  try {
    const serializedState = localStorage.getItem('user');
    if (serializedState === null) return null;
    return JSON.parse(serializedState) as UserState;
  } catch (e) {
    console.error('Could not load user from localStorage', e);
    return null;
  }
};

const initialState: UserState | null = loadFromLocalStorage();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_, action: PayloadAction<UserState>) {
      const newState = action.payload;
      localStorage.setItem('user', JSON.stringify(newState));
      return newState;
    },
    clearUser() {
      localStorage.removeItem('user');
      return null;
    },
    
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
