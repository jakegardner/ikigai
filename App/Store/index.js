import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { seamlessImmutableReconciler } from 'redux-persist-seamless-immutable';
import storage from 'redux-persist-filesystem-storage';
import logger from 'redux-logger';

import rootReducer from './reducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  stateReconciler: seamlessImmutableReconciler,
};

export default () => {
  const store = createStore(
    persistReducer(rootPersistConfig, rootReducer),
    applyMiddleware(logger),
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
