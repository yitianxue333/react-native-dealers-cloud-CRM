import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Platform,
  FlatList
} from 'react-native'
import Api from '../Services/Api'
import LoadingSpinnerOverlay from '@react-native-component/react-native-smart-loading-spinner-overlay/LoadingSpinnerOverlay'
import Moment from 'moment'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { RadioButtons } from 'react-native-radio-buttons'
// Styles
import styles from './Styles/MarketingScreenStyle'
import { Actions } from 'react-native-router-flux'
import { Fonts } from '../Themes'
import { bindActionCreators } from 'redux'
import MarketingActions from '../Redux/MarketingRedux'
import InventoryActions from '../Redux/InventoryRedux'
const iconBack = require('../Images/AddDeal/ic_back.png')
const navBarBackground = require('../Images/AddDeal/navigation_background.png')
const iconFilter = require('../Images/AddDeal/ic_filter.png')
const background = require('../Images/AddDeal/background.png')
const iconRight = require('../Images/Marketing/ic_right.png')
const api = Api.create()
class MarketingScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedOption: {'label': 'LEADS', 'icon': 'account-group'},
      leads: this.props.leads,
      appointments: this.props.appointments,
      replies: this.props.replies
    }
  }
  avatarText (text) {
    let avatar = ''
    let count = 0
    for (let i = 0; i < text.length; i++) {
      if (text[i] === text[i].toUpperCase() && text[i] !== ' ') {
        avatar = avatar + text[i]
        count++
      }
      if (count === 2) {
        return avatar
      }
    }
    return avatar
  }
  async onPressNext (customerID, vehicleID) {
    this._modalLoadingSpinnerOverLay.show()
    if (vehicleID !== 0) {
      await this.props.getSingleVehicle(vehicleID)
    }
    await this.getSingleLead(customerID)
    await this.getListTimeLines(customerID)
    await this.getListUserTasks(customerID)
    await this.getLeadDTO(customerID)
    await this.getCreditApplicationDTO(customerID)
    await setTimeout(() => {
      this._modalLoadingSpinnerOverLay.hide()
      Actions.leadDetailScreen()
    }, 1000)
  }
  async getListTimeLines (customerID) {
    const { token } = this.props
    api.setToken(token)
    const response = await api.getListTimelines(customerID)
    __DEV__ && console.log('TimeLines', response)
    if (response.ok) {
      this.props.getListTimeLines(response.data)
    }
  }
  async getSingleLead (customerID) {
    const { token } = this.props
    api.setToken(token)
    const response = await api.getSingleLead(customerID)
    __DEV__ && console.log('SingleLead', response)
    if (response.ok) {
      this.props.getSingleLead(response.data)
    }
  }
  async getListUserTasks (customerID) {
    const { token } = this.props
    api.setToken(token)
    const response = await api.getListUserTasks(customerID)
    __DEV__ && console.log('UserTask', response)
    if (response.ok) {
      this.props.getListUserTasks(response.data)
    }
  }
  async getLeadDTO (customerID) {
    const { token } = this.props
    api.setToken(token)
    const response = await api.getLeadDTO(customerID)
    __DEV__ && console.log('leadDTO', response)
    if (response.ok) {
      this.props.getLeadDto(response.data)
    }
  }
  async getCreditApplicationDTO (customerID) {
    const { token } = this.props
    api.setToken(token)
    const response = await api.getCreditApplicationDTO(customerID, null)
    __DEV__ && console.log('creditApplicationDTO', response)
    if (response.ok) {
      this.props.getCreditApplicationDto(response.data)
    }
  }
  renderBasic () {
    const options = [
      {'label': 'LEADS', 'icon': 'account-multiple'},
      {'label': 'APPOINTMENTS', 'icon': 'clock'}
    ]
    function setSelectedOption (selectedOption) {
      __DEV__ && console.log(selectedOption)
      this.setState({
        selectedOption
      })
    }

    function renderOption (option, selected, onSelect, index) {
      const color = selected ? '#ffffff' : '#000000'
      const colorBG = selected ? '#215bc3' : '#ffffff'
      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <View style={{ flex: 1,
            backgroundColor: colorBG,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
            paddingLeft: 15,
            marginHorizontal: 10,
            borderWidth: 1,
            borderColor: '#dddddd'
          }}>
            <Icon name={option.icon} size={30} color={color} />
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  marginLeft: 10,
                  color: color,
                  fontFamily: Fonts.type.medium,
                  fontSize: Platform.OS === 'ios' ? Fonts.size.medium : 12}}>{option.label}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
    }

    function renderContainer (optionNodes) {
      return <View style={{flexDirection: 'row'}}>{optionNodes}</View>
    }

    return (
      <View style={{paddingTop: 20,
        marginHorizontal: 5,
        marginBottom: 0}}>
        <RadioButtons
          options={options}
          onSelection={setSelectedOption.bind(this)}
          selectedOption={this.state.selectedOption}
          renderOption={renderOption}
          renderContainer={renderContainer}
          testOptionEqual={(a, b) => {
            if (!a || !b) {
              return false
            }
            return a.label === b.label
          }}
        />
      </View>)
  }
  renderBasic1 () {
    const options = [
      {'label': 'REMINDERS', 'icon': 'bell-ring-outline'},
      {'label': 'REPLIES', 'icon': 'file-document'}
    ]
    function setSelectedOption (selectedOption) {
      __DEV__ && console.log(selectedOption)
      this.setState({
        selectedOption
      })
    }

    function renderOption (option, selected, onSelect, index) {
      const color = selected ? '#ffffff' : '#000000'
      const colorBG = selected ? '#215bc3' : '#ffffff'
      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <View style={{ flex: 1,
            backgroundColor: colorBG,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
            paddingLeft: 15,
            marginHorizontal: 10,
            borderWidth: 1,
            borderColor: '#dddddd'
          }}>
            <Icon name={option.icon} size={30} color={color} />
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  marginLeft: 10,
                  color: color,
                  fontFamily: Fonts.type.medium,
                  fontSize: Platform.OS === 'ios' ? Fonts.size.medium : 12}}>{option.label}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
    }

    function renderContainer (optionNodes) {
      return <View style={{flexDirection: 'row'}}>{optionNodes}</View>
    }

    return (
      <View style={{paddingTop: 20,
        marginHorizontal: 5,
        marginBottom: 0}}>
        <RadioButtons
          options={options}
          onSelection={setSelectedOption.bind(this)}
          selectedOption={this.state.selectedOption}
          renderOption={renderOption}
          renderContainer={renderContainer}
          testOptionEqual={(a, b) => {
            if (!a || !b) {
              return false
            }
            return a.label === b.label
          }}
        />
      </View>)
  }
  renderItem () {
    switch (this.state.selectedOption.label) {
      case 'LEADS':
        return (
          <View>
            <View style={{marginLeft: 15,
              backgroundColor: '#ffffff',
              marginVertical: 15,
              flexDirection: 'row'
            }}>
              <Text style={[styles.textLabel, {marginLeft: 2, marginRight: 20}]}>CUSTOMER</Text>
              <Text style={styles.textLabel}>LAST UPDATED</Text>
              <Text style={[styles.textLabel, {marginLeft: 10, marginRight: 15}]}>ASSIGNED</Text>
              <Text style={styles.textLabel}>SOURCE</Text>
            </View>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.leads}
              renderItem={({ item }) => (
                <View style={styles.viewItem}>
                  <View style={{flexDirection: 'row',
                    alignItems: 'center'}}>
                    <View style={{
                      borderRadius: 20,
                      width: 30,
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#450094'}}>
                      <Text style={styles.nameText}>{this.avatarText(item.CustomerName)}</Text>
                    </View>
                    <Text style={styles.name}>{item.CustomerName}</Text>
                    <Text style={styles.time}>{Moment(item.LeadDate).format('l')}{'\n'}{Moment(item.LeadDate).format('LT')}</Text>
                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 100,
                      marginLeft: 20,
                      marginRight: 7
                    }}>
                      <View style={styles.workView}>
                        <Text
                          textAlign={'center'}
                          style={styles.work}>{item.StatusDescription.toUpperCase()}</Text>
                      </View>
                    </View>
                    <Text style={styles.time}>{item.LeadSourceName !== null && item.LeadSourceName}</Text>
                    <TouchableOpacity
                      onPress={() => this.onPressNext(item.CustomerID, item.VehicleID)}
                      style={{position: 'absolute', right: 3}}>
                      <Image style={styles.right} source={iconRight} />
                    </TouchableOpacity>
                  </View>
                </View>
                )} />
          </View>

        )
      case 'APPOINTMENTS':
        return (
          <View>
            <View style={{marginLeft: 15,
              backgroundColor: '#ffffff',
              marginVertical: 15,
              flexDirection: 'row'
            }}>
              <Text style={[styles.textLabel, {marginLeft: 2, marginRight: 20}]}>CUSTOMER</Text>
              <Text style={styles.textLabel}>ON</Text>
              <Text style={[styles.textLabel, {marginLeft: 10, marginRight: 15}]}>ASSIGNED</Text>
              <Text style={styles.textLabel}>SOURCE</Text>
            </View>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.appointments}
              renderItem={({ item }) => (
                <View style={styles.viewItem}>
                  <View style={{flexDirection: 'row',
                    alignItems: 'center'}}>
                    <View style={{
                      borderRadius: 20,
                      width: 30,
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#450094'}}>
                      <Text style={styles.nameText}>{this.avatarText(item.CustomerName)}</Text>
                    </View>
                    <Text style={styles.name}>{item.CustomerName}</Text>
                    <Text style={styles.time}>{Moment(item.LastUpdatedOn).format('l')}{'\n'}{Moment(item.LastUpdatedOn).format('LT')}</Text>
                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 100,
                      marginLeft: 20,
                      marginRight: 7
                    }}>
                      <View style={styles.workView}>
                        <Text
                          textAlign={'center'}
                          style={styles.work}>{item.StatusDescription.toUpperCase()}</Text>
                      </View>
                    </View>
                    <Text style={styles.time}>{item.LeadSourceName !== null && item.LeadSourceName}</Text>
                    <TouchableOpacity
                      onPress={() => this.onPressNext(item.CustomerID, item.VehicleID)}
                      style={{position: 'absolute', right: 3}}>
                      <Image style={styles.right} source={iconRight} />
                    </TouchableOpacity>
                  </View>
                </View>
              )} />
          </View>
        )
      case 'REMINDERS':
        return (
          <View>
            <View style={{marginLeft: 15,
              backgroundColor: '#ffffff',
              marginVertical: 15,
              flexDirection: 'row'
            }}>
              <Text style={[styles.textLabel, {marginLeft: 2, marginRight: 20}]}>CUSTOMER</Text>
              <Text style={styles.textLabel}>REMINDER DATE</Text>
              <Text style={[styles.textLabel, {marginLeft: 10, marginRight: 15}]}>DESCRIPTION</Text>
            </View>
          </View>
        )
      case 'REPLIES':
        return (
          <View>
            <View style={{marginLeft: 15,
              backgroundColor: '#ffffff',
              marginVertical: 15,
              flexDirection: 'row'
            }}>
              <Text style={[styles.textLabel, {marginLeft: 2, marginRight: 20}]}>CUSTOMER</Text>
              <Text style={styles.textLabel}>LAST UPDATED</Text>
              <Text style={[styles.textLabel, {marginLeft: 10, marginRight: 15}]}>ASSIGNED</Text>
              <Text style={styles.textLabel}>SOURCE</Text>
            </View>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.replies}
              renderItem={({ item }) => (
                <View style={styles.viewItem}>
                  <View style={{flexDirection: 'row',
                    alignItems: 'center'}}>
                    <View style={{
                      borderRadius: 20,
                      width: 30,
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#450094'}}>
                      <Text style={styles.nameText}>{this.avatarText(item.CustomerName)}</Text>
                    </View>
                    <Text style={styles.name}>{item.CustomerName}</Text>
                    <Text style={styles.time}>{Moment(item.LeadDate).format('l')}{'\n'}{Moment(item.LeadDate).format('LT')}</Text>
                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 100,
                      marginLeft: 20,
                      marginRight: 7
                    }}>
                      <View style={styles.workView}>
                        <Text
                          textAlign={'center'}
                          style={styles.work}>{item.StatusDescription.toUpperCase()}</Text>
                      </View>
                    </View>
                    <Text style={styles.time}>{item.LeadSourceName !== null && item.LeadSourceName}</Text>
                    <TouchableOpacity
                      onPress={() => this.onPressNext(item.CustomerID, item.VehicleID)}
                      style={{position: 'absolute', right: 3}}>
                      <Image style={styles.right} source={iconRight} />
                    </TouchableOpacity>
                  </View>
                </View>
              )} />
          </View>
        )
    }
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <Image
          style={styles.background}
          source={background} />
        <Image
          style={styles.navBarBackground}
          source={navBarBackground} />
        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={() => Actions.pop()}
          >
            <Image style={styles.iconNavBar} source={iconBack} />
          </TouchableOpacity>
          <View style={styles.viewTitle}>
            <Text style={styles.title}>
              Marketing
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => Actions.filterMarketingScreen()}
          >
            <Image style={styles.iconNavBar} source={iconFilter} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView behavior='position'>
            {this.renderBasic()}
            {this.renderBasic1()}
            {this.renderItem()}
          </KeyboardAvoidingView>
        </ScrollView>
        <LoadingSpinnerOverlay
          ref={(component) => { this._modalLoadingSpinnerOverLay = component }} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    leads: state.marketing.leads,
    appointments: state.marketing.appointments,
    replies: state.marketing.replies,
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleVehicle: bindActionCreators(InventoryActions.getSingleVehicle, dispatch),
    ...bindActionCreators(MarketingActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketingScreen)
