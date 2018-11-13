import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Fonts } from '../Themes/'
import Moment from 'moment'
import { RadioButtons } from 'react-native-radio-buttons'
import { Actions } from 'react-native-router-flux'
import accounting from 'accounting'
import Api from '../Services/Api'
import LoadingSpinnerOverlay from '@react-native-component/react-native-smart-loading-spinner-overlay/LoadingSpinnerOverlay'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DealsScreenStyle'
import { bindActionCreators } from 'redux'
import DealActions, { getDeal } from '../Redux/DealRedux'
const background = require('../Images/AddDeal/background.png')
const menu = require('../Images/AddDeal/menu.png')
const api = Api.create()

class DealsScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedOption: 'DEALS',
      data: this.props.deal
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
  componentDidMount () {
  }
  async onPress (item) {
    await this.getDeal(item.DealID)
    await this.getDealVehicle(item.VehicleID)
    this._modalLoadingSpinnerOverLay.hide()
    Actions.editDealScreen({ item })
  }
  async getDeal (dealID) {
    this._modalLoadingSpinnerOverLay.show()
    const { token } = this.props
    api.setToken(token)
    const response = await api.getDeal(dealID)
    __DEV__ && console.log('Deal', response)
    if (response.ok) {
      this.props.getDeal(response.data)
    }
  }
  async getDealVehicle (vehicleID) {
    const { token } = this.props
    api.setToken(token)
    const response = await api.getDealSearchVehicle(vehicleID)
    __DEV__ && console.log('dealVehicle', response)
    if (response.ok) {
      this.props.getDealVehicle(response.data)
    }
  }
  render () {
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background} />
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView behavior='position'>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.data}
              renderItem={({ item }) => (<View style={styles.viewItem}>
                <View style={{flexDirection: 'row', marginBottom: 20}}>
                  <View style={{
                    borderRadius: 20,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#450094'}}>
                    <Text style={styles.nameText}>{this.avatarText(item.Customer)}</Text>
                  </View>
                  <View style={{backgroundColor: 'transparent', marginLeft: 10}}>
                    <Text style={styles.name}>{item.Customer}</Text>
                    <Text style={styles.phone}>PHONE: {item.PhoneNumber}</Text>
                  </View>
                  <View style={{
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    right: 40,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Text style={styles.date}>{Moment(item.DealDate).format('l')}</Text>
                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#00b851',
                      paddingHorizontal: 5
                    }}>
                      <Text style={styles.work}>{item.DealStatusIDText.toUpperCase()}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{position: 'absolute', right: 0, top: 10}}
                    onPress={() => this.onPress(item)}
                  >
                    <Image
                      style={{height: 15, resizeMode: 'contain'
                      }}
                      source={menu} />
                  </TouchableOpacity>
                </View>
                <Text style={[styles.name,
                  {backgroundColor: 'transparent',
                    marginBottom: 3
                  }]}>{item.ModelYear} {item.Make} {item.Model}</Text>
                <Text style={[styles.phone,
                  {fontWeight: 'bold',
                    backgroundColor: 'transparent'
                  }]}>{item.VIN}</Text>
                <TouchableOpacity
                  style={styles.buttonLogin}>
                  <Text style={styles.textButton}>{accounting.formatMoney(item.BalanceDue)}</Text>
                </TouchableOpacity>
              </View>)} />
          </KeyboardAvoidingView>
          <LoadingSpinnerOverlay
            ref={(component) => { this._modalLoadingSpinnerOverLay = component }} />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    deal: state.deal.deal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(DealActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DealsScreen)
