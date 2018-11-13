import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  allView: {
    flex: 1
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
    padding: 15
  },
  nameText: {
    fontWeight: 'bold',
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h5,
    color: '#ffffff'
  },
  name: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.medium,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5
  },
  phone: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    color: '#808080'
  },
  date: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.medium,
    color: '#333333',
    marginBottom: 5
  },
  work: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    color: '#ffffff'
  },
  buttonLogin: {
    backgroundColor: '#215bc4',
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.screenWidth - 60,
    marginTop: 15,
    marginBottom: 10
  },
  textButton: {
    margin: 20,
    color: '#ffffff',
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.medium
  }
})
