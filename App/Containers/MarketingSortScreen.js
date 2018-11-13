import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, TouchableOpacity, TextInput, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Picker } from 'react-native-picker-dropdown'
import { Dropdown } from 'react-native-material-dropdown'
import DateTimePicker from 'react-native-modal-datetime-picker'
import CustomNavBar from '../Components/CustomNavBar'
import Api from '../Services/Api'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MarketingSortScreenStyle'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment/moment'
import InventoryPickerActions from '../Redux/InventoryPickerRedux'
import { bindActionCreators } from 'redux'
import MarketingActions from '../Redux/MarketingRedux'
const background = require('../Images/AddDeal/background.png')
const make = [
  {'label': 'ACURA', 'value': 'ACURA'},
  {'label': 'ALFA', 'value': 'ALFA'},
  {'label': 'AM GENERAL', 'value': 'AMGENERAL'},
  {'label': 'ASTON MARTIN', 'value': 'ASTONMARTIN'},
  {'label': 'AUDI', 'value': 'AUDI'},
  {'label': 'BENTLEY', 'value': 'BENTLEY'},
  {'label': 'BMW', 'value': 'BMW'},
  {'label': 'BUICK', 'value': 'BUICK'}
]
const api = Api.create()
class MarketingSortScreen extends Component {
  constructor (props) {
    super(props)
    console.log('fasfsd', this.props.sortOrder)
    this.state = {
      dateRangeFrom: '',
      dateRangeTo: '',
      isDateTimePickerFromVisible: false,
      isDateTimePickerToVisible: false,
      text: '8238742838238723218821',
      year: '2011',
      stock: '123456711',
      make: '',
      model: '',
      type: '',
      makes: [{ItemID: '', Description: 'All'}].concat(this.props.make),
      models: [{ItemID: '', Description: 'All'}].concat(this.props.model),
      types: [{ItemID: '', Description: 'All'}].concat(this.props.type),
      status: '',
      leadStatus: [{ItemID: '', Description: 'All'}].concat(this.props.leadStatus),
      assigned: '',
      leadAssigned: [{ItemID: '', Description: 'All'}].concat(this.props.leadAssigned),
      sortBy: '',
      leadSort: [{ItemID: '', Description: ''}].concat(this.props.leadSort),
      sortOrder: 0,
      sortOrders: this.props.sortOrder
    }
  }
  _showDateTimePickerFrom= () => this.setState({isDateTimePickerFromVisible: true})

  _hideDateTimePickerFrom = () => this.setState({isDateTimePickerFromVisible: false})

  _handleDatePickedFrom = (date) => {
    __DEV__ && console.log('A date has been picked: ', date)
    this.setState({
      dateRangeFrom: Moment(date).format('YYYY-MM-DD')
    })
    this._hideDateTimePickerFrom()
  }
  _showDateTimePickerTo= () => this.setState({isDateTimePickerToVisible: true})

  _hideDateTimePickerTo = () => this.setState({isDateTimePickerToVisible: false})

