import React from 'react';
import './translations/DCSLocalize';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import App from './App';

import {store, persistor} from './state/store';
import 'react-native-gesture-handler';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

const render = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        
          <App />
        
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent('main', () => render);