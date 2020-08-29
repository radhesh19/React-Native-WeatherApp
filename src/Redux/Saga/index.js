import { takeLatest, takeEvery } from 'redux-saga/effects'
import  fetchData  from './saga'

export default function* rootSaga() {
    yield takeLatest("API_LOAD", fetchData)
   
}