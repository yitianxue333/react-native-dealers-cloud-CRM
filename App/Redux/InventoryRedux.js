import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getVehicles: null,
  getVehiclesSuccess: ['vehicles'],
  getVehiclesFailure: ['error'],

  getVehicleInformation: ['vin'],
  getVehicleInformationSuccess: ['item'],
  getVehicleInformationFailure: ['error'],

  getVehicleNada: ['vehicleId', 'vin', 'mileage'],
  getVehicleNadaSuccess: ['vehicleNada'],
  getVehicleNadaFailure: ['error'],

  getSingleVehicle: ['id'],
  getSingleVehicleSuccess: ['vehicle'],
  getSingleVehicleFailure: ['error'],

  getVehicleOptions: ['dealershipId'],
  getVehicleOptionsSuccess: ['vehicleOptions'],
  getVehicleOptionsFailure: ['error'],

  getImage: ['id'],
  getImageSuccess: ['image'],
  getImageFailure: ['error'],

  choice: ['id'],
  choiceAdd: ['id'],

  saveVehicleDto: ['vehicleDTO', 'userID'],
  saveVehicleDtoSuccess: null,
  saveVehicleDtoFailure: ['error'],

  reorderImages: ['id', 'oldPos', 'newPos'],
  reorderImagesSuccess: null,
  reorderImagesFailure: ['error'],

  deleteVehicleImage: ['id', 'vehicleId', 'vin'],
  deleteVehicleImageSuccess: null,
  deleteVehicleImageFailure: ['error'],

  postNewImage: ['vehicleId', 'vin', 'image'],
  postNewImageSuccess: null,
  postNewImageFailure: ['error']
})

export const InventoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  isSuccess: null,
  fetching: false,
  vehicles: [],
  item: {},
  vehicle: {},
  vehicleNada: {},
  vehicleOptions: [],
  image: [],
  id: 0,
  uploading: null,
  isUploadSuccess: null
})

/* ------------- Selectors ------------- */

export const InventorySelectors = {
  getData: (state) => state.data
}

/* ------------- Reducers ------------- */

export const getVehicles = (state) => state.merge({ fetching: true })
export const getVehiclesSuccess = (state, { vehicles }) =>
  state.merge({ fetching: false, isSuccess: true, error: null, vehicles })
export const getVehiclesFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const getVehicleInformation = (state) => state.merge({ fetching: true })
export const getVehicleInformationSuccess = (state, { item }) =>
  state.merge({ fetching: false, isSuccess: true, error: null, item })
export const getVehicleInformationFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const getVehicleNada = (state) => state.merge({ fetching: true })
export const getVehicleNadaSuccess = (state, { vehicleNada }) =>
  state.merge({ fetching: false, isSuccess: true, error: null, vehicleNada })
export const getVehicleNadaFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const getSingleVehicle = (state) => state.merge({ fetching: true })
export const getSingleVehicleSuccess = (state, { vehicle }) =>
  state.merge({ fetching: false, isSuccess: true, error: null, vehicle })
export const getSingleVehicleFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const getVehicleOptions = (state) => state.merge({ fetching: true })
export const getVehicleOptionsSuccess = (state, { vehicleOptions }) =>
  state.merge({ fetching: false, isSuccess: true, error: null, vehicleOptions })
export const getVehicleOptionsFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const getImage = (state) => state.merge({ fetching: true })
export const getImageSuccess = (state, { image }) =>
  state.merge({ fetching: false, isSuccess: true, error: null, image })
export const getImageFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const choice = (state) => state.merge({ fetching: true })
export const choiceAdd = (state, { id }) => state.merge({ fetching: false, id })

export const saveVehicleDto = (state) => state.merge({ fetching: true })
export const saveVehicleDtoSuccess = (state) =>
  state.merge({ fetching: false, isSuccess: true, error: null })
export const saveVehicleDtoFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const reorderImages = (state) => state.merge({ fetching: true })
export const reorderImagesSuccess = (state) =>
  state.merge({ fetching: false, isSuccess: true, error: null })
export const reorderImagesFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const deleteVehicleImage = (state) => state.merge({ fetching: true })
export const deleteVehicleImageSuccess = (state) =>
  state.merge({ fetching: false, isSuccess: true, error: null })
export const deleteVehicleImageFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const postNewImage = (state) => state.merge({ uploading: true })
export const postNewImageSuccess = (state) =>
  state.merge({ updating: false, isUpdateSuccess: true, error: null })
export const postNewImageFailure = (state, { error }) =>
  state.merge({ updating: false, isUpdateSuccess: false, error })
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_VEHICLES]: getVehicles,
  [Types.GET_VEHICLES_SUCCESS]: getVehiclesSuccess,
  [Types.GET_VEHICLES_FAILURE]: getVehiclesFailure,

  [Types.GET_VEHICLE_INFORMATION]: getVehicleInformation,
  [Types.GET_VEHICLE_INFORMATION_SUCCESS]: getVehicleInformationSuccess,
  [Types.GET_VEHICLE_INFORMATION_FAILURE]: getVehicleInformationFailure,

  [Types.GET_VEHICLE_NADA]: getVehicleNada,
  [Types.GET_VEHICLE_NADA_SUCCESS]: getVehicleNadaSuccess,
  [Types.GET_VEHICLE_NADA_FAILURE]: getVehicleNadaFailure,

  [Types.GET_SINGLE_VEHICLE]: getSingleVehicle,
  [Types.GET_SINGLE_VEHICLE_SUCCESS]: getSingleVehicleSuccess,
  [Types.GET_SINGLE_VEHICLE_FAILURE]: getSingleVehicleFailure,

  [Types.GET_VEHICLE_OPTIONS]: getVehicleOptions,
  [Types.GET_VEHICLE_OPTIONS_SUCCESS]: getVehicleOptionsSuccess,
  [Types.GET_VEHICLE_OPTIONS_FAILURE]: getVehicleOptionsFailure,

  [Types.GET_IMAGE]: getImage,
  [Types.GET_IMAGE_SUCCESS]: getImageSuccess,
  [Types.GET_IMAGE_FAILURE]: getImageFailure,

  [Types.CHOICE]: choice,
  [Types.CHOICE_ADD]: choiceAdd,

  [Types.SAVE_VEHICLE_DTO]: saveVehicleDto,
  [Types.SAVE_VEHICLE_DTO_SUCCESS]: saveVehicleDtoSuccess,
  [Types.SAVE_VEHICLE_DTO_FAILURE]: saveVehicleDtoFailure,

  [Types.REORDER_IMAGES]: reorderImages,
  [Types.REORDER_IMAGES_SUCCESS]: reorderImagesSuccess,
  [Types.REORDER_IMAGES_FAILURE]: reorderImagesFailure,

  [Types.DELETE_VEHICLE_IMAGE]: deleteVehicleImage,
  [Types.DELETE_VEHICLE_IMAGE_SUCCESS]: deleteVehicleImageSuccess,
  [Types.DELETE_VEHICLE_IMAGE_FAILURE]: deleteVehicleImageFailure,

  [Types.POST_NEW_IMAGE]: postNewImage,
  [Types.POST_NEW_IMAGE_SUCCESS]: postNewImageSuccess,
  [Types.POST_NEW_IMAGE_FAILURE]: postNewImageFailure
})
