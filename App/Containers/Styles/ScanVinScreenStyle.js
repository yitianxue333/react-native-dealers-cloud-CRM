import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  navBarBackground: {
    width: Metrics.screenWidth,
    height: 50,
    position: 'absolute',
    resizeMode: 'cover'
  },
  navBar: {
    width: Metrics.screenWidth,
    height: 30,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row'
  },
  iconNavBar: {
    height: 25,
    width: 30,
    resizeMode: 'contain'
  },
  viewTitle: {
    width: Metrics.screenWidth - 100,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  title: {
    fontFamily: Fonts.type.base,
    color: '#ffffff',
    fontSize: Fonts.size.input
  },
  centerText: {
    flex: 1,
    padding: 32
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  preview: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - 100,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})
