import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import CustomNavBar from '../Components/CustomNavBar'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddMailScreenStyle'
const background = require('../Images/AddDeal/background.png')
class AddMailScreen extends Component {
  render () {
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background} />
        <CustomNavBar
          title={'EMAIL'} />
        <KeyboardAwareScrollView style={styles.container}>
          <View style={{marginHorizontal: 10, marginBottom: 10}}>
            <Text style={styles.text}>TO</Text>
            <TextInput underlineColorAndroid={'transparent'}
            // value={this.state.year}
            // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>CC</Text>
            <TextInput underlineColorAndroid={'transparent'}
            // value={this.state.year}
            // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>BCC</Text>
            <TextInput underlineColorAndroid={'transparent'}
            // value={this.state.year}
            // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>SUBJECT</Text>
            <TextInput underlineColorAndroid={'transparent'}
            // value={this.state.year}
            // onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
          </View>
          <TextInput
            multiline
          />
        </KeyboardAwareScrollView>
        <TouchableOpacity
          // onPress={() => this.onSave()}
          style={styles.buttonSave}>
          <Text style={styles.textButton}>SEND EMAIL</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddMailScreen)
