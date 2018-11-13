import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, TouchableOpacity, Alert, Platform } from 'react-native'
import { connect } from 'react-redux'
// import Barcode from 'react-native-smart-barcode'
// import BarcodeScanner from 'react-native-barcodescanner'
import RNCamera from 'react-native-camera'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ScanVinScreenStyle'
import { Actions } from 'react-native-router-flux'
const iconBack = require('../Images/AddDeal/ic_back.png')
const navBarBackground = require('../Images/AddDeal/navigation_background.png')
class ScanVinScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      qrcode: '',
      alertIsVisible: false,
    }
  }

  _onBarCodeRead = (e) => {
    try {
      const { alertIsVisible } = this.state;
      if (!alertIsVisible) {
        this.setState({
          alertIsVisible: true
        }, () => {
          Alert.alert(
            'VIN code read successful',
            e.data,
            [
              { text: 'Cancel',
              onPress: () => {
                this.setState({
                  alertIsVisible: false,
                })
              }
              },
              {
                text: 'Use this code',
                onPress: () => {
                  this.setState({
                    alertIsVisible: false,
                  }, () => {
                    if (this.props.onSuccess) {
                      this.props.onSuccess(e);
                    }
                  })
                },
              },
            ],
          );
        })
      }
    } catch (err) {
      console.warn('die at onBarCodeRead', err)
    }
  }
  render () {
    const barcodeTypes = Platform.select({
      ios: ['org.iso.Code39', 'org.iso.Code39Mod43', 'org.iso.Code128'],
      android: ['code39mod43', 'code39', 'code128', 'code93']
    })
    return (
      <View style={{flex: 1, backgroundColor: '#434343'}}>
        <Image
          style={styles.navBarBackground}
          source={navBarBackground} />
        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={this.props.screenProps.toggle}
          >
            <Image style={styles.iconNavBar} source={iconBack} />
          </TouchableOpacity>
          <View style={styles.viewTitle}>
            <Text style={styles.title}>
              Scan VIN Code
            </Text>
          </View>
        </View>
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView behavior='position'>
            <RNCamera
              style={styles.preview}
              barCodeTypes={barcodeTypes}
              onBarCodeRead={(e) => this._onBarCodeRead(e)}
              // orientation={'landscapeLeft' | 'landscapeRight'}
              ref={cam => this.camera = cam}
              aspect={'fill'}
              cropToPreview
            >
              <Text style={{
                backgroundColor: 'white'
              }}>{this.state.qrcode}</Text>
            </RNCamera>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanVinScreen)
