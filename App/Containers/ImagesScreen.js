import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, FlatList, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import ActionSheet from '../Components/ActionSheetCustom'
import ImageCropPicker from 'react-native-image-crop-picker'
import LoadingSpinnerOverlay from '@react-native-component/react-native-smart-loading-spinner-overlay/LoadingSpinnerOverlay'
import RNFetchBlob from 'react-native-fetch-blob'
import ImageLoad from 'react-native-image-placeholder'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ImagesScreenStyle'
import InventoryActions from '../Redux/InventoryRedux'
import { bindActionCreators } from 'redux'
import { ActionConst, Actions } from 'react-native-router-flux'
const background = require('../Images/AddDeal/background.png')

class ImagesScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      image: [],
      selectedAvatar: ''
    }
  }
  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    this.setState({
      image: newProps.image
    })
    // if (this.state.isUploadImage && !nextProps.uploading) {
    //   this._modalLoadingSpinnerOverLay.hide()
    //   this.setState({ isUploadImage: false })
    //   setTimeout(() => {
    //     if (nextProps.isUpdateSuccess) {
    //       // NavigationActions.pop()
    //     } else {
    //       const { error } = nextProps
    //     }
    //   }, 1500)
    // }
  }
  async chooseImageItem (index) {
    const options = {
      cropping: true,
      includeBase64: true
    }
    if (index === 1) {
      ImageCropPicker.openPicker(options).then(this.setImageItem).catch(error => { if (__DEV__) console.log(error) })
    } else if (index === 2) {
      ImageCropPicker.openCamera(options).then(this.setImageItem).catch(error => { if (__DEV__) console.log(error) })
    }
  }
  showAlert (item) {
    Alert.alert(
      'Delete Image',
      'Do You Want To Delete The Image?',
      [
        {text: 'Cancel', onPress: () => __DEV__ && console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK',
          onPress: () => {
            // this._modalLoadingSpinnerOverLay.show()
            this.props.deleteVehicleImage(item.ImageID, item.VehicleID, item.VIN)
            setTimeout(() => {
              // this._modalLoadingSpinnerOverLay.hide()
              Actions.drawer({type: ActionConst.RESET})
            }, 500)
          }}
      ],
      { cancelable: false }
    )
  }

  setImageItem = image => {
    __DEV__ && console.log('IMAGE', image)
    this.setState({ selectedAvatar: image.path, isChanged: true })
  }
  async onSave () {
    const { selectedAvatar } = this.state
    __DEV__ && console.log(selectedAvatar)
    const image = this.props.vehicle._Vehicle
    this.setState({ isUploadImage: true })
    __DEV__ && console.log(image.VehicleID, image.VIN)
    const apiUpload = `https://dcapi.dealerscloud.com/api/Vehicle/UploadVehicleImages?DealershipID=11&VehicleID=${image.VehicleID}&VIN=${image.VIN}`
    __DEV__ && console.log('api', apiUpload)
    const response = await RNFetchBlob.fetch('POST', apiUpload, {
      Authorization: 'Bearer ' + this.props.token,
      'Content-Type': 'multipart/form-data'
    }, [
      {
        name: 'image',
        filename: 'image.jpg',
        type: 'image/jpeg',
        // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
        // Or simply wrap the file path with RNFetchBlob.wrap().
        data: RNFetchBlob.wrap(selectedAvatar)
      }
    ])
    if (__DEV__) console.log('api response:', response)
  }
  render () {
    if (this.props.id === 1) {
      const image = this.props.image
      console.log('itemImage', image)
      return (
        <View style={styles.allView}>
          <Image
            style={styles.background}
            source={background} />
          <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior='position'>
              <ActionSheet
                ref='ActionSheet'
                title={''}
                options={['cancel', 'fromLibrary', 'fromCamera']}
                cancelButtonIndex={0}
                destructiveButtonIndex={4}
                onPress={(i) => setTimeout(() => {
                  this.chooseImageItem(i)
                }, 300)}
              />
              <View style={{
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                flexDirection: 'row'
              }}>
                <TouchableOpacity
                  onPress={() => this.refs.ActionSheet.show()}>
                  <Text style={{padding: 20, backgroundColor: '#62ff43', borderRadius: 20}}>Add Image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onSave()}>
                  <Text style={{padding: 20, backgroundColor: '#62ff43', borderRadius: 20}}>Up Image</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={image}
                removeClippedSubviews
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => this.showAlert(item)}
                  >
                    <ImageLoad
                      loadingStyle={{ size: 'small', color: 'gray' }}
                      style={styles.image} source={{uri: item.url}} />
                  </TouchableOpacity>)}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      )
    } else {
      return (
        <View style={styles.allView}>
          <Image
            style={styles.background}
            source={background} />
          <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior='position' >
              <Text style={{backgroundColor: 'transparent'}}>Please save vehicle first and then add images.</Text>
              <LoadingSpinnerOverlay
                ref={(component) => { this._modalLoadingSpinnerOverLay = component }} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    image: state.inventory.image,
    id: state.inventory.id,
    uploading: state.inventory.uploading,
    vehicle: state.inventory.vehicle,
    isUploadSuccess: state.inventory.isUpdateSuccess,
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteVehicleImage: bindActionCreators(InventoryActions.deleteVehicleImage, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagesScreen)
