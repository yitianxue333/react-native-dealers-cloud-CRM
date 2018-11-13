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

import { call, put, select } from 'redux-saga/effects'
import InventoryActions from '../Redux/InventoryRedux'
import InventoryPickerActions from '../Redux/InventoryPickerRedux'
import RNFetchBlob from 'react-native-fetch-blob'

// import { InventorySelectors } from '../Redux/InventoryRedux'

export function * getVehicles (api) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.getVehicles)
  if (__DEV__) console.log('Vehicles', response)
  if (response.ok) {
    yield put(InventoryActions.getVehiclesSuccess(response.data))
  } else {
    yield put(InventoryActions.getVehiclesSuccess([]))
    // yield put(InventoryActions.getVehiclesFailure())
  }
}

export function * getVehicleInformation (api, {vin}) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.getVehicleInformation, vin)
  if (__DEV__) console.log('Information', response)
  if (response.ok) {
    yield put(InventoryActions.getVehicleInformationSuccess(response.data))
  } else {
    yield put(InventoryActions.getVehicleInformationFailure())
  }
}

export function * getVehicleNada (api, {vehicleId, vin, mileage}) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.getVehicleNada, vehicleId, vin, mileage)
  if (__DEV__) console.log('nada', response)
  if (response.ok) {
    yield put(InventoryActions.getVehicleNadaSuccess(response.data))
  } else {
    yield put(InventoryActions.getVehicleNadaFailure())
  }
}

export function * getSingleVehicle (api, {id}) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.getSingleVehicle, id)
  if (__DEV__) console.log('single', response)
  if (response.ok) {
    yield put(InventoryActions.getSingleVehicleSuccess(response.data))
  } else {
    yield put(InventoryActions.getSingleVehicleFailure())
  }
}

export function * getVehicleOptions (api, {dealershipId}) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.getVehicleOptions, dealershipId)
  if (__DEV__) console.log('vihicleOptions', response)
  if (response.ok) {
    yield put(InventoryActions.getVehicleOptionsSuccess(response.data))
  } else {
    yield put(InventoryActions.getVehicleOptionsFailure())
  }
}

export function * getMake (api) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.getDealership, 7)
  if (__DEV__) console.log('Makes', response)
  if (response.ok) {
    yield put(InventoryPickerActions.getMakeSuccess(response.data))
  } else {
    yield put(InventoryPickerActions.getMakeFailure())
  }
}

export function * getBodyStyle (api) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.getMasterList, 1)
  if (__DEV__) console.log('bodyStyle', response)
  if (response.ok) {
    yield put(InventoryPickerActions.getBodyStyleSuccess(response.data))
  } else {
    yield put(InventoryPickerActions.getBodyStyleFailure())
  }
}

export function * getInteriorSurface (api) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.getMasterList, 11)
  if (__DEV__) console.log('interiorSurface', response)
  if (response.ok) {
    yield put(InventoryPickerActions.getInteriorSurfaceSuccess(response.data))
  } else {
    yield put(InventoryPickerActions.getInteriorSurfaceFailure())
  }
}

export function * getEngine (api) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.getMasterList, 8)
  if (__DEV__) console.log('engine', response)
  if (response.ok) {
    yield put(InventoryPickerActions.getEngineSuccess(response.data))
  } else {
    yield put(InventoryPickerActions.getEngineFailure())
  }
}

export function * getTransmission (api) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.getMasterList, 19)
  if (__DEV__) console.log('transmission', response)
  if (response.ok) {
    yield put(InventoryPickerActions.getTransmissionSuccess(response.data))
  } else {
    yield put(InventoryPickerActions.getTransmissionFailure())
  }
}

export function * getFuelType (api) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.getMasterList, 10)
  if (__DEV__) console.log('fuelType', response)
  if (response.ok) {
    yield put(InventoryPickerActions.getFuelTypeSuccess(response.data))
  } else {
    yield put(InventoryPickerActions.getFuelTypeFailure())
  }
}

