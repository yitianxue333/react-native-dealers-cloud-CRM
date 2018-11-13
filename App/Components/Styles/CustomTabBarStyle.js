import { StyleSheet } from 'react-native'
import { Fonts, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    height: 86
  },
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
  rightNavText: {
    fontFamily: Fonts.type.base,
    color: '#ffffff',
    fontSize: Fonts.size.medium,
    backgroundColor: 'transparent'
  },
  rightNav: {
    position: 'absolute',
    right: 40,
    top: 6
  }
})
