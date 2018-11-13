import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Fonts, Metrics } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  allView: {
    flex: 1
  },
  background: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - 86,
    position: 'absolute',
    resizeMode: 'cover'
  },
  defaultImage: {
    width: Metrics.screenWidth,
    resizeMode: 'contain',
    backgroundColor: '#4c4c4c',
    position: 'absolute'
  },
  icCam: {
    width: 60,
    height: 60
  },
  touchCam: {
    marginLeft: Metrics.screenWidth / 2 - 30,
    marginTop: 100,
    marginBottom: 60
  },
  viewItem: {
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 15,
    backgroundColor: '#ffffff'
  },
  textInfo: {
    color: '#000000',
    fontFamily: Fonts.type.medium,
    marginBottom: 5
  },
  textInput: {
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#cecece',
    fontSize: 12
  },
  text: {
    fontFamily: Fonts.type.medium,
    fontSize: 14
  },
  num: {
    color: '#000000',
    fontFamily: Fonts.type.medium,
    fontSize: 12
  },
  buttonSave: {
    backgroundColor: '#00b751',
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.screenWidth,
    marginTop: 15
  },
  textButton: {
    margin: 20,
    color: '#ffffff',
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.medium
  },
  picker: {
    height: 30,
    paddingLeft: 0
  },
  pickerAndroid: {
    alignSelf: 'stretch',
    paddingLeft: 0
  }
})
