import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TextInput, Image } from 'react-native'
import styles from './Styles/CustomTextInputStyle'

export default class CustomTextInput extends Component {
  focus () {
    this.refs.textInput.focus()
  }
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <View style={styles.container}>
        {this.props.text !== '' ? <Text style={styles.label}>{this.props.label}</Text> : <View style={{height: 20}}/>}
        <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: '#e1e1e1'}}>
          <TextInput
            style={styles.textInput}
            ref='textInput'
            value={this.props.text}
            placeholder={this.props.label}
            underlineColorAndroid={'transparent'}
            {...this.props}
        />
          <View style={{flex: 1, marginBottom: 5}}>
            <Image style={{resizeMode: 'contain', width: 20, height: 20}} source={this.props.source} />
          </View>
        </View>
      </View>
    )
  }
}
