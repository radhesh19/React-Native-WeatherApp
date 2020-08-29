import { createStore, applyMiddleware } from 'redux'
import dataReducer from './src/Redux/Reducer/dataReducer'

import createSagaMiddleware from 'redux-saga'
import rootSaga from './src/Redux/Saga'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore() {
  const store = createStore(dataReducer, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(rootSaga)
  return store
}

