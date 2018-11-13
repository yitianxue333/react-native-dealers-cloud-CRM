import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'
import CustomNavBar from '../Components/CustomNavBar'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { Picker } from 'react-native-picker-dropdown'
import DateTimePicker from 'react-native-modal-datetime-picker'
import Moment from 'moment/moment'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PurchaseInformationScreenStyle'
import { Actions } from 'react-native-router-flux'

const background = require('../Images/AddDeal/background.png')
const make = [
  {'label': 'ACURA', 'value': 'ACURA'},
  {'label': 'ALFA', 'value': 'ALFA'},
  {'label': 'AM GENERAL', 'value': 'AMGENERAL'},
  {'label': 'ASTON MARTIN', 'value': 'ASTONMARTIN'},
  {'label': 'AUDI', 'value': 'AUDI'}
]

class PurchaseInformationScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: Moment().format('DD MMMM YYYY'),
      make: '',
      cleanValue: '',
      packFee: '',
      purchasePrice: '',
      vehicle: this.props.vehicle,
      leadAssigned: [{Description: 'Please Select', ItemID: ''}].concat(this.props.leadAssigned),
      buyer: ''
    }
  }

  handleValueChange (make) {
    this.setState({make})
  }

  _showDateTimePicker = () => this.setState({isDatePickerVisible: true})

  _hideDateTimePicker = () => this.setState({isDatePickerVisible: false})

  _handleDatePicked = (date) => {
    __DEV__ && console.log('A date has been picked: ', date)
    this.setState({
      date: Moment(date).format('DD MMMM YYYY')
    })
    this._hideDateTimePicker()
  }

  render () {
    const {vehicle} = this.state
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background}
        />
        <CustomNavBar
          title={'Purchase Information'}
        />
        <KeyboardAwareScrollView style={styles.container}>
          <View style={[styles.viewItem, {marginTop: 20}]}>
            <TouchableOpacity
              onPress={this._showDateTimePicker}>
              <Text style={[styles.text, {marginTop: 0}]}>PURCHASE DATE</Text>
              <TextInput
                editable={false}
                underlineColorAndroid={'transparent'}
                value={this.state.date}
                style={styles.textInput}
              />
            </TouchableOpacity>
            <Text style={styles.text}>CLEAN TRADE-IN VALUE</Text>
            <TextInput
              underlineColorAndroid={'transparent'}
              value={this.state.cleanValue}
              onChangeText={(cleanValue) => this.setState({cleanValue})}
              style={styles.textInput}
            />
            <Text style={styles.text}>PACK FEE</Text>
            <TextInput
              underlineColorAndroid={'transparent'}
              value={vehicle.PackFee.toString()}
              onChangeText={(PackFee) => this.setState({vehicle: {...vehicle, ...{PackFee}}})}
              style={styles.textInput}
            />
            <Text style={styles.text}>PURCHASE PRICE</Text>
            <TextInput
              underlineColorAndroid={'transparent'}
              value={this.state.purchasePrice}
              onChangeText={(purchasePrice) => this.setState({purchasePrice})}
              style={styles.textInput}
            />
            <Text style={styles.text}>BOUGHT FROM</Text>
            <Picker
              selectedValue={this.state.make}
              onValueChange={(make) => this.handleValueChange(make)}
              prompt='Choose your car'
              style={Platform.OS === 'ios' ? styles.picker : styles.pickerAndroid}
              textStyle={Platform.OS === 'ios' && styles.pickerText}
              cancel
            >
              {
                make.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.label}
                    value={item.value}
                  />
                ))
              }
            </Picker>
            <Text style={styles.text}>BUYER</Text>
            <Dropdown
              onChangeText={(buyer) => this.setState({buyer})}
              data={this.state.leadAssigned}
              value={this.state.buyer}
              valueExtractor={({ItemID}) => ItemID}
              labelExtractor={({Description}) => Description}
            />
          </View>
          <View
            style={{height: 100}}
          />
        </KeyboardAwareScrollView>
        <TouchableOpacity
          onPress={() => Actions.pop()}
          style={styles.buttonSave}>
          <Text style={styles.textButton}>SAVE</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  vehicle: state.inventory.vehicle,
  id: state.inventory.id,
  leadAssigned: state.marketing.leadAssigned
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseInformationScreen)
