import React from 'react';
import { Provider } from 'react-redux';
import Main from './root/Main';
import reduxStore from './redux/store';

const store = reduxStore();

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);
export default App;
