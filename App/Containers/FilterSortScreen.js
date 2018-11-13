import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Picker } from 'react-native-picker-dropdown'
// Styles
import styles from './Styles/FilterSortScreenStyle'
import { Actions } from 'react-native-router-flux'
const background = require('../Images/AddDeal/background.png')
const make = [
  {'label': 'Not Set', 'value': 'NotSet'},
  {'label': '10', 'value': '10'},
  {'label': '25', 'value': '25'},
  {'label': '50', 'value': '50'},
  {'label': '100', 'value': '100'},
  {'label': 'All', 'value': 'All'}
]
class FilterSortScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      make: '50'
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
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView behavior='position'>
            <View style={[styles.viewItem, {marginTop: 20}]}>
              <Text style={[styles.text, {marginTop: 0}]}>PAGE SIZE</Text>
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
          </KeyboardAvoidingView>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterSortScreen)
