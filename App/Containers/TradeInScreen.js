import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, TouchableOpacity, TextInput } from 'react-native'
import CustomNavBar from '../Components/CustomNavBar'
import { connect } from 'react-redux'
import CheckBox from 'react-native-icon-checkbox'
import { Dropdown } from 'react-native-material-dropdown'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TradeInScreenStyle'
const background = require('../Images/AddDeal/background.png')

class TradeInScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isNew: false
    }
  }
  handlePressCheckedBoxNew = () => {
    this.setState({
      isNew: true
    })
  }
  render () {
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background} />
        <CustomNavBar
          title={'Trade Appraisal'} />
        <KeyboardAwareScrollView style={styles.container}>
          <View style={{marginHorizontal: 10, marginBottom: 10}}>
            <Text style={styles.text}>YEAR</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>MAKE</Text>
            <Dropdown
              onChangeText={(model) => this.setState({model})}
              // data={this.state.models}
              // value={this.state.model}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>MODEL</Text>
            <Dropdown
              onChangeText={(model) => this.setState({model})}
              // data={this.state.models}
              // value={this.state.model}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>MILEAGE</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>MILEAGE STATUS</Text>
            <Dropdown
              onChangeText={(model) => this.setState({model})}
              // data={this.state.models}
              // value={this.state.model}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>FEATURES</Text>
            <TextInput
              multiline
            />
            <Text style={styles.text}>COLOR</Text>
            <Dropdown
              onChangeText={(model) => this.setState({model})}
              // data={this.state.models}
              // value={this.state.model}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>VIN</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>OWNER NO</Text>
            <TextInput underlineColorAndroid={'transparent'}
              // value={this.state.year}
              // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>CONDITION</Text>
            <Dropdown
              onChangeText={(model) => this.setState({model})}
              // data={this.state.models}
              // value={this.state.model}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>HISTORY</Text>
            <TextInput
              multiline
            />
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <CheckBox
                label={'Previous Paint Work'}
                labelStyle={styles.label}
                style={{marginRight: 10}}
                checked={!this.state.isNew}
                onPress={this.handlePressCheckedBoxNew}
                color={'#00c848'}
              />
              <CheckBox
                label={'Previous Body Work'}
                labelStyle={styles.label}
                checked={this.state.isNew}
                onPress={this.handlePressCheckedBoxNew}
                color={'#00c848'}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <CheckBox
                label={'Needs Paint Work'}
                labelStyle={styles.label}
                style={{marginRight: 10}}
                checked={!this.state.isNew}
                onPress={this.handlePressCheckedBoxNew}
                color={'#00c848'}
              />
              <CheckBox
                label={'Needs Body Work'}
                labelStyle={styles.label}
                checked={this.state.isNew}
                onPress={this.handlePressCheckedBoxNew}
                color={'#00c848'}
              />
            </View>
            <Text style={styles.text}>COMMENTS</Text>
            <TextInput
              multiline
            />
          </View>
          <View style={{height: 100}} />
        </KeyboardAwareScrollView>
        <TouchableOpacity
          // onPress={() => this.onSave()}
          style={styles.buttonSave}>
          <Text style={styles.textButton}>SAVE</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(TradeInScreen)
