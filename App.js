import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './App/Store';

// import StorybookUI from './storybook';
import AppNavigator from './AppNavigator';

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
