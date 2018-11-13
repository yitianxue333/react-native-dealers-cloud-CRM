import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  rightNavText: {
    fontFamily: Fonts.type.base,
    color: '#ffffff',
    fontSize: Fonts.size.medium,
    backgroundColor: 'transparent'
  },
  rightNav: {
    position: 'absolute',
    right: 20,
    top: 15
  }
})