  _handleDatePickedTo = (date) => {
    __DEV__ && console.log('A date has been picked: ', date)
    this.setState({
      dateRangeTo: Moment(date).format('YYYY-MM-DD')
    })
    this._hideDateTimePickerTo()
  }
  handleValueChange (make) {
    this.setState({ make })
  }
  async handleValueChangeMake (make) {
    __DEV__ && console.log('make', make)
    if (make !== '') {
      await this.props.getModel(make)
      this.setState({
        make,
        models: [{ItemID: '', Description: 'All'}].concat(this.props.model),
        model: ''
      })
    } else {
      this.setState({
        make,
        models: [{ItemID: '', Description: 'All'}],
        model: ''
      })
    }
  }
  handleValueChangeModel (model) {
    this.setState({
      model
    })
  }
  async getCrmLeads () {
    const { token } = this.props
    __DEV__ && console.log(token)
    api.setToken(token)
    const {make, dateRangeFrom, dateRangeTo, text, year} = this.state
    const crm = {
      'DateRangeFrom': dateRangeFrom === '' ? '2018-01-04' : dateRangeFrom,
      'DateRangeTo': dateRangeTo === '' ? '2018-07-04' : dateRangeTo,
      'VIN': text === '' ? '' : text,
      'MakeID': make === '' ? '' : make,
      'ModelYear': year === '' ? null : parseInt(year)
    }
    const response = await api.getListCRM(50, 0, crm)
    __DEV__ && console.log('crmLeads', response, response.data)
    if (response.ok) {
      this.props.getCmrLeads(response.data)
    }
  }
  render () {
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background} />
        <CustomNavBar
          title={'Filters'} />
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView behavior='position'>
            <Text style={{marginTop: 20, marginLeft: 15}}>VEHICLE</Text>
            <View style={[styles.viewItem]}>
              <Text style={[styles.text, {marginTop: 0}]}>STOCK NUMBER</Text>
              <TextInput underlineColorAndroid={'transparent'}
                value={this.state.stock}
                onChangeText={(stock) => this.setState({stock})}
                style={styles.textInput} />
              <Text style={styles.text}>VIN</Text>
              <TextInput underlineColorAndroid={'transparent'}
                value={this.state.text}
                onChangeText={(text) => this.setState({text})}
                style={styles.textInput} />
              <Text style={styles.text}>MODEL YEAR</Text>
              <TextInput underlineColorAndroid={'transparent'}
                value={this.state.year}
                onChangeText={(year) => this.setState({year})}
                style={styles.textInput} />
              <Text style={styles.text}>MAKE</Text>
              <Dropdown
                onChangeText={(make) => this.handleValueChangeMake(make)}
                data={this.state.makes}
                value={this.state.make}
                valueExtractor={({ ItemID }) => ItemID}
                labelExtractor={({ Description }) => Description}
              />
              <Text style={styles.text}>MODEL</Text>
              <Dropdown
                onChangeText={(model) => this.handleValueChangeModel(model)}
                data={this.state.models}
                value={this.state.model}
                valueExtractor={({ ItemID }) => ItemID}
                labelExtractor={({ Description }) => Description}
              />
              <Text style={styles.text}>LOCATION</Text>
              <Picker
                selectedValue={this.state.make}
                onValueChange={(make) => this.handleValueChange(make)}
                prompt='Choose your car'
                style={Platform.OS === 'ios' ? styles.picker : styles.pickerAndroid}
                textStyle={Platform.OS === 'ios' && styles.pickerText}
                cancel
              >
                {make.map((item, index) => (
                  <Picker.Item key={index} label={item.label} value={item.value} />
                ))}
              </Picker>
              <Text style={styles.text}>WEB PUBLISH</Text>
              <Picker
                selectedValue={this.state.make}
                onValueChange={(make) => this.handleValueChange(make)}
                prompt='Choose your car'
                style={Platform.OS === 'ios' ? styles.picker : styles.pickerAndroid}
                textStyle={Platform.OS === 'ios' && styles.pickerText}
                cancel
              >
                {make.map((item, index) => (
                  <Picker.Item key={index} label={item.label} value={item.value} />
                ))}
              </Picker>
            </View>
            <Text style={{marginTop: 20, marginLeft: 15}}>PURCHASE</Text>
            <View style={[styles.viewItem]}>
              <TouchableOpacity
                onPress={this._showDateTimePickerFrom}>
                <Text style={[styles.text, {marginTop: 0}]}>DATE RANGE FROM</Text>
                <TextInput
                  editable={false}
                  underlineColorAndroid={'transparent'}
                  value={this.state.dateRangeFrom}
                  style={styles.textInput} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this._showDateTimePickerTo}>
                <Text style={styles.text}>DATE RANGE TO</Text>
                <TextInput
                  editable={false}
                  underlineColorAndroid={'transparent'}
                  value={this.state.dateRangeTo}
                  style={styles.textInput} />
              </TouchableOpacity>
              <Text style={styles.text}>CUSTOMER</Text>
              <TextInput underlineColorAndroid={'transparent'}
                // value={this.state.text}
                // onChangeText={(text) => this.setState({text})}
                style={styles.textInput} />
              <Text style={styles.text}>PHONE</Text>
              <TextInput underlineColorAndroid={'transparent'}
                // value={this.state.text}
                // onChangeText={(text) => this.setState({text})}
                style={styles.textInput} />
              <Text style={styles.text}>EMAIL</Text>
              <TextInput underlineColorAndroid={'transparent'}
                // value={this.state.text}
                // onChangeText={(text) => this.setState({text})}
                style={styles.textInput} />
            </View>
            <Text style={{marginTop: 20, marginLeft: 15}}>SORT</Text>
            <View style={[styles.viewItem]}>
              <Text style={[styles.text, {marginTop: 0}]}>LEAD TYPE</Text>
              <Dropdown
                onChangeText={(type) => this.setState({type})}
                data={this.state.types}
                value={this.state.type}
                valueExtractor={({ ItemID }) => ItemID}
                labelExtractor={({ Description }) => Description}
              />
              <Text style={styles.text}>STATUS</Text>
              <Dropdown
                onChangeText={(status) => this.setState({status})}
                data={this.state.leadStatus}
                value={this.state.status}
                valueExtractor={({ ItemID }) => ItemID}
                labelExtractor={({ Description }) => Description}
              />
              <Text style={styles.text}>ASSIGNED TO</Text>
              <Dropdown
                onChangeText={(assigned) => this.setState({assigned})}
                data={this.state.leadAssigned}
                value={this.state.assigned}
                valueExtractor={({ ItemID }) => ItemID}
                labelExtractor={({ Description }) => Description}
              />
              <Text style={styles.text}>SORT BY</Text>
              <Dropdown
                onChangeText={(sortBy) => this.setState({sortBy})}
                data={this.state.leadSort}
                value={this.state.sortBy}
                valueExtractor={({ ItemID }) => ItemID}
                labelExtractor={({ Description }) => Description}
              />
              <Text style={styles.text}>SORT ORDER</Text>
              <Dropdown
                onChangeText={(sortOrder) => this.setState({sortOrder})}
                data={this.state.sortOrders}
                value={this.state.sortOrder}
                valueExtractor={({ ItemID }) => ItemID}
                labelExtractor={({ Description }) => Description}
              />
            </View>
            <View style={{height: 100}} />
            <DateTimePicker
              isVisible={this.state.isDateTimePickerFromVisible}
              onConfirm={this._handleDatePickedFrom}
              onCancel={this._hideDateTimePickerFrom} />
            <DateTimePicker
              isVisible={this.state.isDateTimePickerToVisible}
              onConfirm={this._handleDatePickedTo}
              onCancel={this._hideDateTimePickerTo} />
          </KeyboardAvoidingView>
        </ScrollView>
        <TouchableOpacity
          onPress={() => Actions.pop()}
          style={styles.buttonSave}>
          <Text style={styles.textButton}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    type: state.marketing.type,
    leadStatus: state.marketing.leadStatus,
    leadAssigned: state.marketing.leadAssigned,
    leadSort: state.marketing.leadSort,
    sortOrder: state.marketing.sortOrder,
    make: state.picker.make,
    model: state.picker.model,
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getModel: (id) => dispatch(InventoryPickerActions.getModel(id)),
    ...bindActionCreators(MarketingActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketingSortScreen)
