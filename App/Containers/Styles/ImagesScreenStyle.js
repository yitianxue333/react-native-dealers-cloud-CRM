import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

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
  image: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight / 3
    // resizeMode: 'stretch'
  }
})
