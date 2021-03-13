import { put, call } from 'redux-saga/effects';

import api from '../api';

export function* getNewRegra(action) {
    const res = yield call(api.post, '/regra', {
        REG_STR_DESC: action.REG_STR_DESC
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_REGRA'
        });
        yield put({
            type: 'REQUEST_REGRA_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_REGRA',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getEditRegra(action) {
    const res = yield call(api.put, `/regra/${action.REG_INT_ID}`, {
        REG_STR_DESC: action.REG_STR_DESC
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_REGRA'
        });
        yield put({
            type: 'REQUEST_REGRA_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_REGRA',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getDeleteRegra(action) {
    const res = yield call(api.delete, `/regra/${action.REG_INT_ID}`);
    if (res.ok) {
        yield put({
            type: 'SUCCESS_REGRA'
        });
        yield put({
            type: 'REQUEST_REGRA_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_REGRA',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getRegras(action) {
    const res = yield call(api.get, '/regra', {});
    if (res.ok) {
        yield put({
            type: 'SUCCESS_REGRA_LOAD',
            data: res.data.REGRAS
        });
    } else {
        yield put({
            type: 'FAILURE_REGRA_LOAD',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
