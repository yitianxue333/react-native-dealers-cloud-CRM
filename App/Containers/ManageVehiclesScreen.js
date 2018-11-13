import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Image,
  LayoutAnimation,
  UIManager,
  SectionList
} from 'react-native'
import { connect } from 'react-redux'
import accounting from 'accounting'
import LoadingSpinnerOverlay
  from '@react-native-component/react-native-smart-loading-spinner-overlay/LoadingSpinnerOverlay'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'

// Styles
import styles from './Styles/ManageVehiclesScreenStyle'
import InventoryActions from '../Redux/InventoryRedux'
import InventoryPickerActions from '../Redux/InventoryPickerRedux'
import { bindActionCreators } from 'redux'

const car = require('../Images/car.png')
const _ = require('lodash')

class ManageVehiclesScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      vehicles: [],
      isShow: []
    }
  }

  componentDidMount () {
    try {
      const {vehicles} = this.props
      // const grouped = _.groupBy(vehicles, (car) => car.Make);
      const grouped = _.chain(vehicles)
        .groupBy('Make')
        .toPairs()
        .map((car) => _.zipObject(['title', 'data'], car))
        .value()
      const orderedGroup = _.orderBy(grouped, 'title', 'asc')
      this.setState({
        vehicles: orderedGroup
      })
    } catch (err) {
      console.log('error at group data vehicles', err)
    }
  }

  componentDidUpdate () {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    LayoutAnimation.easeInEaseOut()
  }

  componentWillReceiveProps (newProps) {
    // __DEV__ && console.log(newProps.fetching, newProps.isSuccess)
    this.forceUpdate()
    if (this.isAttempting && !newProps.fetching && this.props.vehicle !== {} && this.props.image !== [] && this.props.item !== {}) {
      this.isAttempting = false
      setTimeout(() => {
        this._modalLoadingSpinnerOverLay.hide()
        if (newProps.isSuccess) {
          Actions.addVehicleManual()
        }
      }, 2000)
    }
  }

  onPress (item) {
    this.isAttempting = true
    this._modalLoadingSpinnerOverLay.show()
    this.props.getSingleVehicle(item.VehicleID)
    this.props.getVehicleInformation(item.VIN)
    this.props.getImage(item.VehicleID)
    this.props.choice(1)
  }

  onPressHeader = (make) => {
    try {
      const {isShow} = this.state
      if (isShow.indexOf(make) < 0) {
        isShow.push(make)
      } else {
        isShow.splice(isShow.indexOf(make), 1)
      }
      this.setState({
        isShow
      })
    } catch (err) {
      console.log('err at pressHeader', err)
    }
  }
  _renderSectionHeader = (item) => {
    const {title, data} = item.section
    const {isShow} = this.state
    return (
      <TouchableOpacity style={styles.headerContainer} onPress={() => this.onPressHeader(title)}>
        <Text style={styles.headerSection}>{title} - {data.length} {data.length > 1 ? 'vehicles' : 'vehicle'}</Text>
        <Icon
          name={isShow.indexOf(title) < 0 ? 'ios-arrow-up' : 'ios-arrow-down'}
          size={30} style={styles.iconStyle}
        />
      </TouchableOpacity>
    )
  }
  _renderItem = (item) => {
    const {isShow} = this.state
    if (isShow.indexOf(item.Make) < 0) {
      return null
    }
    return (
      <TouchableOpacity
        onPress={() => {
          this.onPress(item)
        }}
        style={styles.item}>
        {
          item.VehicleImage === null
            ? <Image
              style={styles.image}
              source={car}
            />
            : <Image
              style={styles.image}
              source={{uri: item.VehicleImage}}
            />
        }
        <View style={styles.textView}>
          <View>
            <Text style={styles.textItem}>Model: {item.Model}</Text>
            <Text style={styles.textItem}>{item.ModelYear}</Text>
          </View>
          <View style={{position: 'absolute', right: 0, bottom: 0}}>
            <Text style={styles.textItem}>{accounting.formatMoney(item.CostOfCar)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    const {vehicles} = this.state
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          {
            vehicles && vehicles.length > 0
              ? <SectionList
                keyExtractor={(item) => item.VehicleID}
                renderSectionHeader={(item) => this._renderSectionHeader(item)}
                renderItem={({item}) => this._renderItem(item)}
                sections={vehicles}
              />
              : null
          }
          <LoadingSpinnerOverlay
            ref={(component) => { this._modalLoadingSpinnerOverLay = component }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  vehicles: state.inventory.vehicles,
  vehicle: state.inventory.vehicle,
  item: state.inventory.item,
  image: state.inventory.image,
  fetching: state.inventory.features,
  isSuccess: state.inventory.isSuccess
})

const mapDispatchToProps = (dispatch) => ({
  getVehicleInformation: bindActionCreators(InventoryActions.getVehicleInformation, dispatch),
  getSingleVehicle: bindActionCreators(InventoryActions.getSingleVehicle, dispatch),
  getImage: bindActionCreators(InventoryActions.getImage, dispatch),
  getModel: bindActionCreators(InventoryPickerActions.getModel, dispatch),
  getTrim: bindActionCreators(InventoryPickerActions.getTrim, dispatch),
  choice: (id) => dispatch(InventoryActions.choice(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageVehiclesScreen)
