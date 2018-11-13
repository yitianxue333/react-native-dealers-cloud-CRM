import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  allView: {
    flex: 1
  },
  background: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - 30,
    position: 'absolute',
    resizeMode: 'cover'
  },
  nav: {
    backgroundColor: '#3598dc'
  },
  navBarBackground: {
    width: Metrics.screenWidth,
    height: 50,
    position: 'absolute',
    resizeMode: 'cover'
  },
  navBar: {
    width: Metrics.screenWidth,
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
  },
  viewItem: {
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#dddddd',
    paddingVertical: 15,
    backgroundColor: '#ffffff'
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 16,
    color: '#b7b7b7',
    marginTop: 10
  },
  textInput: {
    padding: 5,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderColor: '#cecece',
    fontSize: 16
  },
  buttonSave: {
    backgroundColor: '#225bc4',
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.screenWidth - 20,
  },
  textButton: {
    margin: 20,
    color: '#ffffff',
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.medium
  },
  work: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    color: '#000000'
  },
  itemButton: {
    justifyContent: 'center',
    padding: 5,
    margin: 2,
    alignItems: 'center'
  },
  textItemButton: {
    color: '#ffffff'
  },
  textItemButton2: {
    color: '#ffffff',
    fontSize: 10
  },
  defaultImage: {
    width: Metrics.screenWidth - 60,
    resizeMode: 'contain',
    backgroundColor: '#4c4c4c'
  }
})
