import React from 'react';
import { Provider } from 'react-redux';
import store from './App/Store';

// import StorybookUI from './storybook';
import AppNavigator from './AppNavigator';

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

export default App;
