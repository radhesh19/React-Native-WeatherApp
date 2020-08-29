/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';
import MainScreen from "./src/MainScreen"
import { Provider } from 'react-redux'
import configureStore from './configureStore'

const store = configureStore()
const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
       <MainScreen />
       </Provider>
  );
};
export default App;