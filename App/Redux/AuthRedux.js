import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  basicAuth: ['auth'],
  basicAuthSuccess: ['token', 'userID'],
  basicAuthFailure: ['error']
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  userID: null,
  error: null,
  token: null,
  isSuccess: false
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const basicAuth = (state) => state.merge({ fetching: true })
export const basicAuthSuccess = (state, { token, userID }) =>
  state.merge({ fetching: false, isSuccess: true, error: null, token, userID })
export const basicAuthFailure = (state, { error }) =>
  state.merge({ fetching: false, error, isSuccess: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BASIC_AUTH]: basicAuth,
  [Types.BASIC_AUTH_SUCCESS]: basicAuthSuccess,
  [Types.BASIC_AUTH_FAILURE]: basicAuthFailure
})
