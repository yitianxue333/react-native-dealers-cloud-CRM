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
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.medium
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  }
})
