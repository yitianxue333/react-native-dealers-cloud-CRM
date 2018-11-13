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
    height: Metrics.screenHeight,
    position: 'absolute',
    resizeMode: 'cover'
  },
  viewItem: {
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 15,
    backgroundColor: '#ffffff'
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 16,
    color: '#b7b7b7',
    marginTop: 10
  },
  buttonSave: {
    backgroundColor: '#225bc4',
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.screenWidth,
    position: 'absolute',
    bottom: 0
  },
  textButton: {
    margin: 20,
    color: '#ffffff',
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.medium
  }
})
