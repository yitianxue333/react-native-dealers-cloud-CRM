import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, TouchableOpacity, TextInput, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Picker } from 'react-native-picker-dropdown'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/FilterVehiclesScreenStyle'
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
class FilterVehiclesScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '8238742838238723218821',
      make: '',
      year: '2011',
      stock: '123456711'
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
            <Text style={[styles.text, {marginTop: 0}]}>STOCK NUMBER</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={this.state.stock}
              onChangeText={(stock) => this.setState({stock})}
              style={styles.textInput} />
            <Text style={styles.text}>VIN</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={this.state.text}
              onChangeText={(text) => this.setState({text})}
              style={styles.textInput} />
            <Text style={styles.text}>MODEL YEAR</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={this.state.year}
              onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>MAKE</Text>
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
            <Text style={styles.text}>MODEL</Text>
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
            <Text style={styles.text}>TITLE</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterVehiclesScreen)
