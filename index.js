import React from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Navigator from './src/Navigator';

import axios from 'axios';
axios.defaults.baseURL = 'https://imovelneo-default-rtdb.firebaseio.com';

import storeConfig from './src/store/storeConfig';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/storage';
import '@react-native-firebase/database';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyApIlD8KvZAINrO3r4iYDsx6lPsvEXSvmY",
  authDomain: "imovelneo.firebaseapp.com",
  databaseURL: "https://imovelneo-default-rtdb.firebaseio.com",
  projectId: "imovelneo",
  storageBucket: "imovelneo.appspot.com",
  messagingSenderId: "503567233419",
  appId: "1:503567233419:android:586a1c8669c16b05f43f8e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const store = storeConfig();
const Redux = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Redux);
