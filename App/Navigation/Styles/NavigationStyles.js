import { StyleSheet, PixelRatio } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.backgroundColor
  },
  tabBar: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1 / PixelRatio.get(),
    backgroundColor: 'white',
    opacity: 0.98
  }
})
