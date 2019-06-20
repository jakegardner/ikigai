import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist-filesystem-storage';

import rootReducer from './reducer';

const rootPersistConfig = {
  key: 'root',
  storage,
};

export default () => {
  const store = createStore(
    persistReducer(rootPersistConfig, rootReducer),
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
