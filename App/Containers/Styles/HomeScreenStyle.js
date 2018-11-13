import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  allView: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  background: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    position: 'absolute',
    resizeMode: 'cover'
  },
  header: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight / 3,
    position: 'absolute',
    resizeMode: 'cover'
  },
  view: {
    padding: 20,
    paddingRight: 10
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingTop: 10,
    paddingRight: 10
  },
  textHeader: {
    fontWeight: 'bold',
    fontFamily: Fonts.type.bold,
    color: '#ffffff',
    fontSize: Fonts.size.h6
  },
  iconHeader: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  viewText: {
    width: Metrics.screenWidth - 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  countNoti: {
    position: 'absolute',
    top: 0,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#ffffff'
  },
  textCount: {
    fontWeight: 'bold',
    fontFamily: Fonts.type.bold,
    color: '#0071c1'
  },
  viewSearch: {
    backgroundColor: '#ffffff',
    marginVertical: 20,
    height: 40,
    marginRight: 10,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconSearch: {
    marginHorizontal: 20,
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  textInputSearch: {
    fontFamily: Fonts.type.base,
    flex: 1,
    marginRight: 20
  },
  viewMenu: {
    width: Metrics.screenWidth / 2 - 25,
    height: (Metrics.screenWidth / 2 - 25) * 2 / 3,
    flexDirection: 'row',
    shadowColor: '#b9b9b9',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#b9b9b9'
  },
  iconMenu: {
    resizeMode: 'contain',
    height: (Metrics.screenWidth / 2 - 25) * 2 / 3 / 3 - 10
  },
  viewIconMenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewTextMenu: {
    flex: 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textNumMenu: {
    fontWeight: 'bold',
    fontFamily: Fonts.type.bold,
    fontSize: Platform.OS === 'ios' ? Fonts.size.h1 : Fonts.size.h4,
    color: '#000000',
    marginBottom: 10
  },
  textMenu: {
    fontWeight: 'bold',
    fontFamily: Fonts.type.bold,
    fontSize: Platform.OS === 'ios' ? Fonts.size.input : Fonts.size.medium,
    color: '#000000'
  }
})
