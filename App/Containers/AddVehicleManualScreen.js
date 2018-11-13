import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import CustomNavBar from '../Components/CustomNavBar'
import VehiclesScreen from './VehiclesScreen'
import SpecificationScreen from './SpecificationScreen'
import ImagesScreen from './ImagesScreen'
// Styles
import styles from './Styles/AddVehicleManualScreenStyle'
import { Fonts } from '../Themes'

class AddVehicleManualScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <CustomNavBar
          title={'Add Vehicle Manual'}
        />
        <ScrollableTabView
          renderTabBar={() =>
            <DefaultTabBar
              backgroundColor={'white'}
              activeTextColor={'#000000'}
              inactiveTextColor={'#adadad'}
              textStyle={{
                fontWeight: 'normal',
                fontFamily: Fonts.type.medium,
                fontSize: Fonts.size.medium
              }}
              underlineStyle={{backgroundColor: '#225bc4'}}
              tabStyle={{paddingBottom: 0}}
            />
          }>
          <VehiclesScreen
            tabLabel='VEHICLES'
          />
          <SpecificationScreen
            tabLabel='SPECIFICATION'
          />
          <ImagesScreen
            tabLabel='IMAGES'
          />
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AddVehicleManualScreen)
