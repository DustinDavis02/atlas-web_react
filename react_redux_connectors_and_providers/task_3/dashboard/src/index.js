import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './reducers/uiReducer';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

export default store;