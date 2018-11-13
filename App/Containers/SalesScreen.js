import React, { Component } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import CustomNavBar from '../Components/CustomNavBar'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import DealsScreen from './DealsScreen'
import AddDealScreen from './AddDealScreen'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SalesScreenStyle'
import { Fonts } from '../Themes'
import { Actions } from 'react-native-router-flux'

const iconFilter = require('../Images/AddDeal/ic_filter.png')

class SalesScreen extends Component {
  rightButton () {
    return (
      <TouchableOpacity
        onPress={() => Actions.filterSalesScreen()}
        style={styles.rightNav}
      >
        <Image
          style={styles.iconNavBar}
          source={iconFilter}
        />
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <CustomNavBar
          rightButton={() => this.rightButton()}
          title={'Sales'}
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
          <DealsScreen
            tabLabel='DEALS'
          />
          <AddDealScreen
            tabLabel='ADD DEAL'
          />
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesScreen)
