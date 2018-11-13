import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import CustomNavBar from '../Components/CustomNavBar'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Moment from 'moment'
import Api from '../Services/Api'
import { Actions } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddNoteScreenStyle'
import { bindActionCreators } from 'redux'
import MarketingActions from '../Redux/MarketingRedux'
const background = require('../Images/AddDeal/background.png')
const api = Api.create()
class AddNoteScreen extends Component {
  constructor (props) {
    super(props)
    console.log(Moment().format('MM/DD/YYYY hh:mm a'))
    const { item, lead } = this.props
    if (item !== undefined) {
      this.state = {
        item: item.merge({DateAdded: item.TaskDate})
      }
    } else {
      this.state = {
        item: {
          'TaskID': Math.floor((Math.random() * 100000) + 800000),
          'CustomerID': lead.CustomerID,
          'TaskDate': Moment().format('YYYY-MM-DDTHH:mm:ss.SS'),
          'TaskDateText': Moment().format('MM/DD/YYYY hh:mm A'),
          'TaskDateLongText': Moment().format('llll'),
          'DateAdded': Moment().format('YYYY-MM-DDTHH:mm:ss.SS'),
          'Memo': null,
          'UserID': 844197,
          'TaskName': '',
          'Description': '',
          'TaskStatusID': 0,
          'TaskPriorityTypeID': 0,
          'TaskCategoryID': 12,
          'BusinessName': lead.CustomerName,
          'InteractionName': null,
          'CustomerName': 'DC  Test',
          'ToDateTime': null,
          'ToDateTimeText': Moment().format('MM/DD/YYYY hh:mm A'),
          'ToDateTimeTextTime': '',
          'Location': null,
          'AttendeeID': null,
          'AttendeeName': null,
          'TaskCategoryName': 'Note'
        }
      }
    }
  }
  async onSave () {
    const { token } = this.props
    const { item } = this.state
    api.setToken(token)
    const response = await api.saveUserTask(item)
    __DEV__ && console.log('save', response)
    if (response.ok) {
      Actions.pop()
    }
  }
  render () {
    const { item } = this.state
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background} />
        <CustomNavBar
          title={'NOTE '} />
        <KeyboardAwareScrollView style={styles.container}>
          <TextInput
            multiline
            value={item.Description}
            onChangeText={(Description) => this.setState({item: {...item, ...{Description, TaskName: Description}}})}
          />
        </KeyboardAwareScrollView>
        <TouchableOpacity
          onPress={() => this.onSave()}
          style={styles.buttonSave}>
          <Text style={styles.textButton}>SAVE</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(MarketingActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNoteScreen)
