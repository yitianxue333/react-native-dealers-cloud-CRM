import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/CustomNavBarStyle'
import { Actions } from 'react-native-router-flux'
const iconBack = require('../Images/AddDeal/ic_back.png')
const navBarBackground = require('../Images/AddDeal/navigation_background.png')
// const iconFilter = require('../Images/AddDeal/ic_filter.png')
export default class CustomNavBar extends Component {
  // Prop type warnings
  static propTypes = {
    rightButton: PropTypes.func
  }

  // Defaults for props.
  static defaultProps = {
    rightButton: () => <View />
  }
  render () {
    const { onBackPress } = this.props
    return (
      <View style={styles.container}>
        <Image style={styles.navBarBackground} source={navBarBackground} />
        <View style={styles.navBar}>
          {onBackPress ? (
            <TouchableOpacity
              onPress={() => {
                Actions.pop()
                onBackPress()
              }}>
              <Image style={styles.iconNavBar} source={iconBack} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                Actions.pop()
              }}>
              <Image style={styles.iconNavBar} source={iconBack} />
            </TouchableOpacity>
          )}
          <View style={styles.viewTitle}>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
        </View>
        {this.props.rightButton()}
      </View>
    )
  }
}
