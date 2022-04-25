import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/Routes';
import {createStore, StoreProvider as Provider} from 'easy-peasy';
import Store from './src/store/model';

const store = createStore(Store);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </Provider>
  );
}
