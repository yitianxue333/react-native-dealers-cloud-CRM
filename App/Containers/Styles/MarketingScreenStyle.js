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
  background: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    position: 'absolute',
    resizeMode: 'cover'
  },
  viewItem: {
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 10,
    paddingLeft: 5
  },
  nameText: {
    fontWeight: 'bold',
    fontFamily: Fonts.type.bold,
    fontSize: 14,
    color: '#ffffff'
  },
  name: {
    fontWeight: 'bold',
    fontFamily: Fonts.type.bold,
    fontSize: 10,
    color: '#000000',
    backgroundColor: 'transparent',
    marginLeft: 10,
    width: 30
  },
  time: {
    fontFamily: Fonts.type.base,
    fontSize: 10,
    color: '#000000',
    backgroundColor: 'transparent',
    marginLeft: 10
  },
  workView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c9c9c9',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  work: {
    fontFamily: Fonts.type.base,
    fontSize: 10,
    color: '#ffffff'
  },
  textLabel: {
    fontWeight: 'bold',
    fontFamily: Fonts.type.bold,
    fontSize: 12,
    color: '#555555'
  },
  right: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 30
  }
})
