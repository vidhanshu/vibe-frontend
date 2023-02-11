import {authReducer, postsReducer, themeReducer} from './reducers';

import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    posts: postsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
