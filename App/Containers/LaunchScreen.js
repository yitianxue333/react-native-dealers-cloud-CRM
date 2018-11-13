import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions, ActionConst } from 'react-native-router-flux'
import LoadingSpinnerOverlay from '@react-native-component/react-native-smart-loading-spinner-overlay/LoadingSpinnerOverlay'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LaunchScreenStyle'
import InventoryPickerActions from '../Redux/InventoryPickerRedux'
import InventoryActions from '../Redux/InventoryRedux'
import MarketingActions from '../Redux/MarketingRedux'
import Api from '../Services/Api'
import DealActions from '../Redux/DealRedux'
const imageBackground = require('../Images/Login/background.png')

const api = Api.create()
class LaunchScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.isAttempting = false
    this.load = true
    this.hello = true
  }
  componentDidMount () {
    console.log('token', this.props.token)
    this.timer = setTimeout(() => {
      if (!this.props.fetching) {
        Actions.loginScreen({type: ActionConst.RESET})
      }
    }, 20000)
  }
  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  async loading (token, userID) {
    if (this.load) {
      await this.props.getMake()
      await this.props.getColor()
      await this.props.getBodyStyle()
      await this.props.getInteriorSurface()
      await this.props.getEngine()
      await this.props.getTransmission()
      await this.props.getFuelType()
      await this.props.getDriveType()
      await this.getCrmLeads(token)
      await this.getListAppointments(token, userID)
      await this.getListReplies(token, userID)
      await this.getCrmFilterList(token)
      await this.getAllDeal(token)
      await this.props.getVehicles()
    }
  }
  async getCrmLeads (token) {
    __DEV__ && console.log(token)
    api.setToken(token)
    const crm = {
      'DateRangeFrom': '2018-01-04',
      'DateRangeTo': '2018-07-04'
    }
    const response = await api.getListCRM(50, 0, crm)
    __DEV__ && console.log('crmLeads', response, response.data)
    if (response.ok) {
      this.props.getCmrLeads(response.data)
    } else {
      this.hello = false
    }
  }
  async getListAppointments (token, userID) {
    api.setToken(token)
    const response = await api.getListAppointments(null, -1, 20, 0)
    __DEV__ && console.log('listApp', response, response.data)
    if (response.ok) {
      this.props.getListAppointments(response.data)
    } else {
      this.hello = false
    }
  }
  async getListReplies (token, userID) {
    api.setToken(token)
    const response = await api.getListReplies(null, userID, 20, 0)
    __DEV__ && console.log('listApp', response, response.data)
    if (response.ok) {
      this.props.getListReplies(response.data)
    } else {
      this.hello = false
    }
  }
  async getAllDeal (token) {
    __DEV__ && console.log(token)
    api.setToken(token)
    const deal = {}
    const response = await api.getDeals(deal)
    __DEV__ && console.log('All Deal', response)
    if (response.ok) {
      this.props.getAllDeal(response.data)
    } else {
      this.hello = false
    }
  }
  async getCrmFilterList (token) {
    api.setToken(token)
    const a = await api.getCRMFilterList(0)
    const b = await api.getCRMFilterList(1)
    const c = await api.getCRMFilterList(2)
    const d = await api.getCRMFilterList(3)
    const e = await api.getCRMFilterList(4)
    const f = await api.getCRMFilterList(5)
    const g = await api.getDealership(5)
    const h = await api.getListInteractionTypes()
    const i = await api.getLeadStatus()
    __DEV__ && console.log('Filter', a, b, c, d, e, f, g, h)
    if (a.ok) {
      this.props.getType(a.data)
    } else {
      this.hello = false
    }
    if (b.ok) {
      this.props.getLeadStatus(b.data)
    } else {
      this.hello = false
    }
    if (c.ok) {
      this.props.getLeadAssigned(c.data)
    } else {
      this.hello = false
    }
    if (d.ok) {
      this.props.getLeadSort(d.data)
    } else {
      this.hello = false
    }
    if (e.ok) {
      this.props.getSortOrder(e.data)
    } else {
      this.hello = false
    }
    if (f.ok) {
      this.props.getTemperature(f.data)
    } else {
      this.hello = false
    }
    if (g.ok) {
      this.props.getSource(g.data)
    } else {
      this.hello = false
    }
    if (h.ok) {
      this.props.getTaskType(h.data)
    } else {
      this.hello = false
    }
    if (i.ok) {
      this.props.getLeadStatuss(i.data)
    } else {
      this.hello = false
    }
  }
  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    if (newProps.token !== null && newProps.userID !== null) {
      __DEV__ && console.log('token', newProps.token)
      this.loading(newProps.token, newProps.userID)
      this.load = false
    }
    if (newProps.fetching) {
      this.isAttempting = true
    }
    __DEV__ && console.log(this.isAttempting, newProps.fetching)
    if (this.isAttempting && !newProps.fetching) {
      __DEV__ && console.log('fdsfd')
      __DEV__ && console.log(this.isAttempting, newProps.fetching)
      this.isAttempting = false
      setTimeout(() => {
        if (newProps.isSuccess && this.hello) {
          Actions.drawer({type: ActionConst.RESET})
        } else {
          Actions.loginScreen({type: ActionConst.RESET})
        }
      }, 500)
    }
  }
  render () {
    console.log(this.props.userID)
    return (
      <View style={styles.container}>
        <Image
          style={styles.background}
          source={imageBackground} />
        <LoadingSpinnerOverlay
          ref={(component) => { this._modalLoadingSpinnerOverLay = component }} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isSuccess: state.inventory.isSuccess,
    token: state.auth.token,
    fetching: state.inventory.fetching,
    userID: state.auth.userID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getVehicles: bindActionCreators(InventoryActions.getVehicles, dispatch),
    getMake: bindActionCreators(InventoryPickerActions.getMake, dispatch),
    getColor: bindActionCreators(InventoryPickerActions.getColor, dispatch),
    getBodyStyle: bindActionCreators(InventoryPickerActions.getBodyStyle, dispatch),
    getInteriorSurface: bindActionCreators(InventoryPickerActions.getInteriorSurface, dispatch),
    getEngine: bindActionCreators(InventoryPickerActions.getEngine, dispatch),
    getTransmission: bindActionCreators(InventoryPickerActions.getTransmission, dispatch),
    getFuelType: bindActionCreators(InventoryPickerActions.getFuelType, dispatch),
    getDriveType: bindActionCreators(InventoryPickerActions.getDriveType, dispatch),
    ...bindActionCreators(MarketingActions, dispatch),
    ...bindActionCreators(DealActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
