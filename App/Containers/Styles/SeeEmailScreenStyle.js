import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics } from '../../Themes'

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
    paddingVertical: 15,
    backgroundColor: '#ffffff'
  }
})
