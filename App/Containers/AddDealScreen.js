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
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddDealScreenStyle'
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
class AddDealScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      make: 'Cash'
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
              style={styles.textInput} />
            <TextInput underlineColorAndroid={'transparent'}
              placeholder={'VIN'}
              style={styles.textInput} />
            <TextInput underlineColorAndroid={'transparent'}
              placeholder={'COLOR'}
              style={styles.textInput} />
            <TextInput underlineColorAndroid={'transparent'}
              placeholder={'Curb.Weight'}
              style={styles.textInput} />
            <TextInput underlineColorAndroid={'transparent'}
              placeholder={'Mileage'}
              style={styles.textInput} />
            <TextInput underlineColorAndroid={'transparent'}
              placeholder={'Status'}
              style={styles.textInput} />
          </View>
          <View style={styles.viewItem}>
            <View style={{flexDirection: 'row', margin: 5}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginRight: 10}}>
                <Text>SALE PRICE</Text>
                <Text style={styles.text}>0.00</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                <Text>SALE TOTAL</Text>
                <Text style={styles.num}>0.00</Text>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDealScreen)
