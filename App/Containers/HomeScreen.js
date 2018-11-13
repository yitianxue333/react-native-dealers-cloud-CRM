import React, { Component } from 'react'
import { Text, KeyboardAvoidingView, View, Image, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeScreenStyle'
const background = require('../Images/Login/background.png')
const header = require('../Images/Home/headerHome.png')
const iconInventory = require('../Images/Home/ic_inventory.png')
const iconSales = require('../Images/Home/ic_sale.png')
const iconFinancial = require('../Images/Home/ic_financial.png')
const iconReport = require('../Images/Home/ic_report.png')
const iconMarketing = require('../Images/Home/ic_maketing.png')
const iconMenu = require('../Images/Home/ic_menu.png')
const iconNoti = require('../Images/Home/ic_noti.png')
class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      countNoti: 4
    }
  }
  componentDidMount () {
    // this.props.getVehicles()
    // this.props.getMake()
    // this.props.getColor()
  }
  render () {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
          <View style={styles.allView}>
            <Image
              style={styles.background}
              source={background} />
            <Image
              style={styles.header}
              source={header}
          />
            <View style={styles.view}>
              <View style={styles.navBar}>
                <TouchableOpacity
                  onPress={() => Actions.drawerOpen()}
                >
                  <Image
                    style={styles.iconHeader}
                    source={iconMenu} />
                </TouchableOpacity>
                <View style={styles.viewText}>
                  <Text style={styles.textHeader}>DEALER CLOUD</Text>
                </View>
                <TouchableOpacity>
                  <Image
                    style={styles.iconHeader}
                    source={iconNoti} />
                </TouchableOpacity>
                {this.state.countNoti !== 0 && <View style={styles.countNoti}>
                  <Text style={styles.textCount}>{this.state.countNoti}</Text>
                </View>}
              </View>
              {/* <View style={styles.viewSearch}> */}
              {/* <Image */}
              {/* style={styles.iconSearch} */}
              {/* source={iconSearch} /> */}
              {/* <TextInput */}
              {/* style={styles.textInputSearch} */}
              {/* placeholder={'Search'} */}
              {/* placeholderTextColor={'#777777'} */}
              {/* underlineColorAndroid={'transparent'} */}
              {/* /> */}
              {/* </View> */}
              <View style={{marginTop: Platform.OS === 'ios' ? 120 : 100, flexDirection: 'row', marginBottom: 15}}>
                <TouchableOpacity
                  onPress={() => {
                    Actions.inventoryScreen()
                  }}
                  style={[styles.viewMenu, {marginRight: 15}]}>
                  <View style={[styles.viewIconMenu, {backgroundColor: '#450094'}]}>
                    <Image style={styles.iconMenu}
                      source={iconInventory} />
                  </View>
                  <View style={styles.viewTextMenu}>
                    <Text style={styles.textNumMenu}>30</Text>
                    <Text style={styles.textMenu}>INVENTORY</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Actions.salesScreen()}
                  style={[styles.viewMenu]}>
                  <View style={[styles.viewIconMenu, {backgroundColor: '#770092'}]}>
                    <Image style={styles.iconMenu}
                      source={iconSales} />
                  </View>
                  <View style={styles.viewTextMenu}>
                    <Text style={styles.textNumMenu}>19</Text>
                    <Text style={styles.textMenu}>SALES</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 15}}>
                <TouchableOpacity style={[styles.viewMenu, {marginRight: 15}]}>
                  <View style={[styles.viewIconMenu, {backgroundColor: '#ff5842'}]}>
                    <Image style={styles.iconMenu}
                      source={iconFinancial} />
                  </View>
                  <View style={styles.viewTextMenu}>
                    <Text style={styles.textNumMenu}>13</Text>
                    <Text style={styles.textMenu}>FINANCIAL</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.viewMenu]}>
                  <View style={[styles.viewIconMenu, {backgroundColor: '#00c878'}]}>
                    <Image style={styles.iconMenu}
                      source={iconReport} />
                  </View>
                  <View style={styles.viewTextMenu}>
                    <Text style={styles.textNumMenu}>7</Text>
                    <Text style={styles.textMenu}>REPORT</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => Actions.marketingScreen()}
                  style={[styles.viewMenu, {marginRight: 15}]}>
                  <View style={[styles.viewIconMenu, {backgroundColor: '#ff0052'}]}>
                    <Image style={styles.iconMenu}
                      source={iconMarketing} />
                  </View>
                  <View style={styles.viewTextMenu}>
                    <Text style={styles.textNumMenu}>11</Text>
                    <Text style={styles.textMenu}>MARKETING</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
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
    // getVehicles: bindActionCreators(InventoryActions.getVehicles, dispatch),
    // getMake: bindActionCreators(InventoryPickerActions.getMake, dispatch),
    // getColor: bindActionCreators(InventoryPickerActions.getColor, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
