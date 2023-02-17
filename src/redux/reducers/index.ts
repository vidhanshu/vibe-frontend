import {DARK_THEME, THEME_LIGHT} from '../../styles/Theme';
import {Post1, UserDataType} from '../../types';
import {Socket, io} from 'socket.io-client';

import {createSlice} from '@reduxjs/toolkit';

type AuthStateType = {
  isAuthenticated: boolean;
  user: UserDataType | null;
  token: string | null;
};
const INITIAL_AUTH_STATE: AuthStateType = {
  isAuthenticated: false,
  user: null,
  token: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_AUTH_STATE,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});
const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'dark',
    theme: DARK_THEME,
  },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      state.theme = state.mode === 'light' ? THEME_LIGHT : DARK_THEME;
    },
  },
});
const INITIAL_POSTS_STATE: {
  posts: Post1[];
} = {
  posts: [],
};
const postsSlice = createSlice({
  name: 'posts',
  initialState: INITIAL_POSTS_STATE,
  reducers: {
    addPost(state, action) {
      state.posts = [action.payload, ...state.posts];
    },
    addPostBack(state, action) {
      state.posts = [...state.posts, action.payload];
    },
    removePostById(state, action) {
      state.posts = state.posts.filter(item => item.id === action.payload.id);
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
  },
});
const {reducer: authReducer} = authSlice;
const {reducer: themeReducer} = themeSlice;
const {reducer: postsReducer} = postsSlice;
export const {toggleTheme} = themeSlice.actions;
export const {login, logout} = authSlice.actions;
export const {addPost, removePostById, setPosts, addPostBack} =
  postsSlice.actions;
export {authReducer, themeReducer, postsReducer};
