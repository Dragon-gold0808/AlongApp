import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from "redux-persist";
import authMiddleware from "./authMiddleware";

const rootPersistConfig = {
    key: "auth",
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const middleware = [thunk];

export const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
