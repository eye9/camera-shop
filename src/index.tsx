import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { fetchProductsAction } from './store/api-actions';

store.dispatch(fetchProductsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App></App>
    </Provider>
  </React.StrictMode>
);
