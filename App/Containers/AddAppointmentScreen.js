import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import CustomNavBar from '../Components/CustomNavBar'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { Dropdown } from 'react-native-material-dropdown'
import Api from '../Services/Api'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddAppointmentScreenStyle'
import Moment from 'moment/moment'
import { Actions } from 'react-native-router-flux'
const background = require('../Images/AddDeal/background.png')
const api = Api.create()

class AddAppointmentScreen extends Component {
  constructor (props) {
    super(props)
    const { item, lead } = this.props
    if (item !== undefined) {
      this.state = {
        isDatePickerVisible: false,
        isTimePickerVisible: false,
        date: Moment().format('DD/MM/YYYY'),
        time: Moment().format('LT'),
        item: item.merge({DateAdded: item.TaskDate}),
        leadAssigned: this.props.leadAssigned
      }
    } else {
      const data = {
        'TaskID': Math.floor((Math.random() * 900000) + 1),
        'CustomerID': lead.CustomerID,
        'TaskDate': Moment().format('YYYY-MM-DDTHH:mm:ss.SS'),
        'TaskDateText': Moment().format('MM/DD/YYYY hh:mm A'),
        'TaskDateLongText': Moment().format('llll'),
        'DateAdded': Moment().format('YYYY-MM-DDTHH:mm:ss.SS'),
        'Memo': null,
        'UserID': 844197,
        'TaskName': '',
        'Description': '',
        'TaskStatusID': 0,
        'TaskPriorityTypeID': 0,
        'TaskCategoryID': 7,
        'BusinessName': lead.CustomerName,
        'InteractionName': null,
        'CustomerName': 'DC  Test',
        'ToDateTime': null,
        'ToDateTimeText': Moment().format('MM/DD/YYYY hh:mm A'),
        'ToDateTimeTextTime': '',
        'Location': null,
        'AttendeeID': '',
        'AttendeeName': '',
        'TaskCategoryName': 'Appointment'
      }
      this.state = {
        isDatePickerVisible: false,
        isTimePickerVisible: false,
        date: Moment().format('DD/MM/YYYY'),
        time: Moment().format('LT'),
        item: data,
        leadAssigned: this.props.leadAssigned
      }
    }
  }
  _showDatePicker = () => this.setState({isDatePickerVisible: true})

  _hideDatePicker = () => this.setState({isDatePickerVisible: false})

  _handleDatePicked = (date) => {
    __DEV__ && console.log('A date has been picked: ', date)
    this.setState({
      date: Moment(date).format('DD/MM/YYYY')
    })
    this._hideDatePicker()
  }
  _showTimePicker = () => this.setState({isTimePickerVisible: true})

  _hideTimePicker = () => this.setState({isTimePickerVisible: false})

  _handleTimePicked = (date) => {
    __DEV__ && console.log('A date has been picked: ', date)
    this.setState({
      time: Moment(date).format('LT')
    })
    this._hideTimePicker()
  }
  async onSave () {
    const { token } = this.props
    const { item } = this.state
    api.setToken(token)
    const response = await api.saveUserTask(item)
    __DEV__ && console.log('save', response)
    if (response.ok) {
      Actions.pop()
    }
  }
  render () {
    const { item } = this.state
    __DEV__ && console.log(item)
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background} />
        <CustomNavBar
          title={'APPOINTMENT'} />
        <KeyboardAwareScrollView style={styles.container}>
          <View style={{marginHorizontal: 10, marginBottom: 10}}>
            <Text style={styles.text}>TITLE</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={item.TaskName}
              onChangeText={(TaskName) => this.setState({item: {...item, ...{TaskName}}})}
              style={styles.textInput} />
            <Text style={styles.text}>DUE DATE</Text>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={this._showDatePicker}>
              <TextInput
                editable={false}
                underlineColorAndroid={'transparent'}
                value={this.state.date}
                style={styles.textInputDate} />
              <Icon name={'calendar-text'} size={30} color={'#000000'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row', marginTop: 20}}
              onPress={this._showTimePicker}>
              <TextInput
                editable={false}
                underlineColorAndroid={'transparent'}
                value={this.state.time}
                style={styles.textInputDate} />
              <Icon name={'clock'} size={30} color={'#000000'} />
            </TouchableOpacity>
            <Text style={styles.text}>ATTENDEE</Text>
            <Dropdown
              onChangeText={(ItemID, Description, Data) => {
                __DEV__ && console.log(ItemID, Description, Data[Description].Description)
                this.setState({item: {...item, ...{AttendeeName: Data[Description].Description, AttendeeID: ItemID}}})
              }}
              data={this.state.leadAssigned}
              value={item.AttendeeID}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>OUTCOME</Text>
            <Dropdown
              onChangeText={(model) => this.setState({model})}
              // data={this.state.models}
              // value={this.state.model}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>WHERE</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={item.Location}
              onChangeText={(Location) => this.setState({item: {...item, ...{Location}}})}
              style={styles.textInput} />
            <Text style={styles.text}>DESCRIPTION</Text>
            <TextInput
              multiline
              value={item.Description}
              onChangeText={(Description) => this.setState({item: {...item, ...{Description}}})}
            />
          </View>
          <View style={{height: 100}} />
        </KeyboardAwareScrollView>
        <TouchableOpacity
          onPress={() => this.onSave()}
          style={styles.buttonSave}>
          <Text style={styles.textButton}>SAVE</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDatePicker} />
        <DateTimePicker
          mode={'time'}
          is24Hour={false}
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this._handleTimePicked}
          onCancel={this._hideTimePicker} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    leadAssigned: state.marketing.leadAssigned,
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAppointmentScreen)
