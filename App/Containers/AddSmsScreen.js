import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, TouchableOpacity, TextInput } from 'react-native'
import CustomNavBar from '../Components/CustomNavBar'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddSmsScreenStyle'
const background = require('../Images/AddDeal/background.png')

class AddSmsScreen extends Component {
  render () {
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background} />
        <CustomNavBar
          title={'SMS'} />
        <KeyboardAwareScrollView style={styles.container}>
          <TextInput
            multiline
          />
        </KeyboardAwareScrollView>
        <TouchableOpacity
          // onPress={() => this.onSave()}
          style={styles.buttonSave}>
          <Text style={styles.textButton}>SEND</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AddSmsScreen)
