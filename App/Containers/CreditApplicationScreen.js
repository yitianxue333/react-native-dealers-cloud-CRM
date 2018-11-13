import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, TouchableOpacity, TextInput } from 'react-native'
import CustomNavBar from '../Components/CustomNavBar'
import { connect } from 'react-redux'
import { Dropdown } from 'react-native-material-dropdown'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from 'react-native-modal-datetime-picker'
import CheckBox from 'react-native-icon-checkbox'
import Moment from 'moment'
import Api from '../Services/Api'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CreditApplicationScreenStyle'
const background = require('../Images/AddDeal/background.png')
const api = Api.create()
class CreditApplicationScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      creditApplication: this.props.creditApplication,
      isDatePickerVisible: false,
      isNew: false,
      person: this.props.creditApplication._CreditApplicant.customerDTO.businessPartyDTO.person,
      address: this.props.creditApplication._CreditApplicant.customerDTO.businessPartyDTO.Address,
      phones: this.props.creditApplication._CreditApplicant.customerDTO.businessPartyDTO.Phones,
      emails: this.props.creditApplication._CreditApplicant.customerDTO.businessPartyDTO.Emails,
      businessPartyDTO: this.props.creditApplication._CreditApplicant.customerDTO.businessPartyDTO,
      creditApplicant: this.props.creditApplication._CreditApplicant.creditApplicant,
      _CreditApplication: this.props.creditApplication._CreditApplication,
      date: Moment(this.props.creditApplication._CreditApplication.ApplicationDate).format('l LTS')
    }
  }
  _showDateTimePicker = () => this.setState({isDatePickerVisible: true})

  _hideDateTimePicker = () => this.setState({isDatePickerVisible: false})

  _handleDatePicked = (date) => {
    __DEV__ && console.log('A date has been picked: ', date)
    this.setState({
      date: Moment(date).format('l LTS')
    })
    this._hideDateTimePicker()
  }
  handlePressCheckedBoxNew = () => {
    this.setState({
      isNew: !this.state.isNew
    })
  }
  async onSave () {
    const { token } = this.props
    api.setToken(token)
    let { creditApplication, person, address, phones, emails, businessPartyDTO, creditApplicant, _CreditApplication, date } = this.state
    businessPartyDTO = businessPartyDTO.merge({Person: person, Phones: phones, Emails: emails, Address: address})
    _CreditApplication = _CreditApplication.merge({ApplicationDate: date})
    let _CreditApplicant = creditApplication._CreditApplicant
    let customerDTO = creditApplication._CreditApplicant.customerDTO
    customerDTO = customerDTO.merge({businessPartyDTO})
    _CreditApplicant = _CreditApplicant.merge({creditApplicant, customerDTO})
    creditApplication = creditApplication.merge({_CreditApplicant, _CreditApplication})
    __DEV__ && console.log('creditApplication', creditApplication)
    const response = await api.saveCreditApplication(creditApplication)
    __DEV__ && console.log('creditApplication', response)
  }
  render () {
    const {person, address, businessPartyDTO, creditApplicant, _CreditApplication} = this.state
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background} />
        <CustomNavBar
          title={'Credit Application'} />
        <KeyboardAwareScrollView style={styles.container}>
          <View style={[styles.viewItem, {marginTop: 20}]}>
            <View>
              <Text>Basic Info</Text>
            </View>
            <Text style={styles.text}>FIRST</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={person.FirstName}
              onChangeText={(FirstName) => this.setState({person: person.merge({FirstName})})}
              style={styles.textInput} />
            <Text style={styles.text}>MIDDLE</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={person.MiddleName}
              onChangeText={(MiddleName) => this.setState({person: person.merge({MiddleName})})}
              style={styles.textInput} />
            <Text style={styles.text}>LAST</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={person.LastName}
              onChangeText={(LastName) => this.setState({person: person.merge({LastName})})}
              style={styles.textInput} />
            <Text style={styles.text}>DOB</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={Moment(person.DOB).format('MM/DD/YYYY')}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>SSN</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={person.SSN}
              onChangeText={(SSN) => this.setState({person: person.merge({SSN})})}
              style={styles.textInput} />
            <Text style={styles.text}>DL #</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={person.DriverLicNo}
              onChangeText={(DriverLicNo) => this.setState({person: person.merge({DriverLicNo})})}
              style={styles.textInput} />
            <Text style={styles.text}>MARITAL</Text>
            <Dropdown
              onChangeText={(model) => this.setState({model})}
              // data={this.state.models}
              // value={this.state.model}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>NO OF DEPENDENTS</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>AGES OF DEPENDENTS</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>LIVING</Text>
            <Dropdown
              onChangeText={(model) => this.setState({model})}
              // data={this.state.models}
              // value={this.state.model}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>RENT/MORTGAGE</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={creditApplicant.RentOrMortgage.toString()}
              onChangeText={(RentOrMortgage) => this.setState({creditApplicant: creditApplicant.merge({RentOrMortgage})})}
              style={styles.textInput} />
            <Text style={styles.text}>DL STATE</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={person.DLState}
              onChangeText={(DLState) => this.setState({person: person.merge({DLState})})}
              style={styles.textInput} />
          </View>
          <View style={[styles.viewItem, {marginTop: 20}]}>
            <View>
              <Text>Credit App</Text>
            </View>
            <TouchableOpacity
              onPress={this._showDateTimePicker}>
              <Text style={styles.text}>DATE</Text>
              <TextInput
                editable={false}
                underlineColorAndroid={'transparent'}
                value={this.state.date}
                style={styles.textInput} />
            </TouchableOpacity>
            <Text style={styles.text}>DOWN PAYMENT</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={_CreditApplication.DownPayment}
              onChangeText={(DownPayment) => this.setState({_CreditApplication: _CreditApplication.merge({DownPayment})})}
              style={styles.textInput} />
            <Text style={styles.text}>LOAN TERM</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={_CreditApplication.LownTermInYears.toString()}
              onChangeText={(LownTermInYears) => this.setState({_CreditApplication: _CreditApplication.merge({LownTermInYears})})}
              style={styles.textInput} />
            <CheckBox
              label={'Co Buyer'}
              labelStyle={styles.label}
              checked={this.state.isNew}
              onPress={this.handlePressCheckedBoxNew}
              color={'#00c848'}
            />
            <Text style={styles.text}>COMMENTS</Text>
            <TextInput
              multiline
              value={_CreditApplication.Comments}
              onChangeText={(Comments) => this.setState({_CreditApplication: _CreditApplication.merge({Comments})})}
            />
          </View>
          <View style={[styles.viewItem, {marginTop: 20}]}>
            <View>
              <Text>Address</Text>
            </View>
            <Text style={styles.text}>STREET</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={address.Street}
              onChangeText={(Street) => this.setState({address: address.merge({Street})})}
              style={styles.textInput} />
            <Text style={styles.text}>ZIP</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={address.ZIPCode}
              onChangeText={(ZIPCode) => this.setState({address: address.merge({ZIPCode})})}
              style={styles.textInput} />
            <Text style={styles.text}>CITY</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={address.City}
              onChangeText={(City) => this.setState({address: address.merge({City})})}
              style={styles.textInput} />
            <Text style={styles.text}>STATE</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={address.State}
              onChangeText={(State) => this.setState({address: address.merge({State})})}
              style={styles.textInput} />
            <Text style={styles.text}>COUNTRY</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={address.County}
              onChangeText={(County) => this.setState({address: address.merge({County})})}
              style={styles.textInput} />
            <Text style={styles.text}>EMAIL</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={businessPartyDTO.Email}
              onChangeText={(Email) => this.setState({businessPartyDTO: businessPartyDTO.merge({Email})})}
              style={styles.textInput} />
            <Text style={styles.text}>TIME AT ADDRESS</Text>
            <Text style={styles.text}>YEARS</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={creditApplicant.TimeatAddressYears.toString()}
              onChangeText={(TimeatAddressYears) => this.setState({creditApplicant: creditApplicant.merge({TimeatAddressYears})})}
              style={styles.textInput} />
            <Text style={styles.text}>MONTHS</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={creditApplicant.TimeatAddressMonths.toString()}
              onChangeText={(TimeatAddressMonths) => this.setState({creditApplicant: creditApplicant.merge({TimeatAddressMonths})})}
              style={styles.textInput} />
            <Text style={styles.text}>CELL</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>HOME</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>WORK</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={businessPartyDTO.Work}
              onChangeText={(Work) => this.setState({businessPartyDTO: businessPartyDTO.merge({Work})})}
              style={styles.textInput} />
          </View>
          <View style={[styles.viewItem, {marginTop: 20}]}>
            <View>
              <Text>Previous Address</Text>
            </View>
            <Text style={styles.text}>STREET</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>ZIP</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>CITY</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>STATE</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>TIME AT ADDRESS</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>YEARS</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>MONTHS</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
          </View>
          <View style={[styles.viewItem, {marginTop: 20}]}>
            <View>
              <Text>Reference</Text>
            </View>
            <Text style={styles.text}>FIRST</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>MIDDLE</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>LAST</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>PHONE</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>STREET</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>ZIP</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>CITY</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>STATE</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>RELATIONSHIP</Text>
            <Dropdown
              onChangeText={(model) => this.setState({model})}
              // data={this.state.models}
              // value={this.state.model}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
          </View>
          <View style={[styles.viewItem, {marginTop: 20}]}>
            <View>
              <Text>Employment</Text>
            </View>
            <Text style={styles.text}>NAME</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={currentEmployment.EmploymentName}
              // onChangeText={(EmploymentName) => this.setState({currentEmployment: currentEmployment.merge({EmploymentName})})}
              style={styles.textInput} />
            <Text style={styles.text}>JOB TITLE</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={currentEmployment.JobTitle}
              // onChangeText={(JobTitle) => this.setState({currentEmployment: currentEmployment.merge({JobTitle})})}
              style={styles.textInput} />
            <Text style={styles.text}>GROSS INCOME</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={currentEmployment.GrossIncome}
              // onChangeText={(GrossIncome) => this.setState({currentEmployment: currentEmployment.merge({GrossIncome})})}
              style={styles.textInput} />
            <Dropdown
              onChangeText={(model) => this.setState({model})}
              // data={this.state.models}
              // value={this.state.model}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>EMPLOYMENT LENGTH</Text>
            <Text style={styles.text}>YEARS</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={currentEmployment.EmploymentInYears.toString()}
              // onChangeText={(EmploymentInYears) => this.setState({currentEmployment: currentEmployment.merge({EmploymentInYears})})}
              style={styles.textInput} />
            <Text style={styles.text}>MONTHS</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={currentEmployment.EmploymentInMonths}
              // onChangeText={(EmploymentInMonths) => this.setState({currentEmployment: currentEmployment.merge({EmploymentInMonths})})}
              style={styles.textInput} />
            <Text style={styles.text}>STREET</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>ZIP</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>CITY</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>STATE</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>OTHER INCOME</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>SOURCE</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>RECEIVED UNDER</Text>
            <Dropdown
              onChangeText={(model) => this.setState({model})}
              // data={this.state.models}
              // value={this.state.model}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
          </View>
          <View style={{height: 100}} />
        </KeyboardAwareScrollView>
        <DateTimePicker
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker} />
        <TouchableOpacity
          onPress={() => this.onSave()}
          style={styles.buttonSave}>
          <Text style={styles.textButton}>SAVE</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    creditApplication: state.marketing.creditApplication,
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditApplicationScreen)
