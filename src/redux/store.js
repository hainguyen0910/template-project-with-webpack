import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'Sagas';
// import authSlice from 'slices/authSlice';

const rootReducer = {
  // auth: authSlice,
};
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true,
});
sagaMiddleware.run(rootSaga);

export default store;
