import React from 'react'
import { Router, Stack, Scene, Drawer, Lightbox, Overlay, Reducer } from 'react-native-router-flux'
// import { View, TouchableOpacity } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome'
// import LaunchScreen from '../Containers/LaunchScreen'
// import styles from './Styles/NavigationStyles'
import { Colors, Metrics } from '../Themes'
// import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import HomeScreen from '../Containers/HomeScreen'
import DrawContent from '../Components/DrawContent'
import DealsScreen from '../Containers/DealsScreen'
import styles from './Styles/NavigationStyles'
import AddDealScreen from '../Containers/AddDealScreen'
import CustomTabBar from '../Components/CustomTabBar'
import ManageVehiclesScreen from '../Containers/ManageVehiclesScreen'
import AddVehicleScreen from '../Containers/AddVehicleScreen'
import BasicInfoScreen from '../Containers/BasicInfoScreen'
import SpecificationScreen from '../Containers/SpecificationScreen'
import ImagesScreen from '../Containers/ImagesScreen'
import MarketingScreen from '../Containers/MarketingScreen'
import VehiclesScreen from '../Containers/VehiclesScreen'
import ScanVinScreen from '../Containers/ScanVinScreen'
import PricingScreen from '../Containers/PricingScreen'
import PurchaseInformationScreen from '../Containers/PurchaseInformationScreen'
import OptionsScreen from '../Containers/OptionsScreen'
import FlagsScreen from '../Containers/FlagsScreen'
import FilterVehiclesScreen from '../Containers/FilterVehiclesScreen'
import FilterPurchaseScreen from '../Containers/FilterPurchaseScreen'
import FaqScreenStyles from '../../ignite/DevScreens/Styles/FaqScreenStyles'
import FilterSortScreen from '../Containers/FilterSortScreen'
import MarketingVehiclesScreen from '../Containers/MarketingVehiclesScreen'
import MarketingPurchaseScreen from '../Containers/MarketingPurchaseScreen'
import MarketingSortScreen from '../Containers/MarketingSortScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import InventoryScreen from '../Containers/InventoryScreen'
import CustomNavBar from '../Components/CustomNavBar'
import AddVehicleManualScreen from '../Containers/AddVehicleManualScreen'
import SalesScreen from '../Containers/SalesScreen'
import FilterSalesScreen from '../Containers/FilterSalesScreen'
import FilterMarketingScreen from '../Containers/FilterMarketingScreen'
import MarketingSeenScreen from '../Containers/MarketingSeenScreen'
import AddAppointmentScreen from '../Containers/AddAppointmentScreen'
import AddMailScreen from '../Containers/AddMailScreen'
import AddNoteScreen from '../Containers/AddNoteScreen'
import AddReminderScreen from '../Containers/AddReminderScreen'
import AddSmsScreen from '../Containers/AddSmsScreen'
import TradeInScreen from '../Containers/TradeInScreen'
import CreditApplicationScreen from '../Containers/CreditApplicationScreen'
import EditDealScreen from '../Containers/EditDealScreen'
import LeadDetailScreen from '../Containers/LeadDetailScreen'
import SeeEmailScreen from '../Containers/SeeEmailScreen'
import AddDealCrmScreen from '../Containers/AddDealCrmScreen'
// const reducerCreate = params => {
//   const defaultReducer = new Reducer(params)
//   return (state, action) => {
//     console.log('ACTION:', action)
//     return defaultReducer(state, action)
//   }
// }
var loadData
const getSceneStyle = () => ({
  shadowOpacity: 1,
  shadowRadius: 3
})
const renderDefault = {
  rightTitle: ' ',
  onRight: () => null,
  leftTitle: ' ',
  onLeft: () => null
}
const reducerCreate = params => {
  const defaultReducer = new Reducer(params)
  return (state, action) => {
    __DEV__ && console.log('ACTION:', action)
    return defaultReducer(state, action)
  }
}
// Manifest of possible screens
const options = [
  'DEALS',
  'ADD DEAL'
]
const optionsInventory = [
  'MANAGE VEHICLES',
  'ADD VEHICLE'
]
const vihecles = [
  'VEHICLES',
  'SPECIFICATION',
  'IMAGES'
]
const filters = [
  'VEHICLES',
  'PURCHASE',
  'OTHER'
]
const marketing = [
  'VEHICLES',
  'PURCHASE',
  'SORT'
]
const AppNavigation = () => (
  <Router
    // createReducer={reducerCreate}
    tintColor={Colors.tint} getSceneStyle={getSceneStyle} panHandlers={null}>
    <Overlay>
      <Lightbox leftButtonTextStyle={{ color: Colors.tint }}>
        <Stack
          hideNavBar
          key='root'
          titleStyle={{ alignSelf: 'center' }}>
          <Scene key='launchScreen' component={LaunchScreen} title='LaunchScreen' initial />
          <Scene key='loginScreen' component={LoginScreen} title='LoginScreen' />
          <Drawer
            hideNavBar
            hideDrawerButton
            key='drawer'
            contentComponent={DrawContent}
            drawerWidth={Metrics.screenWidth * 0.75}>
            <Scene key='homeScreen' component={HomeScreen} title='HomeScreen' hideNavBar />
          </Drawer>
          <Scene key='salesScreen' component={SalesScreen} title='SalesScreen' />
          <Scene key='filterSalesScreen' component={FilterSalesScreen} title='FilterSalesScreen' />
          <Scene key='inventoryScreen' component={InventoryScreen} title='Inventory' hideNavBar />
          <Scene key='addVehicleManual' component={AddVehicleManualScreen} title='AddVehicleManual' hideNavBar />
          <Scene key='basicInfoScreen' component={BasicInfoScreen} title='BasicInfoScreen' hideNavBar />
          <Scene key='pricingScreen' component={PricingScreen} title='PricingScreen' hideNavBar />
          <Scene key='purchaseInformationScreen' component={PurchaseInformationScreen} title='PurchaseInformationScreen' hideNavBar />
          <Scene key='optionsScreen' component={OptionsScreen} title='OptionsScreen' hideNavBar />
          <Scene key='flagsScreen' component={FlagsScreen} title='FlagsScreen' hideNavBar />
          <Scene key='filterMarketingScreen' component={MarketingSortScreen} title='FilterMarketingScreen' hideNavBar />
          <Scene key='marketingScreen' component={MarketingScreen} title='MarketingScreen' hideNavBar />
          <Scene key='scanVinScreen' component={ScanVinScreen} title='ScanVinScreen' hideNavBar />
          <Scene key='addAppointmentScreen' component={AddAppointmentScreen} title='AddAppointmentScreen' hideNavBar />
          <Scene key='addMailScreen' component={AddMailScreen} title='AddMailScreen' hideNavBar />
          <Scene key='addNoteScreen' component={AddNoteScreen} title='AddNoteScreen' hideNavBar />
          <Scene key='addReminderScreen' component={AddReminderScreen} title='AddReminderScreen' hideNavBar />
          <Scene key='addSmsScreen' component={AddSmsScreen} title='AddSmsScreen' hideNavBar />
          <Scene key='marketingSeenScreen' component={MarketingSeenScreen} title='MarketingSeenScreen' hideNavBar />
          <Scene key='tradeInScreen' component={TradeInScreen} title='TradeInScreen' hideNavBar />
          <Scene key='creditApplicationScreen' component={CreditApplicationScreen} title='CreditApplicationScreen' hideNavBar />
          <Scene key='editDealScreen' component={EditDealScreen} title='EditDealScreen' hideNavBar />
          <Scene key='addDealCrmScreen' component={AddDealCrmScreen} title='AddDealCrmScreen' hideNavBar />
          <Scene key='leadDetailScreen' component={LeadDetailScreen} title='LeadDetailScreen' hideNavBar />
          <Scene key='seeEmailScreen' component={SeeEmailScreen} title='SeeEmailScreen' hideNavBar />
        </Stack>
      </Lightbox>
    </Overlay>
  </Router>
)

export default AppNavigation
