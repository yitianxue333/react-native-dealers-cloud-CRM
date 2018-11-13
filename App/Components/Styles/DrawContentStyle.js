import { StyleSheet } from 'react-native'
import { Fonts, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  viewMenu: {
    flexDirection: 'row',
    marginLeft: 30,
    marginVertical: 20
  },
  imageMenu: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 20
  },
  textMenu: {
    fontWeight: 'bold',
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.input,
    color: '#333333'
  },
  viewClose: {
    marginBottom: 30
  },
  background: {
    width: Metrics.screenWidth * 0.75,
    height: Metrics.screenHeight,
    resizeMode: 'cover',
    position: 'absolute'
  }
})
