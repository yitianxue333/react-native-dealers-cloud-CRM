import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions, ActionConst } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/VehiclesScreenStyle'
// import InventoryPickerActions from '../Redux/InventoryPickerRedux'
import InventoryActions from '../Redux/InventoryRedux'
import InventoryPickerActions from '../Redux/InventoryPickerRedux'
import { bindActionCreators } from 'redux'
const background = require('../Images/AddDeal/background.png')
const iconArrow = require('../Images/ic_arrow.png')

class VehiclesScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  async onPressBasic () {
    if (this.props.id === 1) {
      const {vehicle} = this.props
      __DEV__ && console.log('vehicle', vehicle)
      await this.props.getModel(vehicle._Vehicle.MakeID)
      await this.props.getTrim(vehicle._Vehicle.ModelID)
      Actions.basicInfoScreen()
    } else {
      Actions.basicInfoScreen()
    }
  }
  render () {
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background} />
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView behavior='position'>
            <TouchableOpacity
              onPress={() => this.onPressBasic()}
              style={[styles.viewItem, { backgroundColor: '#f92450', marginTop: 30 }]}>
              <Text style={styles.text}>Basic Info</Text>
              <Image style={styles.icon} source={iconArrow} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.pricingScreen()}
              style={[styles.viewItem, {backgroundColor: '#00b9f6'}]}>
              <Text style={styles.text}>Pricing</Text>
              <Image style={styles.icon} source={iconArrow} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.purchaseInformationScreen()}
              style={[styles.viewItem, {backgroundColor: '#00c848'}]}>
              <Text style={styles.text}>Purchase Information</Text>
              <Image style={styles.icon} source={iconArrow} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.optionsScreen()}
              style={[styles.viewItem, {backgroundColor: '#113b82'}]}>
              <Text style={styles.text}>Options</Text>
              <Image style={styles.icon} source={iconArrow} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.flagsScreen()}
              style={[styles.viewItem, {backgroundColor: '#ef009c'}]}>
              <Text style={styles.text}>Flags</Text>
              <Image style={styles.icon} source={iconArrow} />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    vehicle: state.inventory.vehicle,
    id: state.inventory.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveVehicleDTO: (vehicleDTO) => dispatch(InventoryActions.getTrim(vehicleDTO)),
    getModel: bindActionCreators(InventoryPickerActions.getModel, dispatch),
    getTrim: bindActionCreators(InventoryPickerActions.getTrim, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesScreen)
