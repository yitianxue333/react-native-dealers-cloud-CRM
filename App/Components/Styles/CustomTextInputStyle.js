import { StyleSheet } from 'react-native'
import { Metrics, Fonts } from '../../Themes'
export default StyleSheet.create({
  container: {
    height: 50,
    width: Metrics.screenWidth * 0.7,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.doubleBaseMargin,
    justifyContent: 'space-between',
    // alignItems: 'center',
    alignSelf: 'center'
  },
  label: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    color: '#777777'
  },
  textInput: {
    flex: 7,
    padding: 0,
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.base
  }
})
