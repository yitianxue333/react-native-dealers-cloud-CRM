import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  viewItem: {
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 15
  },
  viewAll: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - 86,
    justifyContent: 'space-between'
  },
  background: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - 86,
    position: 'absolute',
    resizeMode: 'cover'
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 16
  },
  textInput: {
    padding: 5,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderColor: '#cecece',
    fontSize: 16,
    minWidth: '70%',
  },
  textCheckBox: {
    backgroundColor: 'transparent',
    color: '#b5b5b5',
    fontSize: 10,
    fontFamily: Fonts.type.bold
  },
  buttonDECODE: {
    backgroundColor: '#225bc4',
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
  }
})
