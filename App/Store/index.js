import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { seamlessImmutableReconciler } from 'redux-persist-seamless-immutable';
import storage from 'redux-persist-filesystem-storage';

import rootReducer from './reducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  stateReconciler: seamlessImmutableReconciler,
};

export default () => {
  const store = createStore(
    persistReducer(rootPersistConfig, rootReducer),
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
