import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  item: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight / 3
  },
  image: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight / 3,
    resizeMode: 'stretch',
    position: 'absolute'
  },
  textItem: {
    color: 'white',
    fontFamily: Fonts.type.bold,
    fontSize: 22
  },
  textView: {flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
    backgroundColor: 'transparent',
    marginTop: Metrics.screenHeight / 3 - 80
  },
  headerSection: {
    // backgroundColor: 'rgb(1, 98, 174)',
    height: 58,
    color: '#fff',
    fontSize: 20,
    fontFamily: Fonts.type.bold,
    alignSelf: 'flex-start',
    height: 58,
    lineHeight: 58,
    // width: '100%',
    paddingLeft: 28,
  },
  headerContainer: {
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
    backgroundColor: 'rgb(1, 98, 174)',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconStyle: {
    color: '#fff',
    alignSelf: 'center',
    right: 24,
  }
})
