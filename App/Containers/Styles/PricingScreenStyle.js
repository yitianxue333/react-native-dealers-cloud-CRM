import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Fonts } from '../../Themes/'

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
    width: Metrics.screenWidth,
    position: 'absolute',
    bottom: 0
  },
  textButton: {
    margin: 20,
    color: '#ffffff',
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.medium
  },
  nadaLayout: {
    flexDirection: 'row',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})
