import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import CustomTextInput from '../Components/CustomTextInput'
import { Actions, ActionConst } from 'react-native-router-flux'
import AuthActions from '../Redux/AuthRedux'
import LoadingSpinnerOverlay from '@react-native-component/react-native-smart-loading-spinner-overlay/LoadingSpinnerOverlay'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Api from '../Services/Api'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'
import { bindActionCreators } from 'redux'
import InventoryActions from '../Redux/InventoryRedux'
import InventoryPickerActions from '../Redux/InventoryPickerRedux'
import MarketingActions from '../Redux/MarketingRedux'
import DealActions from '../Redux/DealRedux'
const imageBackground = require('../Images/Login/background.png')
const iconLogo = require('../Images/Login/logo.png')
const iconUser = require('../Images/Login/ic_username.png')
const iconPass = require('../Images/Login/ic_password.png')
// const backgroundLogin = require('../Images/Login/login_background.png')
const api = Api.create()

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: 'demoapi',
      password: 'api101'
    }
    // console.log('token', this.props.token)
    this.load = true
    this.hello = true
  }
  async componentWillReceiveProps (newProps) {
    this.forceUpdate()
    if (this.isAttempting && !newProps.fetching) {
      this.isAttempting = false
      if (newProps.isSuccess && newProps.token) {
        if (this.load) {
          await this.props.getMake()
          await this.props.getColor()
          await this.props.getBodyStyle()
          await this.props.getInteriorSurface()
          await this.props.getEngine()
          await this.props.getTransmission()
          await this.props.getFuelType()
          await this.props.getDriveType()
          await this.getCrmLeads(newProps.token)
          await this.getListAppointments(newProps.token, newProps.userID)
          await this.getListReplies(newProps.token, newProps.userID)
          await this.getCrmFilterList(newProps.token)
          await this.getAllDeal(newProps.token)
          await this.props.getVehicles()
          this.load = false
        }
        this.attemting = true
      } else {
        this._modalLoadingSpinnerOverLay.hide()
      }
    }
    if (this.attemting && !newProps.fetch) {
      setTimeout(() => {
        if (newProps.success && this.hello) {
          this._modalLoadingSpinnerOverLay.hide()
          Actions.drawer({ type: ActionConst.RESET })
        }
        if (this.hello === false) {
          this._modalLoadingSpinnerOverLay.hide()
        }
      }, 500)
    }
  }
  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  async getCrmLeads (token) {
    __DEV__ && console.log(token)
    api.setToken(token)
    const crm = {
      DateRangeFrom: '2018-01-04',
      DateRangeTo: '2018-07-04'
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
  onPressLogin () {
    this.hello = true
    const { username, password } = this.state
    this.isAttempting = true
    this._modalLoadingSpinnerOverLay.show()
    this.props.basicAuth({ username, password })
  }
  render () {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.allView}>
            <Image style={styles.background} source={imageBackground} />
            <View style={{ flex: 1 }}>
              <View style={styles.viewLogo}>
                <Image style={styles.logo} source={iconLogo} />
              </View>
              <View style={styles.viewLogin}>
                <View style={styles.view}>
                  {/* <Image source={backgroundLogin} style={styles.backgroundLogin} /> */}
                  <CustomTextInput
                    text={this.state.username}
                    source={iconUser}
                    label={'Username'}
                    onChangeText={(username) => this.setState({ username })}
                  />
                  <CustomTextInput
                    text={this.state.password}
                    source={iconPass}
                    label={'Password'}
                    secureTextEntry
                    onChangeText={(password) => this.setState({ password })}
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 20,
                      bottom: 115
                    }}>
                    <Text style={styles.textForget}>Forgot Password?</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.onPressLogin()}
                    style={styles.buttonLogin}>
                    <Text style={styles.textButton}>Login</Text>
                  </TouchableOpacity>
                  <View style={styles.viewSignUp}>
                    <Text style={styles.textSignUp}>Dont Have Account? </Text>
                    <TouchableOpacity>
                      <Text style={[styles.textSignUp, { color: '#215bc4' }]}>
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <LoadingSpinnerOverlay
          ref={(component) => {
            this._modalLoadingSpinnerOverLay = component
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    fetching: state.auth.fetching,
    isSuccess: state.auth.isSuccess,
    token: state.auth.token,
    success: state.inventory.isSuccess,
    fetch: state.inventory.fetching,
    userID: state.auth.userID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    basicAuth: (auth) => dispatch(AuthActions.basicAuth(auth)),
    getVehicles: bindActionCreators(InventoryActions.getVehicles, dispatch),
    getMake: bindActionCreators(InventoryPickerActions.getMake, dispatch),
    getColor: bindActionCreators(InventoryPickerActions.getColor, dispatch),
    getBodyStyle: bindActionCreators(
      InventoryPickerActions.getBodyStyle,
      dispatch
    ),
    getInteriorSurface: bindActionCreators(
      InventoryPickerActions.getInteriorSurface,
      dispatch
    ),
    getEngine: bindActionCreators(InventoryPickerActions.getEngine, dispatch),
    getTransmission: bindActionCreators(
      InventoryPickerActions.getTransmission,
      dispatch
    ),
    getFuelType: bindActionCreators(
      InventoryPickerActions.getFuelType,
      dispatch
    ),
    getDriveType: bindActionCreators(
      InventoryPickerActions.getDriveType,
      dispatch
    ),
    ...bindActionCreators(MarketingActions, dispatch),
    ...bindActionCreators(DealActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
