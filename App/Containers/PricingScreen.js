import React, { Component } from 'react'
import {
  Alert,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { Actions, ActionConst } from 'react-native-router-flux'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from 'react-native-modal'
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component'
import Icons from 'react-native-vector-icons/FontAwesome'

import CustomNavBar from '../Components/CustomNavBar'

// Styles
import styles from './Styles/PricingScreenStyle'
import InventoryActions from '../Redux/InventoryRedux'

const background = require('../Images/AddDeal/background.png')

const { width, height } = Dimensions.get('window')

class PricingScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      internet: '',
      retail: '',
      wholeSale: '',
      reduced: '',
      monthlyPayment: '',
      kbbPrice: '',
      nadaPrice: '',
      isModalVisible: false,
      basePrice: [],
      mileageAdj: [],
      sumOfVehicleOptions: [],
      sumOfAdjTotal: [],
      nadaAccessories: [],
      nadaAuction: []
    }
    this.calcVehicleOptions = this.calcVehicleOptions.bind(this)
    this.calcAdjTotal = this.calcAdjTotal.bind(this)
    this.convertAccessoriesToArray = this.convertAccessoriesToArray.bind(this)
    this.convertAuctionToArray = this.convertAuctionToArray.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  async componentWillMount () {
    if (this.props.id === 1) {
      const i = this.props.vehicle.internetMarketing
      this.setState({
        kbbPrice: i.KBBPrice !== null ? i.KBBPrice.toString() : '',
        retail: i.RetailPrice !== null ? i.RetailPrice.toString() : '',
        internet: i.InternetPrice !== null ? i.InternetPrice.toString() : '',
        reduced: i.ReducedPrice !== null ? i.ReducedPrice.toString() : '',
        wholeSale: i.WholesalePrice !== null ? i.WholesalePrice.toString() : '',
        monthlyPayment:
          i.MonthlyPayment !== null ? i.MonthlyPayment.toString() : ''
        // nadaPrice: i.nadaPrice !== null ? i.nadaPrice.toString() : ''
      })
      const vehicleId = (await this.props.vehicle.information)
        ? this.props.vehicle.information.VehicleID
        : null
      const vin = (await this.props.vehicle._Vehicle)
        ? this.props.vehicle._Vehicle.VIN.replace('"', '')
        : null
      const mileage = (await this.props.vehicle.information)
        ? this.props.vehicle.information.Mileage
        : null
      await this.props.getVehicleNada(vehicleId, vin, mileage)
    }
  }

  async componentWillReceiveProps (nextProps) {
    if (!nextProps.fetching) {
      if (nextProps.vehicleNada.NADAValue !== null) {
        console.log('data.....')
        this.setState({
          basePrice: [
            nextProps.vehicleNada.NADAValue.RoughTradeIn,
            nextProps.vehicleNada.NADAValue.AvgTradeIn,
            nextProps.vehicleNada.NADAValue.TradeIn,
            nextProps.vehicleNada.NADAValue.Loan,
            nextProps.vehicleNada.NADAValue.Retail
          ],
          mileageAdj: [
            nextProps.vehicleNada.NADAValue.MileageAdj +
              nextProps.vehicleNada.NADAValue.RoughTradeIn,
            nextProps.vehicleNada.NADAValue.MileageAdj +
              nextProps.vehicleNada.NADAValue.AvgTradeIn,
            nextProps.vehicleNada.NADAValue.MileageAdj +
              nextProps.vehicleNada.NADAValue.TradeIn,
            nextProps.vehicleNada.NADAValue.MileageAdj +
              nextProps.vehicleNada.NADAValue.Loan,
            nextProps.vehicleNada.NADAValue.MileageAdj +
              nextProps.vehicleNada.NADAValue.Retail
          ]
        })
      }
      if (nextProps.vehicleNada.NADAAccessories !== null) {
        await this.calcVehicleOptions(nextProps.vehicleNada)
        await this.calcAdjTotal()
        await this.convertAccessoriesToArray()
      }
      if (nextProps.vehicleNada.NADAAuction !== null) {
        await this.convertAuctionToArray()
      }
    }
  }

  onSave () {
    if (this.props.id === 1) {
      console.log('aaaaaa')
      const {
        internet,
        retail,
        wholeSale,
        reduced,
        monthlyPayment,
        kbbPrice,
        nadaPrice
      } = this.state
      let i = this.props.vehicle
      let internetMarketing = i.internetMarketing
      internetMarketing = internetMarketing.merge({
        KBBPrice: kbbPrice,
        RetailPrice: retail,
        InternetPrice: internet,
        ReducedPrice: reduced,
        WholesalePrice: wholeSale,
        MonthlyPayment: monthlyPayment,
        nadaPrice: nadaPrice
      })
      console.log('internetMarketing', internetMarketing)
      i = i.merge({ internetMarketing })
      console.log(i)
      console.log('userID', this.props.userID)
      this.props.saveVehicleDto(i, this.props.userID)
      setTimeout(() => {
        // this._modalLoadingSpinnerOverLay.hide()
        Actions.drawer({ type: ActionConst.RESET })
      }, 500)
    } else {
      Actions.pop()
    }
  }

  onSelect (index, value) {
    this.setState({
      text: `Selected index: ${index} , value: ${value}`
    })
  }

  toggleModal () {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  alertNoNada () {
    Alert.alert(
      'NADA Valuation',
      'Empty NADA Valuation!!!',
      [{ text: 'Close' }],
      { cancelable: false }
    )
  }

  calcVehicleOptions (vehicleNada) {
    console.log('calcVehicleOptions')
    let {NADAAccessories} = vehicleNada
    console.log(NADAAccessories)
    let sumOfVehicleOptions = []
    let tradeIn = []
    let loan = []
    let retail = []
    for (let i = 0; i <= NADAAccessories.length - 1; i++) {
      if (NADAAccessories[i].IsAdded) {
        tradeIn.push(NADAAccessories[i].TradeIn)
        loan.push(NADAAccessories[i].Loan)
        retail.push(NADAAccessories[i].Retail)
      }
    }
    let sumOfTradeIn = tradeIn.reduce((a, b) => a + b, 0)
    let sumOfLoan = loan.reduce((a, b) => a + b, 0)
    let sumOfRetail = retail.reduce((a, b) => a + b, 0)
    sumOfVehicleOptions.push(
      sumOfTradeIn,
      sumOfTradeIn,
      sumOfTradeIn,
      sumOfLoan,
      sumOfRetail
    )
    console.log(sumOfVehicleOptions)
    this.setState({ sumOfVehicleOptions: sumOfVehicleOptions })
  }

  calcAdjTotal () {
    let dataNadaValueTable = [
      this.state.basePrice,
      this.state.sumOfVehicleOptions,
      this.state.mileageAdj
    ]
    let sumOfAdjTotal = []
    let roughTradeIn = []
    let avgTradeIn = []
    let cleanTradeIn = []
    let loan = []
    let retail = []
    for (let i = 0; i <= dataNadaValueTable.length - 1; i++) {
      roughTradeIn.push(dataNadaValueTable[i][0])
      avgTradeIn.push(dataNadaValueTable[i][1])
      cleanTradeIn.push(dataNadaValueTable[i][2])
      loan.push(dataNadaValueTable[i][3])
      retail.push(dataNadaValueTable[i][4])
    }
    let totalRoughTradeIn = roughTradeIn.reduce((a, b) => a + b, 0)
    let totalAvgTradeIn = avgTradeIn.reduce((a, b) => a + b, 0)
    let totalCleanTradeIn = cleanTradeIn.reduce((a, b) => a + b, 0)
    let totalCleanLoan = loan.reduce((a, b) => a + b, 0)
    let totalCleanRetail = retail.reduce((a, b) => a + b, 0)
    sumOfAdjTotal.push(
      totalRoughTradeIn,
      totalAvgTradeIn,
      totalCleanTradeIn,
      totalCleanLoan,
      totalCleanRetail
    )
    this.setState({ sumOfAdjTotal: sumOfAdjTotal })
  }

  convertAccessoriesToArray () {
    let NADAAccessories =
      this.props.vehicleNada.NADAAccessories !== null
        ? this.props.vehicleNada.NADAAccessories
        : null
    if (NADAAccessories !== undefined || NADAAccessories !== null) {
      let accessoriesArray = []
      for (let i = 0; i <= NADAAccessories.length - 1; i++) {
        let rowData = []
        rowData.push(NADAAccessories[i].IsAdded)
        rowData.push(NADAAccessories[i].AccDesc)
        rowData.push(NADAAccessories[i].TradeIn)
        rowData.push(NADAAccessories[i].Loan)
        rowData.push(NADAAccessories[i].Retail)
        accessoriesArray.push(rowData)
      }
      this.setState({ nadaAccessories: accessoriesArray })
    } else {
      this.setState({ nadaAccessories: [] })
    }
  }

  convertAuctionToArray () {
    let NADAAuction =
      this.props.vehicleNada.NADAAuction !== null
        ? this.props.vehicleNada.NADAAuction
        : null
    if (NADAAuction !== undefined || NADAAuction !== null) {
      let auctionArray = []
      auctionArray.push(NADAAuction.DateRange)
      auctionArray.push(NADAAuction.LowValue)
      auctionArray.push(NADAAuction.AvgValue)
      auctionArray.push(NADAAuction.HighValue)
      this.setState({ nadaAuction: auctionArray })
    } else {
      this.setState({ nadaAuction: [] })
    }
  }

  render () {
    const headerNadaValue = [
      '',
      'Rough Trade-In',
      'Average Trade-In',
      'Clean Trade-In',
      'Clean Loan',
      'Clean Retail'
    ]
    const widthHeaderNadaValue = [120, 120, 120, 120, 120, 120]
    const headerAuction = ['Auction', 'Low', 'Average', 'High']
    const widthHeaderAuction = [240, 160, 160, 160]
    const columnNadaValue = [
      'Base Price',
      'Vehicle Options',
      'Mileage Adj',
      'Adj Total'
    ]
    const widthHeaderVehicleOptions = [60, 300, 120, 120, 120]
    let dataNadaValueTable = [
      this.state.basePrice,
      this.state.sumOfVehicleOptions,
      this.state.mileageAdj,
      this.state.sumOfAdjTotal
    ]
    console.log(dataNadaValueTable)
    const headerVehicleOptions = ['', 'Options', 'Trade-In', 'Loan', 'Retail']
    console.log(this.props)
    console.log(this.state)
    const customCellVehicleOptionsTable = (data, index) => {
      if (index === 0) {
        if (data === true) {
          return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Icons name={'check'} size={20} />
            </View>
          )
        } else {
          return null
        }
      } else {
        return (
          <View>
            <Text style={{ textAlign: index === 1 ? 'left' : 'right' }}>
              {data}
            </Text>
          </View>
        )
      }
    }

    const customCellAuction = (data, index) => {
      return (
        <View>
          <Text style={{ textAlign: index === 0 ? 'left' : 'right' }}>
            {data}
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.allView}>
        <Image style={styles.background} source={background} />
        <CustomNavBar
          title={'Pricing'}
          onBackPress={() =>
            this.setState({
              internet: '',
              retail: '',
              wholeSale: '',
              reduced: '',
              monthlyPayment: '',
              kbbPrice: '',
              nadaPrice: '',
              isModalVisible: false,
              basePrice: [],
              mileageAdj: [],
              sumOfVehicleOptions: [],
              sumOfAdjTotal: [],
              nadaAccessories: [],
              nadaAuction: []
            })
          }
        />
        <KeyboardAwareScrollView style={styles.container}>
          <View style={[styles.viewItem, { marginTop: 20 }]}>
            <Text style={[styles.text, { marginTop: 0 }]}>DISPLAY</Text>
            <RadioGroup
              style={{ flexDirection: 'row' }}
              onSelect={(index, value) => this.onSelect(index, value)}>
              <RadioButton value={'item1'}>
                <Text>Internet Price</Text>
              </RadioButton>
              <RadioButton value={'item2'}>
                <Text>Retail Price</Text>
              </RadioButton>
            </RadioGroup>
            <Text style={styles.text}>INTERNET</Text>
            <TextInput
              underlineColorAndroid={'transparent'}
              value={this.state.internet}
              onChangeText={(internet) => this.setState({ internet })}
              style={styles.textInput}
            />
            <Text style={styles.text}>RETAIL</Text>
            <TextInput
              underlineColorAndroid={'transparent'}
              value={this.state.retail}
              onChangeText={(retail) => this.setState({ retail })}
              style={styles.textInput}
            />
            <Text style={styles.text}>WHOLESALE</Text>
            <TextInput
              underlineColorAndroid={'transparent'}
              value={this.state.wholeSale}
              onChangeText={(wholeSale) => this.setState({ wholeSale })}
              style={styles.textInput}
            />
            <Text style={styles.text}>REDUCED</Text>
            <TextInput
              underlineColorAndroid={'transparent'}
              value={this.state.reduced}
              onChangeText={(reduced) => this.setState({ reduced })}
              style={styles.textInput}
            />
            <Text style={styles.text}>MONTHLY PAYMENT</Text>
            <TextInput
              underlineColorAndroid={'transparent'}
              value={this.state.monthlyPayment}
              onChangeText={(monthlyPayment) =>
                this.setState({ monthlyPayment: monthlyPayment })
              }
              style={styles.textInput}
            />
            <Text style={styles.text}>KBB PRICE</Text>
            <TextInput
              underlineColorAndroid={'transparent'}
              value={this.state.kbbPrice}
              onChangeText={(kbbPrice) => this.setState({ kbbPrice })}
              style={styles.textInput}
            />
            {this.props.id === 1 ? (
              <View style={styles.nadaLayout}>
                <View style={{ flexDirection: 'column', flex: 2 }}>
                  <Text style={styles.text}>NADA PRICE</Text>
                  <TextInput
                    underlineColorAndroid={'transparent'}
                    value={this.state.nadaPrice}
                    onChangeText={(nadaPrice) =>
                      this.setState({ nadaPrice: nadaPrice })
                    }
                    style={styles.textInput}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.vehicleNada.NADAValue !== null &&
                      this.props.vehicleNada.NADAAuction !== null &&
                      this.props.vehicleNada.NADAAccessories !== null
                        ? this.toggleModal()
                        : this.alertNoNada()
                    }
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      source={require('../Images/NadaLogo.png')}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
          <View style={{ height: 100 }} />
        </KeyboardAwareScrollView>
        <TouchableOpacity
          onPress={() => this.onSave()}
          style={styles.buttonSave}>
          <Text style={styles.textButton}>SAVE</Text>
        </TouchableOpacity>
        {/* Modal */}
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={this.toggleModal}
          avoidKeyboard={Platform.OS !== 'android'}
          backdropColor={'white'}
          backdropOpacity={1}
          style={{ flex: 1 }}>
          <View
            style={{
              width: width,
              height: height,
              alignSelf: 'center',
              backgroundColor: 'white'
            }}>
            <View
              style={{
                backgroundColor: 'white',
                flex: 1,
                paddingTop: 20
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: '#a1a1a1',
                  height: 40,
                  marginBottom: 20,
                  marginHorizontal: 20
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}>
                  NADA Valuation
                </Text>
                <TouchableOpacity onPress={this.toggleModal}>
                  <Icons name={'times'} size={20} color={'black'} />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView horizontal>
                  <ScrollView>
                    {/* Value */}
                    <View style={{ marginBottom: 40 }}>
                      <Table
                        borderStyle={{ borderColor: '#f4f5f8' }}
                        style={{ marginHorizontal: 10 }}>
                        <Row
                          data={headerNadaValue}
                          widthArr={widthHeaderNadaValue}
                          style={{ height: 50, backgroundColor: '#f4f5f8' }}
                          textStyle={{ textAlign: 'center' }}
                        />
                        <TableWrapper style={{ flexDirection: 'row' }}>
                          <TableWrapper>
                            {columnNadaValue.map((cellData, cellIndex) => {
                              return (
                                <Cell
                                  key={cellIndex}
                                  data={cellData}
                                  width={120}
                                  style={[
                                    {
                                      height: 50,
                                      paddingLeft: 10
                                    },
                                    cellIndex % 2
                                      ? { backgroundColor: '#f4f5f8' }
                                      : {}
                                  ]}
                                />
                              )
                            })}
                          </TableWrapper>
                          <TableWrapper>
                            {dataNadaValueTable.map((rowData, index) => {
                              return (
                                <Row
                                  key={index}
                                  data={rowData}
                                  widthArr={[120, 120, 120, 120, 120]}
                                  style={[
                                    { height: 50 },
                                    index % 2
                                      ? { backgroundColor: '#f4f5f8' }
                                      : {}
                                  ]}
                                  textStyle={{
                                    textAlign: 'right',
                                    marginRight: 10
                                  }}
                                />
                              )
                            })}
                          </TableWrapper>
                        </TableWrapper>
                      </Table>
                    </View>

                    {/* Auction */}
                    {this.state.nadaAuction !== [] ? (
                      <View style={{ marginBottom: 40 }}>
                        <Table
                          borderStyle={{ borderColor: '#f4f5f8' }}
                          style={{ marginHorizontal: 10 }}>
                          <Row
                            data={headerAuction}
                            widthArr={widthHeaderAuction}
                            style={{ height: 50, backgroundColor: '#f4f5f8' }}
                            textStyle={{ textAlign: 'center' }}
                          />
                          <TableWrapper style={{ flexDirection: 'row' }}>
                            {this.state.nadaAuction !== []
                              ? this.state.nadaAuction.map(
                                  (cellData, cellIndex) => {
                                    return (
                                      <Cell
                                        key={cellIndex}
                                        data={customCellAuction(
                                          cellData,
                                          cellIndex
                                        )}
                                        style={{
                                          height: 50,
                                          width: cellIndex === 0 ? 240 : 160,
                                          paddingLeft: cellIndex === 0 ? 10 : 0,
                                          paddingRight: cellIndex !== 0 ? 10 : 0
                                        }}
                                      />
                                    )
                                  }
                                )
                              : null}
                          </TableWrapper>
                        </Table>
                      </View>
                    ) : null}

                    {/* Vehicle Options */}
                    <View style={{ marginBottom: 40 }}>
                      <Table
                        borderStyle={{ borderColor: '#f4f5f8' }}
                        style={{ marginHorizontal: 10 }}>
                        <Row
                          data={headerVehicleOptions}
                          widthArr={widthHeaderVehicleOptions}
                          style={{ height: 50, backgroundColor: '#f4f5f8' }}
                          textStyle={{ textAlign: 'center' }}
                        />
                        {this.state.nadaAccessories.map((rowData, index) => (
                          <TableWrapper
                            key={index}
                            style={[
                              { flexDirection: 'row' },
                              index % 2 ? { backgroundColor: '#f4f5f8' } : {}
                            ]}>
                            {rowData.map((cellData, cellIndex) => (
                              <Cell
                                key={cellIndex}
                                data={customCellVehicleOptionsTable(
                                  cellData,
                                  cellIndex
                                )}
                                style={[
                                  {
                                    height: 50
                                  },
                                  cellIndex === 0
                                    ? {
                                      width: 60,
                                      alignSelf: 'center'
                                    }
                                    : cellIndex === 1
                                      ? {
                                        width: 300,
                                        paddingLeft: 10
                                      }
                                      : {
                                        width: 120,
                                        paddingRight: 10
                                      }
                                ]}
                              />
                            ))}
                          </TableWrapper>
                        ))}
                      </Table>
                    </View>
                  </ScrollView>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  vehicleNada: state.inventory.vehicleNada,
  vehicle: state.inventory.vehicle,
  id: state.inventory.id,
  userID: state.auth.userID,
  fetching: state.inventory.fetching
})

const mapDispatchToProps = (dispatch) => ({
  getVehicleNada: (vehicleId, vin, mileage) =>
    dispatch(InventoryActions.getVehicleNada(vehicleId, vin, mileage)),
  saveVehicleDto: (vehicleDTO, userID) => {
    console.log(vehicleDTO, userID)
    dispatch(InventoryActions.saveVehicleDto(vehicleDTO, userID))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PricingScreen)