export function * getDriveType (api) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.getMasterList, 7)
  if (__DEV__) console.log('driveType', response)
  if (response.ok) {
    yield put(InventoryPickerActions.getDriveTypeSuccess(response.data))
  } else {
    yield put(InventoryPickerActions.getDriveTypeFailure())
  }
}
export function * getModel (api, {id}) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.getModel, id)
  if (__DEV__) console.log('Models', response)
  if (response.ok) {
    yield put(InventoryPickerActions.getModelSuccess(response.data))
  } else {
    yield put(InventoryPickerActions.getModelFailure())
  }
}

export function * getTrim (api, {id}) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.getTrim, id)
  if (__DEV__) console.log('trims', response)
  if (response.ok) {
    yield put(InventoryPickerActions.getTrimSuccess(response.data))
  } else {
    yield put(InventoryPickerActions.getTrimFailure())
  }
}

export function * getColor (api) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.getDealership, 4)
  if (__DEV__) console.log('Color', response)
  if (response.ok) {
    yield put(InventoryPickerActions.getColorSuccess(response.data))
  } else {
    yield put(InventoryPickerActions.getColorFailure())
  }
}

export function * getImage (api, {id}) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.getImageVehicle, id)
  if (__DEV__) console.log('Image', response)
  if (response.ok) {
    yield put(InventoryActions.getImageSuccess(response.data))
  } else {
    yield put(InventoryActions.getImageFailure())
  }
}

export function * choice ({id}) {
  if (__DEV__) console.log('choice', id)
  yield put(InventoryActions.choiceAdd(id))
}

export function * saveVehicleDTO (api, {vehicleDTO, userID}) {
  // console.log(vehicleDTO)
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.saveVehicleDTO, vehicleDTO, userID)
  if (__DEV__) console.log('vehicleDTO', response)
  if (response.ok) {
    yield put(InventoryActions.saveVehicleDtoSuccess())
  } else {
    yield put(InventoryActions.saveVehicleDtoFailure())
  }
  // fetch('https://dcapi.dealerscloud.com/api/Vehicle/SaveVehicle?DealershipID=11', {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer ' + token,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(vehicleDTO)
  // }).then((response) => response.json()).then((responseJson) => {
  //   __DEV__ && console.log('responseJson', responseJson)
  // }).catch((error) => {
  //   console.error(error)
  // })
}

export function * reorderImages (api, {id, oldPos, newPos}) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.reorderImages, {id, oldPos, newPos})
  if (response.ok) {
    yield put(InventoryActions.reorderImagesSuccess())
  } else {
    yield put(InventoryActions.reorderImagesFailure())
  }
}

export function * deleteVehicleImage (api, {id, vehicleId, vin}) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  const response = yield call(api.deleteVehicleImage, id, vehicleId, vin)
  if (__DEV__) console.log('delete', response)
  if (response.ok) {
    yield put(InventoryActions.deleteVehicleImageSuccess())
  } else {
    yield put(InventoryActions.deleteVehicleImageFailure())
  }
}

export function * postNewImage (api, {vehicleId, vin, image}) {
  const token = yield select(state => state.auth.token)
  api.setToken(token)
  // const response = yield call(api.postNewImage, vehicleId, vin, image)
  // if (__DEV__) console.log('postNewImage', response)
  // if (response.ok) {
  //   yield put(InventoryActions.postNewImageSuccess())
  // } else {
  //   yield put(InventoryActions.postNewImageFailure())
  // }
  // console.log(a)
  const apiUpload = `https://dcapi.dealerscloud.com/api/Vehicle/UploadVehicleImages?DealershipID=11&VehicleID=${vehicleId}&VIN=${vin}`
  const response = yield RNFetchBlob.fetch('POST', apiUpload, {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/octet-stream'
  }, image)
}
