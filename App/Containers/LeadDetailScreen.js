import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, TouchableOpacity, FlatList, Modal, YellowBox, Alert, Linking } from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { Dropdown } from 'react-native-material-dropdown'
import Api from '../Services/Api'
import LoadingSpinnerOverlay from '@react-native-component/react-native-smart-loading-spinner-overlay/LoadingSpinnerOverlay'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LeadDetailScreenStyle'
import { Actions } from 'react-native-router-flux'
import { Fonts, Metrics } from '../Themes'
import Moment from 'moment/moment'
import InventoryPickerActions from '../Redux/InventoryPickerRedux'
import InventoryActions from '../Redux/InventoryRedux'
import { bindActionCreators } from 'redux'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])
const defaultImage = require('../Images/AddDeal/default_choose_image.png')
const background = require('../Images/AddDeal/background.png')
const iconBack = require('../Images/AddDeal/ic_back.png')
const api = Api.create()
class LeadDetailScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalVisible: false,
      timeLines: this.props.timeLines,
      lead: this.props.lead,
      leadAssigned: this.props.leadAssigned,
      assigned: this.props.leadDTO.AssignedToID !== null ? this.props.leadDTO.AssignedToID : '',
      leadDTO: this.props.leadDTO,
      tasks: [],
      note: [],
      appointment: [],
      sms: [],
      temperature: this.props.leadDTO.TemperatureID !== null ? this.props.leadDTO.TemperatureID : '',
      source: this.props.leadDTO.LeadSourceID !== null ? this.props.leadDTO.LeadSourceID : '',
      vehicle: this.props.vehicle,
      temperatures: [{Description: 'None', ItemID: ''}].concat(this.props.temperature),
      leadSource: [{Description: 'None', ItemID: ''}].concat(this.props.source),
      leadStatuss: this.props.leadStatuss,
      statusID: this.props.leadDTO.StatusID
    }
  }
  componentDidMount () {
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('Initial url is: ' + url)
      }
    }).catch(err => console.error('An error occurred', err))
  }

  componentWillMount () {
    const { timeLines } = this.state
    let tasks = []
    let note = []
    let appointment = []
    let sms = []
    console.log('a')
    for (let i = 0; i < timeLines.length; i++) {
      console.log('b')
      if (timeLines[i].TaskCategoryID !== 12) {
        tasks.push(timeLines[i])
        if (timeLines[i].TaskCategoryID === 7) {
          appointment.push(timeLines[i])
        }
        if (timeLines[i].TaskCategoryID === 5) {
          sms.push(timeLines[i])
        }
      } else {
        note.push(timeLines[i])
      }
    }
    this.setState({
      tasks,
      note,
      appointment,
      sms
    })
  }
  onEdit (item) {
    const { lead, leadDTO } = this.state
    if (item.TaskCategoryID === 12) {
      Actions.addNoteScreen({item, lead})
    }
    if (item.TaskCategoryID < 11 && item.TaskCategoryID !== 7) {
      Actions.addReminderScreen({item})
    }
    if (item.TaskCategoryID === 13) {
      Actions.seeEmailScreen({item, leadDTO})
    }
    if (item.TaskCategoryID === 7) {
      Actions.addAppointmentScreen({item})
    }
  }
  async onSave () {
    api.setToken(this.props.token)
    const { leadDTO, statusID, assigned, temperature, source, leadStatuss, leadAssigned, leadSource, temperatures } = this.state
    const response = await api.updateLeadStatus(leadDTO.BusinessID, statusID, assigned, source, temperature)
    __DEV__ && console.log('SAVE', response)
    if (response.ok) {
      if (leadDTO.StatusID !== statusID) {
        const task = {
          'TaskID': Math.floor((Math.random() * 100000) + 800000),
          'CustomerID': leadDTO.BusinessID,
          'TaskDate': Moment().format('YYYY-MM-DDTHH:mm:ss.SS'),
          'TaskDateText': Moment().format('MM/DD/YYYY hh:mm A'),
          'TaskDateLongText': Moment().format('llll'),
          'DateAdded': Moment().format('YYYY-MM-DDTHH:mm:ss.SS'),
          'Memo': null,
          'UserID': 844197,
          'TaskName': 'Status updated to ' + this.searchValue(leadStatuss, statusID),
          'Description': 'Status updated to ' + this.searchValue(leadStatuss, statusID),
          'TaskStatusID': 0,
          'TaskPriorityTypeID': 0,
          'TaskCategoryID': 12,
          'BusinessName': leadDTO.BusinessName,
          'InteractionName': null,
          'CustomerName': 'DC  Test',
          'ToDateTime': null,
          'ToDateTimeText': Moment().format('MM/DD/YYYY hh:mm A'),
          'ToDateTimeTextTime': '',
          'Location': null,
          'AttendeeID': null,
          'AttendeeName': null,
          'TaskCategoryName': 'Note'
        }
        const response = await api.saveUserTask(task)
        __DEV__ && console.log(response)
      }
      if (leadDTO.AssignedToID !== assigned && assigned !== '') {
        const task = {
          'TaskID': Math.floor((Math.random() * 100000) + 800000),
          'CustomerID': leadDTO.BusinessID,
          'TaskDate': Moment().format('YYYY-MM-DDTHH:mm:ss.SS'),
          'TaskDateText': Moment().format('MM/DD/YYYY hh:mm A'),
          'TaskDateLongText': Moment().format('llll'),
          'DateAdded': Moment().format('YYYY-MM-DDTHH:mm:ss.SS'),
          'Memo': null,
          'UserID': 844197,
          'TaskName': 'Assigned updated to ' + this.searchValue(leadAssigned, assigned),
          'Description': 'Assigned updated to ' + this.searchValue(leadAssigned, assigned),
          'TaskStatusID': 0,
          'TaskPriorityTypeID': 0,
          'TaskCategoryID': 12,
          'BusinessName': leadDTO.BusinessName,
          'InteractionName': null,
          'CustomerName': 'DC  Test',
          'ToDateTime': null,
          'ToDateTimeText': Moment().format('MM/DD/YYYY hh:mm A'),
          'ToDateTimeTextTime': '',
          'Location': null,
          'AttendeeID': null,
          'AttendeeName': null,
          'TaskCategoryName': 'Note'
        }
        const response = await api.saveUserTask(task)
        __DEV__ && console.log(response)
      }
      if (leadDTO.LeadSourceID !== source && source !== '') {
        const task = {
          'TaskID': Math.floor((Math.random() * 100000) + 800000),
          'CustomerID': leadDTO.BusinessID,
          'TaskDate': Moment().format('YYYY-MM-DDTHH:mm:ss.SS'),
          'TaskDateText': Moment().format('MM/DD/YYYY hh:mm A'),
          'TaskDateLongText': Moment().format('llll'),
          'DateAdded': Moment().format('YYYY-MM-DDTHH:mm:ss.SS'),
          'Memo': null,
          'UserID': 844197,
          'TaskName': 'Source updated to ' + this.searchValue(leadSource, source),
          'Description': 'Source updated to ' + this.searchValue(leadSource, source),
          'TaskStatusID': 0,
          'TaskPriorityTypeID': 0,
          'TaskCategoryID': 12,
          'BusinessName': leadDTO.BusinessName,
          'InteractionName': null,
          'CustomerName': 'DC  Test',
          'ToDateTime': null,
          'ToDateTimeText': Moment().format('MM/DD/YYYY hh:mm A'),
          'ToDateTimeTextTime': '',
          'Location': null,
          'AttendeeID': null,
          'AttendeeName': null,
          'TaskCategoryName': 'Note'
        }
        const response = await api.saveUserTask(task)
        __DEV__ && console.log(response)
      }
      if (leadDTO.TemperatureID !== temperature && temperature !== '') {
        const task = {
          'TaskID': Math.floor((Math.random() * 100000) + 800000),
          'CustomerID': leadDTO.BusinessID,
          'TaskDate': Moment().format('YYYY-MM-DDTHH:mm:ss.SS'),
          'TaskDateText': Moment().format('MM/DD/YYYY hh:mm A'),
          'TaskDateLongText': Moment().format('llll'),
          'DateAdded': Moment().format('YYYY-MM-DDTHH:mm:ss.SS'),
          'Memo': null,
          'UserID': 844197,
          'TaskName': 'Temperature updated to ' + this.searchValue(temperatures, temperature),
          'Description': 'Temperature updated to ' + this.searchValue(temperatures, temperature),
          'TaskStatusID': 0,
          'TaskPriorityTypeID': 0,
          'TaskCategoryID': 12,
          'BusinessName': leadDTO.BusinessName,
          'InteractionName': null,
          'CustomerName': 'DC  Test',
          'ToDateTime': null,
          'ToDateTimeText': Moment().format('MM/DD/YYYY hh:mm A'),
          'ToDateTimeTextTime': '',
          'Location': null,
          'AttendeeID': null,
          'AttendeeName': null,
          'TaskCategoryName': 'Note'
        }
        const response = await api.saveUserTask(task)
        __DEV__ && console.log(response)
      }
    }
    Actions.pop()
  }
  searchValue (array, id) {
    if (id === null) {
      return ''
    } else {
      let obj = array.find(o => o.ItemID === id)
      return obj.Description
    }
  }
  async delete (taskID, userID) {
    const { token } = this.props
    api.setToken(token)
    const response = await api.deleteUserTask(taskID, userID)
    __DEV__ && console.log('delete', response)
  }
  onDelete (item) {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => { this.delete(item.TaskID, item.UserID) }}
      ],
      { cancelable: false }
    )
  }
  async onPress () {
    this._modalLoadingSpinnerOverLay.show()
    const { leadDTO } = this.state
    await this.props.getImage(leadDTO.VehicleID)
    await this.props.choice(1)
    await this._modalLoadingSpinnerOverLay.hide()
    Actions.addVehicleManual()
  }
  setModalVisible (visible) { this.setState({modalVisible: visible}) }
  render () {
    const { lead, leadDTO, vehicle } = this.state
    console.log('vehicle', vehicle)
    return (
      <View style={styles.allView}>
        <Modal
          animationType='fade'
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}>
          <View style={{flex: 1, backgroundColor: 'transparent'}}>
            <TouchableOpacity
              onPress={() => this.setModalVisible(false)}
              style={{flex: 1}} />
            <View style={{position: 'absolute', top: 0, right: 10, backgroundColor: '#ffffff'}}>
              <View style={{marginTop: 18, marginBottom: 18, marginLeft: 10, marginRight: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({modalVisible: false})
                    Actions.tradeInScreen()
                  }}
                  style={{marginBottom: 18}}>
                  <Text style={{
                    fontSize: 18
                  }}>
                    Trade In
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({modalVisible: false})
                    Actions.creditApplicationScreen()
                  }}
                  style={{marginBottom: 18}}>
                  <Text style={{
                    fontSize: 18
                  }}>
                    Credit Application
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({modalVisible: false})
                    this.onSave()
                  }}
                >
                  <Text style={{
                    fontSize: 18
                  }}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.nav}>
          <View style={styles.navBar}>
            <TouchableOpacity
              onPress={() => Actions.pop()}
            >
              <Image style={styles.iconNavBar} source={iconBack} />
            </TouchableOpacity>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: Metrics.screenWidth - 100
            }}>
              <View
                style={{
                  backgroundColor: '#ff5c5c',
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 20}}>{lead.CustomerName[0].toUpperCase()}</Text>
              </View>
              <TouchableOpacity
                // onPress={() => this.onPress()}
              >
                <Text style={{color: '#5867dd', fontWeight: 'bold'}}>{lead.CustomerName}</Text>
              </TouchableOpacity>
              {/* <Text style={{color: '#000000'}}>Sales Manager, Widgetz.io</Text> */}
            </View>
            <TouchableOpacity
              onPress={() => this.setModalVisible(true)}
            >
              <Icon name={'dots-vertical'} size={30} color={'#ffffff'} />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => Linking.openURL(`mailto:${leadDTO.EmailAddress}?subject=${leadDTO.ModelYear} ${leadDTO.Make} ${leadDTO.Model} [#${leadDTO.BusinessID}]&body=`)}
              style={[styles.itemButton, {backgroundColor: '#449ffc'}]}
            >
              <Icon name={'email'} size={30} color={'#ffffff'} />
              <Text style={styles.textItemButton}>Mail</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.addSmsScreen({lead})}
              style={[styles.itemButton, {backgroundColor: '#43516c'}]}
            >
              <Icon name={'comment-text-outline'} size={30} color={'#ffffff'} />
              <Text style={styles.textItemButton}>SMS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.addAppointmentScreen({lead})}
              style={[styles.itemButton, {backgroundColor: '#57ad20'}]}
            >
              <Icon name={'account-multiple'} size={30} color={'#ffffff'} />
              <Text style={styles.textItemButton}>Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.addReminderScreen({lead})}
              style={[styles.itemButton, {backgroundColor: '#17c4bb'}]}
            >
              <Icon name={'clock'} size={30} color={'#ffffff'} />
              <Text style={styles.textItemButton}>Reminder</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.addNoteScreen({lead})}
              style={[styles.itemButton, {backgroundColor: '#5583dc'}]}
            >
              <Icon name={'note'} size={30} color={'#ffffff'} />
              <Text style={styles.textItemButton}>Note</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.addDealCrmScreen({lead})}
              style={[styles.itemButton, {backgroundColor: '#393939'}]}
            >
              <Icon name={'car'} size={30} color={'#ffffff'} />
              <Text style={styles.textItemButton}>Deal</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollableTabView
          renderTabBar={() =>
            <ScrollableTabBar
              backgroundColor={'white'}
              activeTextColor={'#000000'}
              inactiveTextColor={'#adadad'}
              textStyle={{fontWeight: 'normal',
                fontFamily: Fonts.type.medium,
                fontSize: Fonts.size.medium}}
              underlineStyle={{backgroundColor: '#225bc4'}}
              tabStyle={{paddingBottom: 0}}
              />
            }>
          <ScrollView
            tabLabel='BASIC INFO'>
            <View
              style={[styles.viewItem, {marginTop: 20}]}>
              <View style={{paddingHorizontal: 15}}>
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {/* <Text style={{fontSize: 18, color: '#5c6bdd'}}>{lead.CustomerName}</Text> */}
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon name={'phone'} size={30} color={'#000000'} />
                  <Text>{leadDTO.Phone}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon name={'email'} size={30} color={'#000000'} />
                  <Text>{leadDTO.EmailAddress}</Text>
                </View>
                <Dropdown
                  onChangeText={(statusID) => this.setState({statusID})}
                  data={this.state.leadStatuss}
                  value={this.state.statusID}
                  valueExtractor={({ ItemID }) => ItemID}
                  labelExtractor={({ Description }) => Description}
                />
                <Text>{Moment(lead.LeadDate).format('llll')}</Text>
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 10
                }}>
                  <View
                    style={{
                      backgroundColor: leadDTO.LeadScore < 0 ? '#ff5c5c' : '#a5a5a5',
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 20}}>{leadDTO.LeadScore}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.onPress()}
                  >
                    <Text style={{color: '#5867dd', fontWeight: 'bold'}}>{leadDTO.ModelYear} {leadDTO.Make} {leadDTO.Model}</Text>
                  </TouchableOpacity>
                  <Text style={{color: '#000000'}}>{leadDTO.CoBuyerBusinessName}</Text>
                </View>
                {leadDTO.CoBuyerPhone !== null && <View style={{flexDirection: 'row'}}>
                  <Icon name={'phone'} size={30} color={'#000000'} />
                  <Text>{leadDTO.CoBuyerPhone}</Text>
                </View>}
                {leadDTO.CoBuyerEmailAddress !== null && <View style={{flexDirection: 'row'}}>
                  <Icon name={'email'} size={30} color={'#000000'} />
                  <Text>{leadDTO.CoBuyerEmailAddress}</Text>
                </View>}
                <Text style={styles.text}>ASSIGNED TO</Text>
                <Dropdown
                  onChangeText={(assigned) => this.setState({assigned})}
                  data={this.state.leadAssigned}
                  value={this.state.assigned}
                  valueExtractor={({ ItemID }) => ItemID}
                  labelExtractor={({ Description }) => Description}
                />
                <Text style={styles.text}>SOURCE</Text>
                <Dropdown
                  onChangeText={(source) => this.setState({source})}
                  data={this.state.leadSource}
                  value={this.state.source}
                  valueExtractor={({ ItemID }) => ItemID}
                  labelExtractor={({ Description }) => Description}
                />
                <Text style={styles.text}>TEMPERATURE</Text>
                <Dropdown
                  onChangeText={(temperature) => this.setState({temperature})}
                  data={this.state.temperatures}
                  value={this.state.temperature}
                  valueExtractor={({ ItemID }) => ItemID}
                  labelExtractor={({ Description }) => Description}
                />
                <Text style={styles.text}>TYPE</Text>
                <Text style={styles.textInput}>{lead.LeadTypeName}</Text>
                <Text style={styles.text}>LAST VIEW</Text>
                <Text style={styles.textInput}>{leadDTO.LastLookedByName}</Text>
              </View>
            </View>
          </ScrollView>
          <View
            style={[styles.viewItem, {paddingHorizontal: 15}]}
            tabLabel='TIMELINE'>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.timeLines}
              renderItem={({item}) => (
                <View style={{flexDirection: 'row', borderWidth: 1, padding: 2, marginVertical: 5, paddingRight: 52}}>
                  <View>
                    <Text>{item.TaskName}</Text>
                    <Text style={{fontSize: 12, color: '#000000'}}>{item.Description}</Text>
                    <View style={{
                      marginVertical: 5,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <View style={{
                        backgroundColor: '#eaeaea',
                        padding: 5
                      }}>
                        <Text style={styles.work}>{item.TaskCategoryName.toUpperCase()}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon name={'calendar'} size={30} color={'#47c5d4'} />
                      <Text>{item.TaskDateLongText}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon name={'account-circle'} size={30} color={'#47c5d4'} />
                      <Text>{item.BusinessName}</Text>
                    </View>
                  </View>
                  <View style={{position: 'absolute', right: 2, top: 2}}>
                    {item.TaskCategoryID < 14 && <TouchableOpacity
                      onPress={() => this.onEdit(item)}
                      style={{flex: 1, backgroundColor: '#36a3f7', padding: 10, borderRadius: 5}}>
                      <Icon name={'pencil'} size={30} color={'#ffffff'} />
                    </TouchableOpacity>}
                    {item.TaskCategoryID < 13 && <TouchableOpacity
                      onPress={() => this.onDelete(item)}
                      style={{flex: 1, backgroundColor: '#f4516c', padding: 10, borderRadius: 5}}>
                      <Icon name={'delete'} size={30} color={'#ffffff'} />
                    </TouchableOpacity>}
                  </View>
                </View>
              )} />
          </View>
          <View
            style={[styles.viewItem, {paddingHorizontal: 15}]}
            tabLabel='TASKS'>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.tasks}
              renderItem={({item}) => (
                <View style={{flexDirection: 'row', borderWidth: 1, padding: 2, marginVertical: 5, paddingRight: 52}}>
                  <View>
                    <Text>{item.TaskName}</Text>
                    <Text style={{fontSize: 12, color: '#000000'}}>{item.Description}</Text>
                    <View style={{
                      marginVertical: 5,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <View style={{
                        backgroundColor: '#eaeaea',
                        padding: 5
                      }}>
                        <Text style={styles.work}>{item.TaskCategoryName.toUpperCase()}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon name={'calendar'} size={30} color={'#47c5d4'} />
                      <Text>{item.TaskDateLongText}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon name={'account-circle'} size={30} color={'#47c5d4'} />
                      <Text>{item.BusinessName}</Text>
                    </View>
                  </View>
                  <View style={{position: 'absolute', right: 2, top: 2}}>
                    {item.TaskCategoryID < 14 && <TouchableOpacity
                      onPress={() => this.onEdit(item)}
                      style={{flex: 1, backgroundColor: '#36a3f7', padding: 10, borderRadius: 5}}>
                      <Icon name={'pencil'} size={30} color={'#ffffff'} />
                    </TouchableOpacity>}
                    {item.TaskCategoryID < 13 && <TouchableOpacity
                      onPress={() => this.onDelete(item)}
                      style={{flex: 1, backgroundColor: '#f4516c', padding: 10, borderRadius: 5}}>
                      <Icon name={'delete'} size={30} color={'#ffffff'} />
                    </TouchableOpacity>}
                  </View>
                </View>
            )} />
          </View>
          <View
            style={[styles.viewItem, {paddingHorizontal: 15}]}
            tabLabel='NOTES'>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.note}
              renderItem={({item}) => (
                <View style={{flexDirection: 'row', borderWidth: 1, padding: 2, marginVertical: 5, paddingRight: 52}}>
                  <View>
                    <Text>{item.TaskName}</Text>
                    <Text style={{fontSize: 12, color: '#000000'}}>{item.Description}</Text>
                    <View style={{
                      marginVertical: 5,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <View style={{
                        backgroundColor: '#eaeaea',
                        padding: 5
                      }}>
                        <Text style={styles.work}>{item.TaskCategoryName.toUpperCase()}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon name={'calendar'} size={30} color={'#47c5d4'} />
                      <Text>{item.TaskDateLongText}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon name={'account-circle'} size={30} color={'#47c5d4'} />
                      <Text>{item.BusinessName}</Text>
                    </View>
                  </View>
                  <View style={{position: 'absolute', right: 2, top: 2}}>
                    {item.TaskCategoryID < 14 && <TouchableOpacity
                      onPress={() => this.onEdit(item)}
                      style={{flex: 1, backgroundColor: '#36a3f7', padding: 10, borderRadius: 5}}>
                      <Icon name={'pencil'} size={30} color={'#ffffff'} />
                    </TouchableOpacity>}
                    {item.TaskCategoryID < 13 && <TouchableOpacity
                      onPress={() => this.onDelete(item)}
                      style={{flex: 1, backgroundColor: '#f4516c', padding: 10, borderRadius: 5}}>
                      <Icon name={'delete'} size={30} color={'#ffffff'} />
                    </TouchableOpacity>}
                  </View>
                </View>
            )} />
          </View>
          <View
            style={[styles.viewItem, {paddingHorizontal: 15}]}
            tabLabel='APPOINTMENTS'>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.appointment}
              renderItem={({item}) => (
                <View style={{flexDirection: 'row', borderWidth: 1, padding: 2, marginVertical: 5, paddingRight: 52}}>
                  <View>
                    <Text>{item.TaskName}</Text>
                    <Text style={{fontSize: 12, color: '#000000'}}>{item.Description}</Text>
                    <View style={{
                      marginVertical: 5,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <View style={{
                        backgroundColor: '#eaeaea',
                        padding: 5
                      }}>
                        <Text style={styles.work}>{item.TaskCategoryName.toUpperCase()}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon name={'calendar'} size={30} color={'#47c5d4'} />
                      <Text>{item.TaskDateLongText}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon name={'account-circle'} size={30} color={'#47c5d4'} />
                      <Text>{item.BusinessName}</Text>
                    </View>
                  </View>
                  <View style={{position: 'absolute', right: 2, top: 2}}>
                    {item.TaskCategoryID < 14 && <TouchableOpacity
                      onPress={() => this.onEdit(item)}
                      style={{flex: 1, backgroundColor: '#36a3f7', padding: 10, borderRadius: 5}}>
                      <Icon name={'pencil'} size={30} color={'#ffffff'} />
                    </TouchableOpacity>}
                    {item.TaskCategoryID < 13 && <TouchableOpacity
                      onPress={() => this.onDelete(item)}
                      style={{flex: 1, backgroundColor: '#f4516c', padding: 10, borderRadius: 5}}>
                      <Icon name={'delete'} size={30} color={'#ffffff'} />
                    </TouchableOpacity>}
                  </View>
                </View>
              )} />

          </View>
          <View
            style={[styles.viewItem, {paddingHorizontal: 15}]}
            tabLabel='SMS'>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.sms}
              renderItem={({item}) => (
                <View style={{flexDirection: 'row', borderWidth: 1, padding: 2, marginVertical: 5, paddingRight: 52}}>
                  <View>
                    <Text>{item.TaskName}</Text>
                    <Text style={{fontSize: 12, color: '#000000'}}>{item.Description}</Text>
                    <View style={{
                      marginVertical: 5,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <View style={{
                        backgroundColor: '#eaeaea',
                        padding: 5
                      }}>
                        <Text style={styles.work}>{item.TaskCategoryName.toUpperCase()}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon name={'calendar'} size={30} color={'#47c5d4'} />
                      <Text>{item.TaskDateLongText}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon name={'account-circle'} size={30} color={'#47c5d4'} />
                      <Text>{item.BusinessName}</Text>
                    </View>
                  </View>
                  <View style={{position: 'absolute', right: 2, top: 2}}>
                    {item.TaskCategoryID < 14 && <TouchableOpacity
                      onPress={() => this.onEdit(item)}
                      style={{flex: 1, backgroundColor: '#36a3f7', padding: 10, borderRadius: 5}}>
                      <Icon name={'pencil'} size={30} color={'#ffffff'} />
                    </TouchableOpacity>}
                    {item.TaskCategoryID < 13 && <TouchableOpacity
                      onPress={() => this.onDelete(item)}
                      style={{flex: 1, backgroundColor: '#f4516c', padding: 10, borderRadius: 5}}>
                      <Icon name={'delete'} size={30} color={'#ffffff'} />
                    </TouchableOpacity>}
                  </View>
                </View>
            )} />
          </View>
          <ScrollView tabLabel='VEHICLE'>
            {lead.VehicleID !== 0 ? <View style={[styles.viewItem, {paddingHorizontal: 15}]}>
              <TouchableOpacity
                onPress={() => this.onPress()}
             >
                <Text style={{color: '#5867dd', fontWeight: 'bold'}}>{leadDTO.ModelYear} {leadDTO.Make} {leadDTO.Model}</Text>
              </TouchableOpacity>
              <Image style={styles.defaultImage} source={defaultImage} />
              <Text>Stock#: {vehicle._Vehicle.StockNumber} </Text>
              <Text>VIN: {vehicle._Vehicle.VIN}</Text>
              <Text>Mileage: {vehicle.information.Mileage}</Text>
              <Text>Type: {this.searchValue(this.props.bodyStyle, vehicle._Vehicle.BodyStyleID)}</Text>
              <Text>Color: {vehicle.information.ExteriorColorDescription}</Text>
              <Text>Drive Train: {}</Text>
              <Text>Engine: {this.searchValue(this.props.engine, vehicle._Vehicle.EngineID)}</Text>
              <Text>Fuel Type: {this.searchValue(this.props.fuelType, vehicle._Vehicle.FuelTypeID)}</Text>
              <Text>State</Text>
            </View> : <View />
             }
          </ScrollView>
          <Text tabLabel='DEALS'>project</Text>
        </ScrollableTabView>
        <LoadingSpinnerOverlay
          ref={(component) => { this._modalLoadingSpinnerOverLay = component }} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lead: state.marketing.lead,
    timeLines: state.marketing.timeLines,
    leadAssigned: state.marketing.leadAssigned,
    tasks: state.marketing.tasks,
    leadDTO: state.marketing.leadDTO,
    make: state.inventory.make,
    temperature: state.marketing.temperature,
    vehicle: state.inventory.vehicle,
    source: state.marketing.source,
    token: state.auth.token,
    engine: state.picker.engine,
    bodyStyle: state.picker.bodyStyle,
    fuelType: state.picker.fuelType,
    leadStatuss: state.marketing.leadStatuss
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleVehicle: bindActionCreators(InventoryActions.getSingleVehicle, dispatch),
    getImage: bindActionCreators(InventoryActions.getImage, dispatch),
    getModel: bindActionCreators(InventoryPickerActions.getModel, dispatch),
    getTrim: bindActionCreators(InventoryPickerActions.getTrim, dispatch),
    choice: (id) => dispatch(InventoryActions.choice(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadDetailScreen)
