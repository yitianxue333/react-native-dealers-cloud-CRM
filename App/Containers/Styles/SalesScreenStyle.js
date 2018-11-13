import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  iconNavBar: {
    height: 25,
    width: 30,
    resizeMode: 'contain'
  },
  rightNav: {
    position: 'absolute',
    right: 20,
    top: 10
  }
})
