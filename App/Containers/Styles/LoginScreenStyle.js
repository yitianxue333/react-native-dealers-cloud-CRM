import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  allView: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  background: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    position: 'absolute',
    resizeMode: 'cover'
  },
  viewLogo: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.screenHeight / 4
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  viewLogin: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  view: {
    margin: 40,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLogin: {
    backgroundColor: '#215bc4',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.screenWidth - 120,
    marginTop: 30,
    marginBottom: 10
  },
  textButton: {
    margin: 20,
    color: '#ffffff',
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.medium
  },
  textForget: {
    fontSize: Fonts.size.medium,
    color: '#777777',
    fontFamily: Fonts.type.base
  },
  viewSignUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  textSignUp: {
    fontWeight: 'bold',
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    color: '#000000'
  },
  backgroundLogin: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'contain',
    position: 'absolute'
  }
})
