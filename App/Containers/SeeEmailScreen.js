import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image } from 'react-native'
import { connect } from 'react-redux'
import CustomNavBar from '../Components/CustomNavBar'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SeeEmailScreenStyle'
const background = require('../Images/AddDeal/background.png')
class SeeEmailScreen extends Component {
  constructor (props) {
    super(props)
    const { item, leadDTO } = this.props
    this.state = {
      item, leadDTO
    }
  }
  render () {
    const { item, leadDTO } = this.state
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background} />
        <CustomNavBar
          title={'EMAIL'} />
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView behavior='position'>
            <View style={{marginHorizontal: 10, marginBottom: 10}}>
              <Text>From: {leadDTO.EmailAddress}</Text>
              <Text>Date: {item.TaskDateText}</Text>
              <Text>Subject: {item.TaskName}</Text>
              <Text>{item.Description}</Text>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SeeEmailScreen)
