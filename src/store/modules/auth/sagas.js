import {
  call, put, all, takeLatest,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import axios from '../../../services/axios';
import * as actions from './actions';
import * as types from '../types';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/token', payload);

    if (response.data.user.nivel === '0') {
      yield put(actions.loginFailure());

      toast.error('Você não tem permissão para fazer login');
    } else {
      yield put(actions.loginSuccess({ ...response.data }));
      toast.success('Você fez login');

      axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      history.push(payload.prevPath);
    }
  } catch (e) {
    toast.error('CPF ou senha inválidos!');

    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');

  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
