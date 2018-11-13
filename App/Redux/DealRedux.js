import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getAllDeal: ['deal'],
  getDeal: ['single'],
  getDealVehicle: ['dealVehicle']
})

export const DealTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  deal: [],
  single: {},
  dealVehicle: {},
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const DealSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const getAllDeal = (state, { deal }) =>
  state.merge({ deal })

export const getDeal = (state, { single }) =>
  state.merge({ single })

export const getDealVehicle = (state, { dealVehicle }) =>
  state.merge({ dealVehicle })
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ALL_DEAL]: getAllDeal,
  [Types.GET_DEAL]: getDeal,
  [Types.GET_DEAL_VEHICLE]: getDealVehicle
})
