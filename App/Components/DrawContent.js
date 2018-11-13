import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import styles from './Styles/DrawContentStyle'
import { connect } from 'react-redux'
import InventoryActions from '../Redux/InventoryRedux'
const iconHome = require('../Images/Menu/ic_home.png')
const iconProfile = require('../Images/Menu/ic_profile.png')
const iconSetting = require('../Images/Menu/ic_settings.png')
const iconTerm = require('../Images/Menu/ic_terms.png')
const iconSupport = require('../Images/Menu/ic_support.png')
const iconLogout = require('../Images/Menu/ic_logout.png')
const iconClose = require('../Images/Menu/ic_close.png')
const background = require('../Images/Menu/background.png')
class DrawContent extends Component {

  render () {
    return (
      <View style={styles.container}>
        <Image source={background} style={styles.background} />
        <View style={{flex: 1, margin: 20, marginLeft: 10}}>
          <TouchableOpacity
            onPress={() => Actions.drawerClose()}
            style={styles.viewClose}>
            <Image style={styles.imageMenu}
              source={iconClose}
          />
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewMenu}>
            <Image
              style={styles.imageMenu}
              source={iconHome}
          />
            <Text style={styles.textMenu}>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewMenu}>
            <Image
              style={styles.imageMenu}
              source={iconProfile}
          />
            <Text style={styles.textMenu}>PROFILE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.choice(0)
              Actions.addVehicleManual()
            }}
            style={styles.viewMenu}>
            <Icon name='ios-car-outline' size={25} color={'#000000'} style={{marginRight: 20}} />
            <Text style={styles.textMenu}>ADD VEHICLE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewMenu}>
            <Image
              style={styles.imageMenu}
              source={iconSetting}
          />
            <Text style={styles.textMenu}>SETTINGS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewMenu}>
            <Image
              style={styles.imageMenu}
              source={iconTerm}
          />
            <Text style={styles.textMenu}>TERMS OF USE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewMenu}>
            <Image
              style={styles.imageMenu}
              source={iconSupport}
          />
            <Text style={styles.textMenu}>CUSTOMER SUPPORT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewMenu}>
            <Image
              style={styles.imageMenu}
              source={iconLogout}
          />
            <Text style={styles.textMenu}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    vehicles: state.inventory.vehicles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    choice: (id) => dispatch(InventoryActions.choice(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawContent)
