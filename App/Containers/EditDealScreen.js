import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native'
import accounting from 'accounting'
import { Picker } from 'react-native-picker-dropdown'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomNavBar from '../Components/CustomNavBar'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EditDealScreenStyle'
const defaultImage = require('../Images/AddDeal/default_choose_image.png')
const iconCamera = require('../Images/AddDeal/ic_camera.png')
const background = require('../Images/AddDeal/background.png')
const make = [
  {'label': 'Cash', 'value': 'Cash'},
  {'label': 'Check', 'value': 'Check'},
  {'label': 'Eft', 'value': 'Eft'},
  {'label': 'Credit Card', 'value': 'CreditCard'},
  {'label': 'Debit Card', 'value': 'DebitCard'},
  {'label': 'Discount', 'value': 'Discount'},
  {'label': 'Promissory Note', 'value': 'PromissoryNote'}
]
class EditDealScreen extends Component {
  constructor (props) {
    super(props)
    const { item } = this.props
    __DEV__ && console.log('a', item)
    if (item !== undefined) {
      this.state = {
        make: 'Cash',
        deal: this.props.single,
        afterMarketProducts: this.props.single.AfterMarketProducts,
        dealVehicle: this.props.dealVehicle,
        dealInfo: this.props.single.DealInfo,
        dealershipFees: this.props.single.DealershipFees,
        stateFees: this.props.single.StateFees,
        Taxes: this.props.single.Taxes,
        tradeIns: this.props.single.TradeIns,
        afterMarket: this.props.single.AfterMarketProducts.reduce((a, b) => a + b.Price, 0),
        fees: this.props.single.DealAllFeesIncluded.reduce((a, b) => a + b.Amount, 0),
        taxes: this.props.single.Taxes.reduce((a, b) => a + b.Amount, 0),
        tradeIn: this.props.single.TradeIns.reduce((a, b) => a + b.NetTrade, 0),
        downPayment: this.props.single.PNotes.reduce((a, b) => a + b.Amount, 0) + this.props.single.DealPayments.reduce((a, b) => a + b.Amount, 0),
        lenderPay: this.props.single.AfterMarketProducts.reduce((a, b) => b.LenderPay ? a + b.Cost : a, 0),
        tradeInTA: this.props.single.TradeIns.reduce((a, b) => a + b.TradeAmount, 0),
        documentFees: this.props.single.DealAllFeesIncluded.reduce((a, b) => b.FeeCategoryID === 1 ? a + b.Amount : a, 0),
        warranty: this.props.single.AfterMarketProducts.reduce((a, b) => b.AfterMarketProductTypeID === 1 ? a + b.Price : a, 0),
        gap: this.props.single.AfterMarketProducts.reduce((a, b) => b.AfterMarketProductTypeID === 2 ? a + b.Price : a, 0)
      }
    } else {
      this.state = {
        make: '',
        afterMarket: 0,
        fees: 0,
        taxes: 0,
        tradeIn: 0,
        deal: '',
        item,
        stock: '',
        vin: '',
        color: '',
        curbWeight: '',
        milleage: '',
        salePrice: '0.00',
        saleTotal: '0.00',
        dealVehicle: {
          'VehicleID': 0,
          'VIN': '',
          'StockNumber': '',
          'ModelYear': 0,
          'Make': '',
          'Model': '',
          'ExteriorColor': 'Alloy ',
          'Mileage': 0,
          'CurbWeight': '',
          'Price': 0,
          'IsSold': false,
          'DealID': 0,
          'DomainName': '',
          'VehicleImage': null
        }
      }
    }
  }
  taxes (tradeInTA, documentFees, warranty, salePrice, rate, id, stateFeeTax, gap) {
    const { fees } = this.state
    if (rate === 0) return 0
    let total = 0
    switch (id) {
      case 7 :
        total = (salePrice + documentFees + warranty - tradeInTA) * rate / 100
        break
      case 6 :
        total = (salePrice + documentFees + tradeInTA) * rate / 100
        break
      case 5 :
        total = (salePrice + tradeInTA) * rate / 100
        break
      case 4 :
        total = (warranty) * rate / 100
        break
      case 3 :
        total = documentFees * rate / 100
        break
      case 2 :
        total = salePrice * rate / 100
        break
      case 1 :
        total = (salePrice + documentFees + warranty + gap) * rate / 100
        break
      case 8 :
        total = (salePrice + documentFees) * rate / 100
        break
      case 10 :
        total = (salePrice + warranty - tradeInTA) * rate / 100
        break
      case 11 :
        total = (salePrice + fees) * rate / 100
        break
      case 13 :
        total = (salePrice + documentFees + warranty + gap) * rate / 100
        break
      case 14 :
        total = (salePrice + warranty - tradeInTA) * rate / 100
        break
      default :
        total = 0
        break
    }
    if (stateFeeTax === 'VA') {
      if (total >= 75) {
        return total
      } else {
        return 75
      }
    } else {
      return total
    }
  }
  handleValueChange (make) {
    this.setState({ make })
    __DEV__ && console.log(make)
  }
  render () {
    const { afterMarket, dealVehicle, dealInfo, fees, tradeIn, downPayment, lenderPay, tradeInTA, documentFees, warranty, gap } = this.state
    const taxes = this.props.single.Taxes.reduce((a, b) => a + this.taxes(tradeInTA, documentFees, warranty, dealInfo.SalePrice, b.Rate, b.TaxVariableID, dealInfo.StateFeeTax, gap), 0)
    const saleTotal = dealInfo.SalePrice + fees + taxes + tradeIn + afterMarket
    const balanceDue = saleTotal - downPayment - lenderPay
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background} />
        <CustomNavBar
          title={'Edit Deal'} />
        <KeyboardAwareScrollView style={styles.container}>
          {dealVehicle.VehicleImage !== null
            ? <Image style={styles.defaultImage} source={{uri: dealVehicle.VehicleImage}} />
            : <Image style={styles.defaultImage} source={defaultImage} />}
          <TouchableOpacity
            style={styles.touchCam}>
            <Image source={iconCamera} style={styles.icCam} />
          </TouchableOpacity>
          <View style={styles.viewItem}>
            <Text style={styles.textInfo}>Car Informations</Text>
            <TextInput underlineColorAndroid={'transparent'}
              placeholder={'STOCK'}
              value={dealVehicle.StockNumber}
              style={styles.textInput} />
            <TextInput underlineColorAndroid={'transparent'}
              placeholder={'VIN'}
              value={dealVehicle.VIN}
              style={styles.textInput} />
            <TextInput underlineColorAndroid={'transparent'}
              placeholder={'COLOR'}
              value={dealVehicle.ExteriorColor}
              style={styles.textInput} />
            <TextInput underlineColorAndroid={'transparent'}
              placeholder={'Curb.Weight'}
              value={dealVehicle.CurbWeight}
              style={styles.textInput} />
            <TextInput underlineColorAndroid={'transparent'}
              placeholder={'Mileage'}
              value={dealVehicle.Mileage.toString()}
              style={styles.textInput} />
            <TextInput underlineColorAndroid={'transparent'}
              placeholder={'Status'}
              style={styles.textInput} />
          </View>
          <View style={styles.viewItem}>
            <View style={{flexDirection: 'row', margin: 5}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginRight: 10}}>
                <Text>SALE PRICE</Text>
                <TextInput
                  style={[styles.text, { padding: 0, margin: 0, height: 19 }]}
                  underlineColorAndroid={'transparent'}
                  value={dealInfo.SalePrice.toString()}
                  onChangeText={(SalePrice) => this.setState({dealInfo: {...dealInfo, ...{SalePrice: parseInt(SalePrice)}}})}
                />
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                <Text>SALE TOTAL</Text>
                <Text style={styles.num}>{accounting.formatMoney(saleTotal, '')}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', margin: 5}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginRight: 10}}>
                <Text>FEES</Text>
                <Text style={styles.text}>{accounting.formatMoney(fees, '')}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                <Text>DOWN PAYMENT</Text>
                <Text style={styles.num}>{accounting.formatMoney(downPayment, '')}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', margin: 5}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginRight: 10}}>
                <Text>TAXES</Text>
                <Text style={styles.text}>{accounting.formatMoney(taxes, '')}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                <Text>REFOUND</Text>
                <Text style={styles.num}>0.00</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', margin: 5}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginRight: 10}}>
                <Text>TRADE-IN</Text>
                <Text style={styles.text}>{accounting.formatMoney(tradeIn, '')}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}} />
            </View>
            <View style={{flexDirection: 'row', margin: 5}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginRight: 10}}>
                <Text>AFTER MARKET</Text>
                <Text style={styles.text}>{accounting.formatMoney(afterMarket, '')}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                <Text>DUE BALANCE</Text>
                <Text style={styles.num}>{accounting.formatMoney(balanceDue, '')}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonSave}>
            <Text style={styles.textButton}>SAVE</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    single: state.deal.single,
    dealVehicle: state.deal.dealVehicle
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDealScreen)
