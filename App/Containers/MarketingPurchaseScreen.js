import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MarketingPurchaseScreenStyle'
import { Actions } from 'react-native-router-flux'
import DateTimePicker from 'react-native-modal-datetime-picker'
import Moment from 'moment/moment'
const background = require('../Images/AddDeal/background.png')
class MarketingPurchaseScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dateRangeFrom: '',
      dateRangeTo: '',
      isDateTimePickerFromVisible: false,
      isDateTimePickerToVisible: false
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
  render () {
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background} />
        <KeyboardAwareScrollView style={styles.container}>
          <View style={[styles.viewItem, {marginTop: 20}]}>
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
          <View style={{height: 100}} />
          <DateTimePicker
            isVisible={this.state.isDateTimePickerFromVisible}
            onConfirm={this._handleDatePickedFrom}
            onCancel={this._hideDateTimePickerFrom} />
          <DateTimePicker
            isVisible={this.state.isDateTimePickerToVisible}
            onConfirm={this._handleDatePickedTo}
            onCancel={this._hideDateTimePickerTo} />
        </KeyboardAwareScrollView>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketingPurchaseScreen)
