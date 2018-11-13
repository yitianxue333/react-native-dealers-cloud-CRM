import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { RadioButtons } from 'react-native-radio-buttons'
import { View, Text, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/CustomTabBarStyle'
import { Fonts } from '../Themes'
import { Actions, ActionConst } from 'react-native-router-flux'
const iconBack = require('../Images/AddDeal/ic_back.png')
const navBarBackground = require('../Images/AddDeal/navigation_background.png')
const iconFilter = require('../Images/AddDeal/ic_filter.png')
export default class CustomTabBar extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedOption: this.props.options[0]
    }
  }
  renderBasic () {
    function setSelectedOption (selectedOption) {
      this.setState({
        selectedOption
      })
      this.props.selected(selectedOption)
    }

    function renderOption (option, selected, onSelect, index) {
      const borderWidth = selected ? 4 : 0
      const style = selected ? {marginBottom: 6,
        color: '#000000',
        fontFamily: Fonts.type.medium,
        fontSize: Fonts.size.medium}
        : {marginBottom: 10,
          color: '#adadad',
          fontFamily: Fonts.type.medium,
          fontSize: Fonts.size.medium}
      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <View style={{ flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: borderWidth,
            borderBottomColor: '#225bc4'}}>
            <Text style={style}>{option}</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }

    function renderContainer (optionNodes) {
      return <View style={{flexDirection: 'row'}}>{optionNodes}</View>
    }

    return (
      <View style={{paddingTop: 10,
        backgroundColor: 'white',
        marginBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#4c4c4c'}}>
        <RadioButtons
          options={this.props.options}
          onSelection={setSelectedOption.bind(this)}
          selectedOption={this.state.selectedOption}
          renderOption={renderOption}
          renderContainer={renderContainer}
        />
      </View>)
  }
  render () {
    return (
      <View style={styles.container}>
        <Image
          style={styles.navBarBackground}
          source={navBarBackground} />
        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={() => Actions.pop}
          >
            <Image style={styles.iconNavBar} source={iconBack} />
          </TouchableOpacity>
          <View style={styles.viewTitle}>
            <Text style={styles.title}>
              {this.props.title}
            </Text>
          </View>
          {this.state.selectedOption === 'DEALS' && <TouchableOpacity onPress={() => Actions.filterVehiclesScreen()}>
            <Image style={styles.iconNavBar} source={iconFilter} />
          </TouchableOpacity>}
          {this.state.selectedOption === 'ADD VEHICLE' && <TouchableOpacity
            onPress={() => Actions.vehicles()}
            style={styles.rightNav}>
            <Text style={styles.rightNavText}>Add Manual</Text>
          </TouchableOpacity>}
        </View>
      </View>
    )
  }
}
