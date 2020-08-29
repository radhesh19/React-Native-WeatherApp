import { call, put } from 'redux-saga/effects'
import API from '../Service/Api.js'

const api = API.create()

export default function* fetchData(action) {
    try {
        const response = yield call(api.getWeatherData, action.payload)
        if (response.status == 1) {   
            yield put(
                {
                    type: "API_SUCCESS", 
                    result: response.result
                })
        } else {
            yield put({type: "API_FAIL", result:response.result})
        }
    } catch (error) {
        yield put({type:"API_ERROR", result:"Something Went Wrong."})
    }
}

