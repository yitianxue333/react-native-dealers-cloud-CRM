import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native'
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
// const make = [
//   {'label': 'Cash', 'value': 'Cash'},
//   {'label': 'Check', 'value': 'Check'},
//   {'label': 'Eft', 'value': 'Eft'},
//   {'label': 'Credit Card', 'value': 'CreditCard'},
//   {'label': 'Debit Card', 'value': 'DebitCard'},
//   {'label': 'Discount', 'value': 'Discount'},
//   {'label': 'Promissory Note', 'value': 'PromissoryNote'}
// ]
class AddDealCrmScreen extends Component {
  constructor (props) {
    super(props)
    const { item } = this.props
    __DEV__ && console.log('a', item)
    if (item !== undefined) {
      this.state = {
        make: 'Cash',
        deal: this.props.single,
        item,
        stock: item.StockNumber,
        vin: item.VIN,
        color: item.Color,
        curbWeight: '',
        milleage: item.Mileage.toString(),
        salePrice: item.SalePrice,
        saleTotal: item.SaleTotal
      }
    } else {
      this.state = {
        make: '',
        deal: '',
        item,
        stock: '',
        vin: '',
        color: '',
        curbWeight: '',
        milleage: '',
        salePrice: '0.00',
        saleTotal: '0.00'
      }
    }
  }
  handleValueChange (make) {
    this.setState({ make })
    __DEV__ && console.log(make)
  }
  render () {
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background} />
        <CustomNavBar
          title={'Edit Deal'} />
        <KeyboardAwareScrollView style={styles.container}>
          <Image style={styles.defaultImage} source={defaultImage} />
          <TouchableOpacity
            style={styles.touchCam}>
            <Image source={iconCamera} style={styles.icCam} />
          </TouchableOpacity>
          <View style={styles.viewItem}>
            <Text style={styles.textInfo}>Car Informations</Text>
            <TextInput underlineColorAndroid={'transparent'}
              placeholder={'STOCK'}
              value={this.state.stock}
              style={styles.textInput} />
            <TextInput underlineColorAndroid={'transparent'}
              placeholder={'VIN'}
              value={this.state.vin}
              style={styles.textInput} />
            <TextInput underlineColorAndroid={'transparent'}
              placeholder={'COLOR'}
              value={this.state.color}
              style={styles.textInput} />
            <TextInput underlineColorAndroid={'transparent'}
              placeholder={'Curb.Weight'}
              style={styles.textInput} />
            <TextInput underlineColorAndroid={'transparent'}
              placeholder={'Mileage'}
              value={this.state.milleage}
              style={styles.textInput} />
            <TextInput underlineColorAndroid={'transparent'}
              placeholder={'Status'}
              style={styles.textInput} />
          </View>
          <View style={styles.viewItem}>
            <View style={{flexDirection: 'row', margin: 5}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginRight: 10}}>
                <Text>SALE PRICE</Text>
                <Text style={styles.text}>{this.state.salePrice}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                <Text>SALE TOTAL</Text>
                <Text style={styles.num}>{this.state.saleTotal}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', margin: 5}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginRight: 10}}>
                <Text>FEES</Text>
                <Text style={styles.text}>235.00</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                <Text>DOWN PAYMENT</Text>
                <Text style={styles.num}>35.00</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', margin: 5}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginRight: 10}}>
                <Text>TAXES</Text>
                <Text style={styles.text}>75.00</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                <Text>REFOUND</Text>
                <Text style={styles.num}>0.00</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', margin: 5}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginRight: 10}}>
                <Text>TRADE-IN</Text>
                <Text style={styles.text}>0.00</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}} />
            </View>
            <View style={{flexDirection: 'row', margin: 5}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginRight: 10}}>
                <Text>AFTER MARKET</Text>
                <Text style={styles.text}>0.00</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                <Text>DUE BALANCE</Text>
                <Text style={styles.num}>200.00</Text>
              </View>
            </View>
          </View>
          {/* <View style={styles.viewItem}> */}
          {/* <Text style={styles.textInfo}>Add Deal Payment</Text> */}
          {/* <Picker */}
          {/* selectedValue={this.state.make} */}
          {/* onValueChange={(make) => this.handleValueChange(make)} */}
          {/* prompt='Choose your car' */}
          {/* style={Platform.OS === 'ios' ? styles.picker : styles.pickerAndroid} */}
          {/* textStyle={Platform.OS === 'ios' && styles.pickerText} */}
          {/* cancel */}
          {/* > */}
          {/* {make.map((item, index) => ( */}
          {/* <Picker.Item key={index} label={item.label} value={item.value} /> */}
          {/* ))} */}
          {/* </Picker> */}
          {/* </View> */}
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
    single: state.deal.single
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDealCrmScreen)
