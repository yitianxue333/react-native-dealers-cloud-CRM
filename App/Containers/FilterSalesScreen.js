import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import CustomNavBar from '../Components/CustomNavBar'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import FilterVehiclesScreen from './FilterVehiclesScreen'
import FilterPurchaseScreen from './FilterPurchaseScreen'
import FilterSortScreen from './FilterSortScreen'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/FilterSalesScreenStyle'
import { Fonts } from '../Themes'

class FilterSalesScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <CustomNavBar
          title={'Filters'} />
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

          <FilterVehiclesScreen tabLabel='VEHICLES' />
          <FilterPurchaseScreen tabLabel='PURCHASE' />
          <FilterSortScreen tabLabel='OTHER' />
        </ScrollableTabView>
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterSalesScreen)
