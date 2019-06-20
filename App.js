import React from 'react';
import { Provider } from 'react-redux';
import createStore from './App/Store';
import AppNavigator from './AppNavigator';
// import StorybookUI from './storybook';

const { store } = createStore();

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

export default App;
