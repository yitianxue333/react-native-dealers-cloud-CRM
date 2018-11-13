import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, TouchableOpacity, TextInput, Platform } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Picker } from 'react-native-picker-dropdown'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// Styles
import styles from './Styles/FilterPurchaseScreenStyle'
import { Actions } from 'react-native-router-flux'
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
class FilterPurchaseScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      make: ''
    }
  }
  handleValueChange (make) {
    this.setState({ make })
  }
  render () {
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background} />
        <KeyboardAwareScrollView style={styles.container}>
          <View style={[styles.viewItem, {marginTop: 20}]}>
            <Text style={[styles.text, {marginTop: 0}]}>DATE</Text>
            <TextInput underlineColorAndroid={'transparent'}
                // value={this.state.stock}
                // onChangeText={(stock) => this.setState({stock})}
              style={styles.textInput} />
            <Text style={styles.text}>CUSTOMER</Text>
            <TextInput underlineColorAndroid={'transparent'}
                // value={this.state.stock}
                // onChangeText={(stock) => this.setState({stock})}
              style={styles.textInput} />
            <Text style={styles.text}>EMPLOYEE</Text>
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
            <Text style={styles.text}>LIEN HOLDER</Text>
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
            <Text style={styles.text}>LEAD SOURCE</Text>
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
            <Text style={styles.text}>DEAL TYPE</Text>
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
            <Text style={styles.text}>DEAL STATUS</Text>
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
            <Text style={styles.text}>SOLD AT</Text>
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
          <View style={{height: 100}} />
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterPurchaseScreen)
