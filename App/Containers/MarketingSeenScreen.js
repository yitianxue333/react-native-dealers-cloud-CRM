import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList, Alert } from 'react-native'
import { connect } from 'react-redux'
import CustomNavBar from '../Components/CustomNavBar'
import { Dropdown } from 'react-native-material-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RadioButtons } from 'react-native-radio-buttons'
import Moment from 'moment'
import LoadingSpinnerOverlay from '@react-native-component/react-native-smart-loading-spinner-overlay/LoadingSpinnerOverlay'
import { Actions } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MarketingSeenScreenStyle'
import { Fonts } from '../Themes'
import InventoryActions from '../Redux/InventoryRedux'
import InventoryPickerActions from '../Redux/InventoryPickerRedux'
import { bindActionCreators } from 'redux'
const background = require('../Images/AddDeal/background.png')
const defaultImage = require('../Images/AddDeal/default_choose_image.png')

class MarketingSeenScreen extends Component {
  constructor (props) {
    super(props)
    __DEV__ && console.log('aaa', this.props.lead, this.props.timeLines)
    this.state = {
      selectedOption: 'TIMELINE',
      options: [
        'TIMELINE',
        'TASKS',
        'NOTES',
        'APPOINTMENTS',
        'SMS',
        'VEHICLE',
        'DEALS'
      ],
      timeLines: this.props.timeLines,
      lead: this.props.lead,
      leadAssigned: this.props.leadAssigned,
      assigned: this.props.leadDTO.AssignedToID,
      leadDTO: this.props.leadDTO,
      task: [],
      note: [],
      appointment: [],
      sms: [],
      temperature: '',
      vehicle: {},
      temperatures: [{Description: 'None', ItemID: ''}].concat(this.props.temperature)
    }
  }
  componentWillMount () {
    const { timeLines } = this.state
    let tasks = []
    let note = []
    let appointment = []
    let sms = []
    for (let i = 0; i < timeLines.length; i++) {
      if (timeLines[i].InteractionName !== null) {
        tasks.push(timeLines[i])
        if (timeLines[i].InteractionName === 'Appointment') {
          appointment.push(timeLines[i])
        }
        if (timeLines[i].InteractionName === 'SMS Inbound') {
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
  componentDidMount () {
    console.log(this.props.vehicle)
    if (this.state.leadDTO.VehicleID !== 0) {
      this.setState({
        vehicle: this.props.vehicle
      })
    }
  }
  async onPress () {
    this._modalLoadingSpinnerOverLay.show()
    const { leadDTO } = this.state
    await this.props.getImage(leadDTO.VehicleID)
    await this.props.choice(1)
    await this._modalLoadingSpinnerOverLay.hide()
    Actions.addVehicleManual()
  }
  renderBasic () {
    function setSelectedOption (selectedOption) {
      this.setState({
        selectedOption
      })
    }

    function renderOption (option, selected, onSelect, index) {
      const borderWidth = selected ? 4 : 0
      const style = selected ? {marginBottom: 6,
        color: '#000000',
        fontFamily: Fonts.type.medium,
        fontSize: 10}
        : {marginBottom: 10,
          color: '#adadad',
          fontFamily: Fonts.type.medium,
          fontSize: 10}
      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 3,
            borderBottomWidth: borderWidth,
            borderBottomColor: '#225bc4'}}>
            <Text style={style}>{option}</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }

    function renderContainer (optionNodes) {
      return <View style={{flexDirection: 'row'}}>{optionNodes}</View>
    }

    return (
      <View style={{paddingTop: 10,
        backgroundColor: 'white',
        marginBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#4c4c4c'}}>
        <RadioButtons
          options={this.state.options}
          onSelection={setSelectedOption.bind(this)}
          selectedOption={this.state.selectedOption}
          renderOption={renderOption}
          renderContainer={renderContainer}
        />
      </View>)
  }
  renderList () {
    switch (this.state.selectedOption) {
      case 'TIMELINE':
        return (
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
                      <Text
                        style={styles.work}>{item.InteractionName === null ? 'NOTE' : item.InteractionName.toUpperCase()}</Text>
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
                  <TouchableOpacity style={{flex: 1, backgroundColor: '#36a3f7', padding: 10, borderRadius: 5}}>
                    <Icon name={'pencil'} size={30} color={'#ffffff'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex: 1, backgroundColor: '#f4516c', padding: 10, borderRadius: 5}}>
                    <Icon name={'delete'} size={30} color={'#ffffff'} />
                  </TouchableOpacity>
                </View>
              </View>
            )} />
        )
      case 'TASKS' :
        return (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.tasks}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row', borderWidth: 1, padding: 2, marginVertical: 5}}>
                <View>
                  <Text>{item.TaskName}</Text>
                  <Text style={{fontSize: 12, color: '#000000'}}>{item.TaskName}</Text>
                  <View style={{
                    marginVertical: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <View style={{
                      backgroundColor: '#eaeaea',
                      padding: 5
                    }}>
                      <Text
                        style={styles.work}>{item.InteractionName === null ? 'NOTE' : item.InteractionName.toUpperCase()}</Text>
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
                  <TouchableOpacity style={{flex: 1, backgroundColor: '#36a3f7', padding: 10, borderRadius: 5}}>
                    <Icon name={'pencil'} size={30} color={'#ffffff'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex: 1, backgroundColor: '#f4516c', padding: 10, borderRadius: 5}}>
                    <Icon name={'delete'} size={30} color={'#ffffff'} />
                  </TouchableOpacity>
                </View>
              </View>
            )} />
        )
      case 'NOTES':
        return (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.note}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row', borderWidth: 1, padding: 2, marginVertical: 5}}>
                <View>
                  <Text>{item.TaskName}</Text>
                  <Text style={{fontSize: 12, color: '#000000'}}>{item.TaskName}</Text>
                  <View style={{
                    marginVertical: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <View style={{
                      backgroundColor: '#eaeaea',
                      padding: 5
                    }}>
                      <Text
                        style={styles.work}>{item.InteractionName === null ? 'NOTE' : item.InteractionName.toUpperCase()}</Text>
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
                  <TouchableOpacity style={{flex: 1, backgroundColor: '#36a3f7', padding: 10, borderRadius: 5}}>
                    <Icon name={'pencil'} size={30} color={'#ffffff'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex: 1, backgroundColor: '#f4516c', padding: 10, borderRadius: 5}}>
                    <Icon name={'delete'} size={30} color={'#ffffff'} />
                  </TouchableOpacity>
                </View>
              </View>
            )} />
        )
      case 'APPOINTMENTS':
        return (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.appointment}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row', borderWidth: 1, padding: 2, marginVertical: 5}}>
                <View>
                  <Text>{item.TaskName}</Text>
                  <Text style={{fontSize: 12, color: '#000000'}}>{item.TaskName}</Text>
                  <View style={{
                    marginVertical: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <View style={{
                      backgroundColor: '#eaeaea',
                      padding: 5
                    }}>
                      <Text
                        style={styles.work}>{item.InteractionName === null ? 'NOTE' : item.InteractionName.toUpperCase()}</Text>
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
                  <TouchableOpacity style={{flex: 1, backgroundColor: '#36a3f7', padding: 10, borderRadius: 5}}>
                    <Icon name={'pencil'} size={30} color={'#ffffff'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex: 1, backgroundColor: '#f4516c', padding: 10, borderRadius: 5}}>
                    <Icon name={'delete'} size={30} color={'#ffffff'} />
                  </TouchableOpacity>
                </View>
              </View>
            )} />
        )
      case 'SMS':
        return (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.sms}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row', borderWidth: 1, padding: 2, marginVertical: 5}}>
                <View>
                  <Text>{item.TaskName}</Text>
                  <Text style={{fontSize: 12, color: '#000000'}}>{item.TaskName}</Text>
                  <View style={{
                    marginVertical: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <View style={{
                      backgroundColor: '#eaeaea',
                      padding: 5
                    }}>
                      <Text
                        style={styles.work}>{item.InteractionName === null ? 'NOTE' : item.InteractionName.toUpperCase()}</Text>
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
                  <TouchableOpacity style={{flex: 1, backgroundColor: '#36a3f7', padding: 10, borderRadius: 5}}>
                    <Icon name={'pencil'} size={30} color={'#ffffff'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex: 1, backgroundColor: '#f4516c', padding: 10, borderRadius: 5}}>
                    <Icon name={'delete'} size={30} color={'#ffffff'} />
                  </TouchableOpacity>
                </View>
              </View>
            )} />
        )
      case 'VEHICLE':
        const { vehicle, leadDTO } = this.state
        const item = vehicle._Vehicle
        if (vehicle !== {}) {
          return (
            <ScrollView>
              <View>
                <TouchableOpacity
                  onPress={() => this.onPress()}
                >
                  <Text style={{color: '#5867dd', fontWeight: 'bold'}}>{leadDTO.ModelYear} {leadDTO.Make} {leadDTO.Model}</Text>
                </TouchableOpacity>
                <Image style={styles.defaultImage} source={defaultImage} />
                <Text>Stock#: {item.StockNumber} </Text>
                <Text>VIN: {item.VIN}</Text>
                <Text>Mileage: {vehicle.information.Mileage}</Text>
                <Text>Type: {}</Text>
                <Text>Color: {vehicle.information.ExteriorColorDescription}</Text>
                <Text>Drive Train: {}</Text>
                <Text>Engine: {}</Text>
                <Text>Fuel Type: {}</Text>
                <Text>State</Text>
              </View>
            </ScrollView>
          )
        } else {
          return (
            <View />
          )
        }
      case 'DEALS':
        return (
          <View />
        )
    }
  }
  render () {
    const { lead, leadDTO } = this.state
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background} />
        <CustomNavBar
          title={'Marketing'} />
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView behavior='position'>
            <View style={[styles.viewItem, {marginTop: 20}]}>
              <View style={{paddingHorizontal: 15}}>
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{fontSize: 18, color: '#5c6bdd'}}>{lead.CustomerName}</Text>
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
                  onChangeText={(make) => this.setState({make})}
                // data={this.state.makes}
                // value={this.state.make}
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
                  onChangeText={(assigned) => this.setState({assigned})}
                // data={this.state.leadAssigned}
                // value={this.state.assigned}
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
              <TouchableOpacity
                // onPress={() => this.onSave()}
                style={styles.buttonSave}>
                <Text style={styles.textButton}>SAVE</Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => Actions.addMailScreen()}
                  style={[styles.itemButton, {backgroundColor: '#449ffc'}]}
                >
                  <Icon name={'email'} size={30} color={'#ffffff'} />
                  <Text style={styles.textItemButton}>Mail</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Actions.addSmsScreen()}
                  style={[styles.itemButton, {backgroundColor: '#43516c'}]}
                >
                  <Icon name={'comment-text-outline'} size={30} color={'#ffffff'} />
                  <Text style={styles.textItemButton}>SMS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Actions.addAppointmentScreen()}
                  style={[styles.itemButton, {backgroundColor: '#57ad20'}]}
                >
                  <Icon name={'account-multiple'} size={30} color={'#ffffff'} />
                  <Text style={styles.textItemButton}>Appointment</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Actions.addReminderScreen()}
                  style={[styles.itemButton, {backgroundColor: '#17c4bb'}]}
                >
                  <Icon name={'clock'} size={30} color={'#ffffff'} />
                  <Text style={styles.textItemButton}>Reminder</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Actions.addNoteScreen()}
                  style={[styles.itemButton, {backgroundColor: '#5583dc'}]}
                >
                  <Icon name={'note'} size={30} color={'#ffffff'} />
                  <Text style={styles.textItemButton}>Note</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Actions.editDealScreen()}
                  style={[styles.itemButton, {backgroundColor: '#393939'}]}
                >
                  <Icon name={'car'} size={30} color={'#ffffff'} />
                  <Text style={styles.textItemButton}>Deal</Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => Actions.tradeInScreen()}
                  style={[{flexDirection: 'row', backgroundColor: '#36a3f7'}, styles.itemButton]}>
                  <Icon name={'car'} size={30} color={'#ffffff'} />
                  <Text style={styles.textItemButton2}>TRADE IN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Actions.creditApplicationScreen()}
                  style={[{flexDirection: 'row', backgroundColor: '#34bfa3'}, styles.itemButton]}>
                  <Icon name={'note'} size={30} color={'#ffffff'} />
                  <Text style={styles.textItemButton2}>CREDIT APPLICATION</Text>
                </TouchableOpacity>
              </View>
              {this.renderBasic()}
            </View>
            <View style={[styles.viewItem, {paddingHorizontal: 15}]}>
              {this.renderList()}
            </View>
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
    lead: state.marketing.lead,
    timeLines: state.marketing.timeLines,
    leadAssigned: state.marketing.leadAssigned,
    tasks: state.marketing.tasks,
    leadDTO: state.marketing.leadDTO,
    make: state.inventory.make,
    temperature: state.marketing.temperature,
    vehicle: state.inventory.vehicle
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

export default connect(mapStateToProps, mapDispatchToProps)(MarketingSeenScreen)
