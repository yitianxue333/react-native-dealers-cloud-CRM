import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import CustomNavBar from '../Components/CustomNavBar'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import ManageVehiclesScreen from './ManageVehiclesScreen'
import AddVehicleScreen from './AddVehicleScreen'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/InventoryScreenStyle'
import { Fonts } from '../Themes'
import { Actions } from 'react-native-router-flux'
import InventoryActions from '../Redux/InventoryRedux'

class InventoryScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  rightButton () {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.choice(0)
          Actions.addVehicleManual()
        }}
        style={styles.rightNav}>
        <Text style={styles.rightNavText}>Add Manual</Text>
      </TouchableOpacity>
    )
  }
  render () {
    return (
      <View style={styles.container}>
        <CustomNavBar
          rightButton={() => this.rightButton()}
          title={'Inventory'} />
        <ScrollableTabView
          renderTabBar={() =>
            <DefaultTabBar
              backgroundColor={'white'}
              activeTextColor={'#000000'}
              inactiveTextColor={'#adadad'}
              textStyle={{fontWeight: 'normal',
                fontFamily: Fonts.type.medium,
                fontSize: Fonts.size.medium}}
              underlineStyle={{backgroundColor: '#225bc4'}}
              tabStyle={{paddingBottom: 0}}
            />
          }>
          <ManageVehiclesScreen tabLabel='MANAGE VEHICLES' />
          <AddVehicleScreen tabLabel='ADD VEHICLE' />
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  choice: (id) => dispatch(InventoryActions.choice(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(InventoryScreen)
