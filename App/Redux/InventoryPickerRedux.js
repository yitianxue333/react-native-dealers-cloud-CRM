import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getMake: null,
  getMakeSuccess: ['make'],
  getMakeFailure: ['error'],

  getModel: ['id'],
  getModelSuccess: ['model'],
  getModelFailure: ['error'],

  getTrim: ['id'],
  getTrimSuccess: ['trim'],
  getTrimFailure: ['error'],

  getColor: null,
  getColorSuccess: ['color'],
  getColorFailure: ['error'],

  getBodyStyle: null,
  getBodyStyleSuccess: ['bodyStyle'],
  getBodyStyleFailure: ['error'],

  getInteriorSurface: null,
  getInteriorSurfaceSuccess: ['interiorSurface'],
  getInteriorSurfaceFailure: ['error'],

  getEngine: null,
  getEngineSuccess: ['engine'],
  getEngineFailure: ['error'],

  getTransmission: null,
  getTransmissionSuccess: ['transmission'],
  getTransmissionFailure: ['error'],

  getFuelType: null,
  getFuelTypeSuccess: ['fuelType'],
  getFuelTypeFailure: ['error'],

  getDriveType: null,
  getDriveTypeSuccess: ['driveType'],
  getDriveTypeFailure: ['error']
})

export const InventoryPickerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  make: [],
  model: [],
  color: [],
  trim: [],
  bodyStyle: [],
  InteriorSurface: [],
  engine: [],
  transmission: [],
  fuelType: [],
  driveType: [],
  fetching: null,
  error: null,
  isSuccess: null
})

/* ------------- Selectors ------------- */

export const InventoryPickerSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const getMake = (state) =>
  state.merge({ fetching: true })
export const getMakeSuccess = (state, {make}) => {
  return state.merge({ fetching: false, error: null, isSuccess: true, make })
}
export const getMakeFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const getModel = (state) =>
  state.merge({ fetching: true })
export const getModelSuccess = (state, {model}) => {
  return state.merge({ fetching: false, error: null, isSuccess: true, model })
}
export const getModelFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const getTrim = (state) =>
  state.merge({ fetching: true })
export const getTrimSuccess = (state, {trim}) => {
  return state.merge({ fetching: false, error: null, isSuccess: true, trim })
}
export const getTrimFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const getColor = (state) =>
  state.merge({ fetching: true })
export const getColorSuccess = (state, {color}) => {
  return state.merge({ fetching: false, error: null, isSuccess: true, color })
}
export const getColorFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const getBodyStyle = (state) =>
  state.merge({ fetching: true })
export const getBodyStyleSuccess = (state, {bodyStyle}) => {
  return state.merge({ fetching: false, error: null, isSuccess: true, bodyStyle })
}
export const getBodyStyleFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const getInteriorSurface = (state) =>
  state.merge({ fetching: true })
export const getInteriorSurfaceSuccess = (state, {interiorSurface}) => {
  return state.merge({ fetching: false, error: null, isSuccess: true, interiorSurface })
}
export const getInteriorSurfaceFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const getEngine = (state) =>
  state.merge({ fetching: true })
export const getEngineSuccess = (state, {engine}) => {
  return state.merge({ fetching: false, error: null, isSuccess: true, engine })
}
export const getEngineFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const getTransmission = (state) =>
  state.merge({ fetching: true })
export const getTransmissionSuccess = (state, {transmission}) => {
  return state.merge({ fetching: false, error: null, isSuccess: true, transmission })
}
export const getTransmissionFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const getFuelType = (state) =>
  state.merge({ fetching: true })
export const getFuelTypeSuccess = (state, {fuelType}) => {
  return state.merge({ fetching: false, error: null, isSuccess: true, fuelType })
}
export const getFuelTypeFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const getDriveType = (state) =>
  state.merge({ fetching: true })
export const getDriveTypeSuccess = (state, {driveType}) => {
  return state.merge({ fetching: false, error: null, isSuccess: true, driveType })
}
export const getDriveTypeFailure = (state, { error }) =>
  state.merge({ fetching: false, error })
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_MAKE]: getMake,
  [Types.GET_MAKE_SUCCESS]: getMakeSuccess,
  [Types.GET_MAKE_FAILURE]: getMakeFailure,

  [Types.GET_MODEL]: getModel,
  [Types.GET_MODEL_SUCCESS]: getModelSuccess,
  [Types.GET_MODEL_FAILURE]: getModelFailure,

  [Types.GET_TRIM]: getTrim,
  [Types.GET_TRIM_SUCCESS]: getTrimSuccess,
  [Types.GET_TRIM_FAILURE]: getTrimFailure,

  [Types.GET_COLOR]: getColor,
  [Types.GET_COLOR_SUCCESS]: getColorSuccess,
  [Types.GET_COLOR_FAILURE]: getColorFailure,

  [Types.GET_BODY_STYLE]: getBodyStyle,
  [Types.GET_BODY_STYLE_SUCCESS]: getBodyStyleSuccess,
  [Types.GET_BODY_STYLE_FAILURE]: getBodyStyleFailure,

  [Types.GET_INTERIOR_SURFACE]: getInteriorSurface,
  [Types.GET_INTERIOR_SURFACE_SUCCESS]: getInteriorSurfaceSuccess,
  [Types.GET_INTERIOR_SURFACE_FAILURE]: getInteriorSurfaceFailure,

  [Types.GET_ENGINE]: getEngine,
  [Types.GET_ENGINE_SUCCESS]: getEngineSuccess,
  [Types.GET_ENGINE_FAILURE]: getEngineFailure,

  [Types.GET_TRANSMISSION]: getTransmission,
  [Types.GET_TRANSMISSION_SUCCESS]: getTransmissionSuccess,
  [Types.GET_TRANSMISSION_FAILURE]: getTransmissionFailure,

  [Types.GET_FUEL_TYPE]: getFuelType,
  [Types.GET_FUEL_TYPE_SUCCESS]: getFuelTypeSuccess,
  [Types.GET_FUEL_TYPE_FAILURE]: getFuelTypeFailure,

  [Types.GET_DRIVE_TYPE]: getDriveType,
  [Types.GET_DRIVE_TYPE_SUCCESS]: getDriveTypeSuccess,
  [Types.GET_DRIVE_TYPE_FAILURE]: getDriveTypeFailure
})
