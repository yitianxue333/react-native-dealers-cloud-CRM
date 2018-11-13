import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  background: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    resizeMode: 'cover'
  }
})
