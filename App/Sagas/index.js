import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { AuthTypes } from '../Redux/AuthRedux'
import { InventoryTypes } from '../Redux/InventoryRedux'
import { InventoryPickerTypes } from '../Redux/InventoryPickerRedux'
/* ------------- Sagas ------------- */

import { basicAuth } from './AuthSagas'
import { getVehicles,
  getVehicleInformation,
  getSingleVehicle,
  getVehicleNada,
  getVehicleOptions,
  getMake,
  getModel,
  getColor,
  getImage,
  choice,
  saveVehicleDTO,
  reorderImages,
  deleteVehicleImage,
  postNewImage,
  getTrim,
  getBodyStyle,
  getInteriorSurface,
  getEngine,
  getTransmission,
  getFuelType,
  getDriveType
} from './InventorySagas'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas receive extra parameters in addition to an action
    takeLatest(AuthTypes.BASIC_AUTH, basicAuth, api),
    takeLatest(InventoryTypes.GET_VEHICLES, getVehicles, api),
    takeLatest(InventoryTypes.GET_VEHICLE_INFORMATION, getVehicleInformation, api),
    takeLatest(InventoryTypes.GET_VEHICLE_NADA, getVehicleNada, api),
    takeLatest(InventoryTypes.GET_SINGLE_VEHICLE, getSingleVehicle, api),
    takeLatest(InventoryTypes.GET_VEHICLE_OPTIONS, getVehicleOptions, api),
    takeLatest(InventoryPickerTypes.GET_MAKE, getMake, api),
    takeLatest(InventoryPickerTypes.GET_MODEL, getModel, api),
    takeLatest(InventoryPickerTypes.GET_TRIM, getTrim, api),
    takeLatest(InventoryPickerTypes.GET_FUEL_TYPE, getFuelType, api),
    takeLatest(InventoryPickerTypes.GET_DRIVE_TYPE, getDriveType, api),
    takeLatest(InventoryPickerTypes.GET_TRANSMISSION, getTransmission, api),
    takeLatest(InventoryPickerTypes.GET_ENGINE, getEngine, api),
    takeLatest(InventoryPickerTypes.GET_BODY_STYLE, getBodyStyle, api),
    takeLatest(InventoryPickerTypes.GET_INTERIOR_SURFACE, getInteriorSurface, api),
    takeLatest(InventoryPickerTypes.GET_COLOR, getColor, api),
    takeLatest(InventoryTypes.GET_IMAGE, getImage, api),
    takeLatest(InventoryTypes.CHOICE, choice),
    takeLatest(InventoryTypes.SAVE_VEHICLE_DTO, saveVehicleDTO, api),
    takeLatest(InventoryTypes.REORDER_IMAGES, reorderImages, api),
    takeLatest(InventoryTypes.DELETE_VEHICLE_IMAGE, deleteVehicleImage, api),
    takeLatest(InventoryTypes.POST_NEW_IMAGE, postNewImage, api)
  ])
}
