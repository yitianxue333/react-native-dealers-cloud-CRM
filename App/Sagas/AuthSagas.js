/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
// import { AuthSelectors } from '../Redux/AuthRedux'

export function * basicAuth (api, { auth }) {
  const response = yield call(api.postToken, auth)
  __DEV__ && console.log('login response', response)
  if (response.ok) {
    yield put(AuthActions.basicAuthSuccess(response.data.access_token, response.data.userID))
  } else {
    yield put(AuthActions.basicAuthFailure(response.data && response.data.error_description ? response.data.error_description : 'unknownError'))
  }
}
