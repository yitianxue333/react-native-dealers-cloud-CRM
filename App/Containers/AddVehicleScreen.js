import React, { PureComponent } from 'react'
import { Picker, Text, View, Image, TextInput, TouchableOpacity, Modal } from 'react-native'
import { connect } from 'react-redux'
import CheckBox from 'react-native-icon-checkbox'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ScanVinScreen from './ScanVinScreen'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddVehicleScreenStyle'
import InventoryActions from '../Redux/InventoryRedux'

const background = require('../Images/AddDeal/background.png')

class AddVehicleScreen extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      vin: '',
      mfa: 'MFA',
      isEvaluationChecked: false,
      isBuyCarFaxChecked: false,
      showModal: false,
      listPrefix: [],
      selectedPrefix: ''
    }
  }

  async componentDidMount () {
    // Call IAPI to get data
    this.getPrefixFromApi()
  }

  getPrefixFromApi = async () => {
    try {
      let response = await fetch(
        'https://dcapi.dealerscloud.com/api/Vehicle/GetStockPrefixes?DealershipID=11',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.props.token}`
          }
        }
      )
      let responseJson = await response.json()
      if (responseJson) {
        this.setState({
          listPrefix: responseJson,
          selectedPrefix: responseJson[0]
        })
      }
      return responseJson
    } catch (error) {
      console.error(error)
    }
  }
  handlePressCheckedBox = (type) => {
    const {isEvaluationChecked, isBuyCarFaxChecked} = this.state
    if (type && type === 'evaluation') {
      this.setState({
        isEvaluationChecked: !isEvaluationChecked
      })
    }
    if (type && type === 'buycarfax') {
      this.setState({
        isBuyCarFaxChecked: !isBuyCarFaxChecked
      })
    }
  }

  componentWillReceiveProps (newProps) {
    // this.forceUpdate()
    this.props.choice(2)
  }

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal})
  }

  render () {
    const {listPrefix, selectedPrefix} = this.state
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Image
          style={styles.background}
          source={background} />
        <View style={styles.viewAll}>
          <View>
            <View style={[styles.viewItem, {marginTop: 20}]}>
              <Text style={styles.text}>VIN</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <TextInput
                  underlineColorAndroid={'transparent'}
                  value={this.state.vin}
                  onChangeText={(text) => this.setState({vin: text})}
                  style={styles.textInput} />
                <TouchableOpacity
                  style={{alignSelf: 'flex-end'}}
                  onPress={() => this.setState({showModal: true})}
                >
                  <Icon name='barcode-scan' size={30} color={'#000000'} />
                </TouchableOpacity>
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <View style={{marginRight: 140}}>
                  <CheckBox
                    style={{marginLeft: 23}}
                    checked={this.state.isEvaluationChecked}
                    onPress={() => this.handlePressCheckedBox('evaluation')}
                    color={'#215bc4'}
                  />
                  <Text style={styles.textCheckBox}>Evaluation Only</Text>
                </View>
                <View>
                  <CheckBox
                    style={{marginLeft: 12}}
                    checked={this.state.isBuyCarFaxChecked}
                    onPress={() => this.handlePressCheckedBox('buycarfax')}
                    color={'#215bc4'}
                  />
                  <Text style={styles.textCheckBox}>Buy CarFax</Text>
                </View>
              </View>
            </View>
            <View style={[styles.viewItem, {marginTop: 20}]}>
              <Text style={styles.text}>Stock Prefix</Text>
              <Picker
                selectedValue={selectedPrefix}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue) => this.setState({selectedPrefix: itemValue})}>
                {listPrefix && listPrefix.length > 0
                  ? listPrefix.map((item, index) => (
                    <Picker.Item key={item + index} label={item} value={item} />
                  ))
                  : null}
              </Picker>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonDECODE}
            // onPress={() => this.getPrefixFromApi()}
          >
            <Text style={styles.textButton}>DECODE</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={this.state.showModal}
          onRequestClose={this.toggleModal}>
          <ScanVinScreen
            onSuccess={(e) => {
              this.setState({vin: e.data.toString()})
              this.toggleModal()
            }}
            screenProps={{toggle: this.toggleModal}}
          />
        </Modal>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    choice: (id) => dispatch(InventoryActions.choice(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVehicleScreen)
