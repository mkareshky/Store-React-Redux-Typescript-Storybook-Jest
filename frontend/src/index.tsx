import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';

const history = createBrowserHistory();


// const initialState: any = {};

const store = configureStore( history);



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


