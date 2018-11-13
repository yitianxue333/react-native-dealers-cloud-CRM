import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  background: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    resizeMode: 'cover'
  },
  loading: {
    position: 'absolute',
    top: Metrics.screenHeight / 2
  }
})
