import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, TextInput, Platform, BackHandler, TouchableOpacity, Modal } from 'react-native'
import CheckBox from 'react-native-icon-checkbox'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Picker } from 'react-native-picker-dropdown'
import DateTimePicker from 'react-native-modal-datetime-picker'
import InventoryPickerActions from '../Redux/InventoryPickerRedux'
import InventoryActions from '../Redux/InventoryRedux'
import Moment from 'moment'
import LoadingSpinnerOverlay from '@react-native-component/react-native-smart-loading-spinner-overlay/LoadingSpinnerOverlay'
import { Dropdown } from 'react-native-material-dropdown'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ScanVinScreen from './ScanVinScreen'
import CustomNavBar from '../Components/CustomNavBar'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BasicInfoScreenStyle'
import { Actions, ActionConst } from 'react-native-router-flux'
import { bindActionCreators } from 'redux'
const background = require('../Images/AddDeal/background.png')
const make = [
  {'label': 'ACURA', 'value': 'ACURA'},
  {'label': 'ALFA', 'value': 'ALFA'},
  {'label': 'AM GENERAL', 'value': 'AMGENERAL'},
  {'label': 'ASTON MARTIN', 'value': 'ASTONMARTIN'},
  {'label': 'AUDI', 'value': 'AUDI'},
  {'label': 'BENTLEY', 'value': 'BENTLEY'},
  {'label': 'BMW', 'value': 'BMW'},
  {'label': 'BUICK', 'value': 'BUICK'},
  {'label': 'CADILLAC', 'value': 'CADILLAC'},
  {'label': 'CHEVROLET', 'value': 'CHEVROLET'},
  {'label': 'CHRYSLER', 'value': 'CHRYSLER'},
  {'label': 'DAEWOO', 'value': 'DAEWOO'},
  {'label': 'DODGE', 'value': 'DODGE'},
  {'label': 'FERRAI', 'value': 'FERRAI'},
  {'label': 'FERRARI', 'value': 'FERRARI'},
  {'label': 'FIAT', 'value': 'FIAT'},
  {'label': 'FORD', 'value': 'FORD'},
  {'label': 'GEO', 'value': 'GEO'},
  {'label': 'GMC', 'value': 'GMC'},
  {'label': 'HARLEY-DAVIDSON', 'value': 'HARLEY-DAVIDSON'},
  {'label': 'HONDA', 'value': 'HONDA'},
  {'label': 'HUMMER', 'value': 'HUMMER'},
  {'label': 'HYUNDAI', 'value': 'HYUNDAI'},
  {'label': 'NFINITI', 'value': 'NFINITI'},
  {'label': 'ISUZU', 'value': 'ISUZU'},
  {'label': 'JAGUAR', 'value': 'JAGUAR'},
  {'label': 'JEEP', 'value': 'JEEP'},
  {'label': 'KAWASAKI', 'value': 'KAWASAKI'},
  {'label': 'KIA', 'value': 'KIA'},
  {'label': 'LAND ROVER', 'value': 'LANDROVER'},
  {'label': 'LEXUS', 'value': 'LEXUS'},
  {'label': 'LINCOLN', 'value': 'LINCOLN'},
  {'label': 'MASERATI', 'value': 'MASERATI'},
  {'label': 'MAZDA', 'value': 'MAZDA'},
  {'label': 'MERCEDES-BENZ', 'value': 'MERCEDES-BENZ'},
  {'label': 'MERCURY', 'value': 'MERCURY'},
  {'label': 'MILLER', 'value': 'MILLER'},
  {'label': 'MINI', 'value': 'MINI'},
  {'label': 'MITSUBISHI', 'value': 'MITSUBISHI'},
  {'label': 'NISSAN', 'value': 'NISSAN'},
  {'label': 'OLDSMOBILE', 'value': 'OLDSMOBILE'},
  {'label': 'PETERBILT', 'value': 'PETERBILT'},
  {'label': 'PLYMOUTH', 'value': 'PLYMOUTH'},
  {'label': 'PONTIAC', 'value': 'PONTIAC'},
  {'label': 'PORSCHE', 'value': 'PORSCHE'},
  {'label': 'RAM', 'value': 'RAM'},
  {'label': 'ROLLS-ROYCE', 'value': 'ROLLS-ROYCE'},
  {'label': 'SAAB', 'value': 'SAAB'},
  {'label': 'SATURN', 'value': 'SATURN'},
  {'label': 'SCION', 'value': 'SCION'},
  {'label': 'SMART', 'value': 'SMART'},
  {'label': 'SUBARU', 'value': 'SUBARU'},
  {'label': 'SUZUKI', 'value': 'SUZUKI'},
  {'label': 'TESLA', 'value': 'TESLA'},
  {'label': 'TOYOTA', 'value': 'TOYOTA'},
  {'label': 'VOLKSWAGEN', 'value': 'VOLKSWAGEN'},
  {'label': 'VOLVO', 'value': 'VOLVO'},
  {'label': 'YAMAHA', 'value': 'YAMAHA'}
]
class BasicInfoScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isDateTimePickerVisible: false,
      date: new Date().getDate(),
      makes: [],
      models: [],
      color: [],
      trims: [],
      bodyStyles: [],
      interiorSurfaces: [],
      engines: [],
      transmissions: [],
      fuelTypes: [],
      driveTypes: [],
      vin: '',
      year: '',
      make: '',
      model: '',
      trim: '',
      milleage: '',
      bodyStyle: '',
      exteriorColor: '',
      interiorColor: '',
      interiorSurface: '',
      warranty: '',
      engine: '',
      transmission: '',
      fuelType: '',
      driveType: '',
      mpgCity: '',
      hwy: '',
      curbWeight: '',
      inStockDate: '',
      vehicleRecon: '',
      location: '',
      memo: '',
      sub: '',
      doors: '',
      isNew: true,
      showModal: false,
      isReady: true,
      isStop: false
    }
  }
  componentWillMount () {
    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   Actions.homeScreen({type: ActionConst.RESET})
    //   return false
    // })
    if (this.props.id === 1) {
      const item = this.props.vehicle
      const vehicle = item._Vehicle
      const information = item.information
      __DEV__ && console.log('vehicle', vehicle)
      this.setState({
        item,
        vin: vehicle.VIN !== null ? vehicle.VIN : '',
        year: vehicle.ModelYear !== null ? vehicle.ModelYear.toString() : '',
        make: vehicle.MakeID !== null ? vehicle.MakeID : '',
        model: vehicle.ModelID !== null ? vehicle.ModelID : '',
        trim: vehicle.TrimID !== null ? vehicle.TrimID : '',
        milleage: information.MileageStatusID !== null ? information.MileageStatusID : '',
        bodyStyle: vehicle.BodyStyleID !== null ? vehicle.BodyStyleID : '',
        exteriorColor: information.ExteriorColorID !== null ? information.ExteriorColorID : '',
        interiorColor: information.InteriorColorID !== null ? information.InteriorColorID : '',
        interiorSurface: information.InteriorSurfaceID !== null ? information.InteriorSurfaceID : '',
        warranty: '',
        engine: vehicle.EngineID !== null ? vehicle.EngineID : '',
        transmission: vehicle.TransmissionID !== null ? vehicle.TransmissionID : '',
        fuelType: vehicle.FuelTypeID !== null ? vehicle.FuelTypeID : '',
        driveType: vehicle.DriveTypeID !== null ? vehicle.DriveTypeID : '',
        mpgCity: vehicle.MPGCity !== null ? vehicle.MPGCity.toString() : '',
        hwy: vehicle.MPGHwy !== null ? vehicle.MPGHwy.toString() : '',
        curbWeight: information.CurbWeight !== null ? information.CurbWeight : '',
        inStockDate: information.InStockDate !== null ? information.InStockDate : '',
        doors: vehicle.NoOfDoors !== null ? vehicle.NoOfDoors : '',
        isNew: information.IsNew
      })
    } else {
      const item = {
        '_Vehicle': {
          'VehicleID': 1,
          'VIN': 'sample string 2',
          'StockNumber': 'sample string 3',
          'ModelYear': 4,
          'ModelID': 5,
          'MakeID': 6,
          'BodyStyleID': 64,
          'EngineID': 1,
          'TransmissionID': 64,
          'FuelTypeID': 64,
          'DriveTypeID': 64,
          'MPGCity': 64,
          'MPGHwy': 64,
          'TrimID': 1,
          'DealershipID': 7,
          'SubTitle': 'sample string 8',
          'IsSold': true,
          'NoOfDoors': 'sample string 9',
          'Arbitrated': true,
          'ArbitratedDate': '2018-05-02T22:39:05.7153428-04:00',
          'StockPrefix': 'sample string 11',
          'NextAvailableStockNumber': 12,
          'StockNumberType': 1,
          'Make': 'sample string 13',
          'Model': 'sample string 14',
          'IsEvaluation': true
        },
        'information': {
          'VehicleID': 1,
          'Mileage': 2,
          'MileageStatusID': 1,
          'InteriorColorID': 1,
          'ExteriorColorID': 1,
          'OEMInteriorColorID': 1,
          'OEMExteriorColorID': 1,
          'ExteriorColorDescription': 'sample string 3',
          'InteriorSurfaceID': 64,
          'InStockDate': '2018-05-02T22:39:05.7153428-04:00',
          'TitleInHouse': true,
          'TitleNo': 'sample string 5',
          'TitleState': 'sample string 6',
          'TitleComments': 'sample string 7',
          'IsNew': true,
          'VehicleLocationID': 1,
          'CurbWeight': 'sample string 9',
          'VehicleReconID': 1
        },
        'internetMarketing': {
          'VehicleID': 1,
          'SpotLight': true,
          'Featured': true,
          'Financed': true,
          'Certified': true,
          'LowMileage': true,
          'ShowHighLights': true,
          'ReducedPrice': true,
          'UseRetailPrice': true,
          'ShowCarFaxReportLink': true,
          'HideCarFaxSnapshot': true,
          'SellerCommentID': 1,
          'SellerComment': 'sample string 12',
          'HighlightCommentID': 1,
          'HighlightComment': 'sample string 13',
          'IsPublished': true,
          'ReducedAmount': 1.0,
          'InternetPrice': 15.0,
          'RetailPrice': 16.0,
          'WholesalePrice': 17.0,
          'WholesaleLightID': 1,
          'IsBlueForWholesale': true,
          'WholesaleComments': 'sample string 19',
          'IsSoldPublished': true,
          'KBBPrice': 1.0,
          'IsFrameDamage': true,
          'NoHagglePricing': true,
          'LocalTrade': true,
          'OperatorID': 1,
          'OperationDate': '2018-05-02T22:39:05.7153428-04:00',
          'MonthlyPayment': 1.0,
          'WarrantyTypeID': 0,
          'TitleStatusID': 0,
          'ShowCarGurusLink': true,
          'LiveDate': '2018-05-02T22:39:05.7153428-04:00'
        },
        'flagColor': {
          'VehicleID': 1,
          'Memo': 'sample string 2',
          'ApplyCode': false,
          'ColorCodeFlag': 0,
          'ColorCode': null
        },
        'options': [
          1,
          2
        ],
        'associatedDealerships': [
          1,
          2
        ],
        'VehiclePayments': [
          {
            'AppliedDate': '2018-05-02T22:39:05.7153428-04:00',
            'BankID': 1,
            'SuggestivePrice': 1.0,
            'BankList': [
              {
                'ItemID': 1,
                'Description': 'sample string 2'
              },
              {
                'ItemID': 1,
                'Description': 'sample string 2'
              }
            ],
            'PaidOff': true,
            'context': 'sample string 3',
            'TransactionID': 4,
            'PaymentDate': '2018-05-02T22:39:05.7309682-04:00',
            'PaymentDateText': '05/02/18',
            'Amount': 6.0,
            'PaymentTypeID': 1,
            'PreviousPaymentTypeID': 1,
            'Memo': 'sample string 7',
            'CheckNo': 1,
            'CardHolderName': 'sample string 8',
            'CardNumber': 'sample string 9',
            'ExpiryMonth': 64,
            'ExpiryYear': 1,
            'DebitCardTypeID': 1,
            'RecordState': 3,
            'IsRemoved': true
          },
          {
            'AppliedDate': '2018-05-02T22:39:05.7153428-04:00',
            'BankID': 1,
            'SuggestivePrice': 1.0,
            'BankList': [
              {
                'ItemID': 1,
                'Description': 'sample string 2'
              },
              {
                'ItemID': 1,
                'Description': 'sample string 2'
              }
            ],
            'PaidOff': true,
            'context': 'sample string 3',
            'TransactionID': 4,
            'PaymentDate': '2018-05-02T22:39:05.7309682-04:00',
            'PaymentDateText': '05/02/18',
            'Amount': 6.0,
            'PaymentTypeID': 1,
            'PreviousPaymentTypeID': 1,
            'Memo': 'sample string 7',
            'CheckNo': 1,
            'CardHolderName': 'sample string 8',
            'CardNumber': 'sample string 9',
            'ExpiryMonth': 64,
            'ExpiryYear': 1,
            'DebitCardTypeID': 1,
            'RecordState': 3,
            'IsRemoved': true
          }
        ],
        'financialTransactionDTO': {
          '_FinancialTransaction': {
            'TransactionID': 1,
            'TransactionTypeId': 2,
            'TransactionDate': '2018-05-02T22:39:05.7309682-04:00',
            'TransactionDateText': '05/02/2018',
            'TransactionCode': 'sample string 4',
            'Amount': 5.0,
            'Description': 'sample string 6',
            'PaymentModeID': 1,
            'PreviousPaymentModeID': 64,
            'PayModeID': 1,
            'PaymentType': 1,
            'PayeeID': 9,
            'PayerID': 10,
            'BankID': 11,
            'Memo': 'sample string 12',
            'DealershipID': 13,
            'OperatorID': 1,
            'OperationDate': '2018-05-02T22:39:05.7309682-04:00',
            'VehicleID': 1,
            'BusinessName': 'sample string 14'
          },
          '_ACHDetail': {
            'TransactionID': 1,
            'IsAcPersonal': true,
            'IsAcTypeChecking': true,
            'AccountNumber': 'sample string 2',
            'RoutingNumber': 'sample string 3',
            'FirstName': 'sample string 4',
            'LastName': 'sample string 5',
            'PPTransactionID': 1
          },
          '_CheckDetail': {
            'TransactionID': 1,
            'CheckNo': 1,
            'PrintDate': '2018-05-02T22:39:05.7309682-04:00',
            'CheckID': 1
          },
          '_DebitCardDetail': {
            'TransactionID': 1,
            'CardHolderName': 'sample string 2',
            'CardNumber': 'sample string 3',
            'ExpiryMonth': 64,
            'ExpiryYear': 1,
            'IsSwiped': true,
            'PPTransactionID': 1,
            'VantivTransactionID': 1,
            'TCC': 64,
            'DebitCardTypeID': 1
          },
          '_FloorPlanDetail': {
            'TransactionID': 1,
            'AppliedDate': '2018-05-02T22:39:05.7309682-04:00',
            'PaidOffTransactionID': 1,
            'PaidOff': true
          },
          '_ConsignmentDetail': {
            'TransactionID': 1,
            'SuggestedSalePrice': 2.0,
            'PaidOffTransactionID': 1,
            'IsPaidOff': true
          },
          'IsRemoved': true
        },
        'CleanTradeInValue': 1.0,
        'PackFee': 1.0,
        'ChromeStandardOptions': [
          {
            'Category': 'sample string 1',
            'ItemID': 2,
            'Description': 'sample string 3'
          },
          {
            'Category': 'sample string 1',
            'ItemID': 2,
            'Description': 'sample string 3'
          }
        ],
        'ChromeOptionalPackage': [
          {
            'MSRHigh': 1.0,
            'Category': 'sample string 1',
            'ItemID': 2,
            'Description': 'sample string 3'
          },
          {
            'MSRHigh': 1.0,
            'Category': 'sample string 1',
            'ItemID': 2,
            'Description': 'sample string 3'
          }
        ],
        'financeDetail': {
          'VehicleID': 1,
          'APR': 2.0,
          'NoOfPayments': 3,
          'Frequency': 1,
          'DownPaymentPercentage': 4.0,
          'DownPayment': 5.0,
          'PaymentAmount': 6.0,
          'TaxPercentage': 7.0,
          'TaxAmount': 8.0
        }
      }
      this.setState({
        item
      })
    }
  }
  async onSave () {
    if (this.state.vin !== '') {
      this._modalLoadingSpinnerOverLay.show()
      let {
        item, vin, year, make, model, trim, milleage, bodyStyle,
        exteriorColor, interiorColor, interiorSurface,
        warranty, engine, transmission,
        fuelType, driveType, mpgCity, hwy, curbWeight, inStockDate, isNew, doors
      } = this.state
      let _Vehicle = item._Vehicle
      let information = item.information

      _Vehicle = _Vehicle.merge({
        VIN: vin,
        ModelYear: parseInt(year),
        MakeID: make,
        ModelID: model,
        TrimID: trim,
        BodyStyleID: bodyStyle,
        EngineID: engine,
        TransmissionID: transmission,
        FuelTypeID: fuelType,
        DriveTypeID: driveType,
        MPGCity: mpgCity,
        MPGHwy: hwy,
        NoOfDoors: doors
      })
      information = information.merge({
        MileageStatusID: milleage,
        ExteriorColorID: exteriorColor,
        InteriorColorID: interiorColor,
        InteriorSurfaceID: interiorSurface,
        CurbWeight: curbWeight,
        InStockDate: inStockDate,
        IsNew: isNew
      })
      item = item.merge({_Vehicle, information})
      await this.props.saveVehicleDto(item)
      await setTimeout(() => {
        this.props.getSingleVehicle(_Vehicle.VehicleID)
        this._modalLoadingSpinnerOverLay.hide()
        Actions.pop()
      }, 1000)
    }
  }
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }
  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    this.setState({
      models: newProps.model,
      trims: newProps.trim
    })
  }
  componentDidMount () {
    __DEV__ && console.log('model', this.props.model)
    this.setState({
      makes: this.props.make,
      models: this.props.model,
      color: this.props.color,
      trims: this.props.trim,
      bodyStyles: this.props.bodyStyle,
      interiorSurfaces: this.props.interiorSurface,
      engines: this.props.engine,
      transmissions: this.props.transmission,
      fuelTypes: this.props.fuelType,
      driveTypes: this.props.driveType
    })
  }
  handleValueChangeMake (make) {
    __DEV__ && console.log('make', make)
    this.props.getModel(make)
    this.setState({
      make,
      models: this.props.model,
      model: ''
    })
  }
  handleValueChangeModel (model) {
    this.props.getTrim(model)
    this.setState({
      model,
      trims: this.props.trim,
      trim: ''
    })
    __DEV__ && console.log(this.props.trim)
  }
  handlePressCheckedBoxNew = () => {
    this.setState({
      isNew: true
    })
  }

  handlePressCheckedBoxUsed = () => {
    this.setState({
      isNew: false
    })
  }
  handlePressCheckedStop = () => {
    this.setState({
      isStop: true,
      isReady: false
    })
  }
  handlePressCheckedReady = () => {
    this.setState({
      isReady: true,
      isStop: false
    })
  }
  handlePressCheckedCaution = () => {
    this.setState({
      isReady: false,
      isStop: false
    })
  }
  _showDateTimePicker = () => this.setState({isDatePickerVisible: true})

  _hideDateTimePicker = () => this.setState({isDatePickerVisible: false})

  _handleDatePicked = (date) => {
    __DEV__ && console.log('A date has been picked: ', date)
    this.setState({
      inStockDate: date
    })
    this._hideDateTimePicker()
  }
  render () {
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background} />
        <CustomNavBar
          title={'Basic Info'} />
        <Modal
          visible={this.state.showModal}
          onRequestClose={this.toggleModal}>
          <ScanVinScreen
            onSuccess={(e) => {
              __DEV__ && console.log('e', e)
              this.setState({vin: e.data.toString()})
              this.toggleModal()
            }}
            screenProps={{ toggle: this.toggleModal }}
          />
        </Modal>
        <KeyboardAwareScrollView style={styles.container}>
          <View style={[styles.viewItem, {marginTop: 20}]}>
            <Text style={[styles.text, {marginTop: 0}]}>VIN</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput underlineColorAndroid={'transparent'}
                value={this.state.vin}
                onChangeText={(vin) => this.setState({vin})}
                style={[styles.textInput, {flex: 9}]} />
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => this.setState({showModal: true})}
              >
                <Icon name='barcode-scan' size={30} color={'#000000'} />
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>TYPE</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <CheckBox
                label={'Used'}
                labelStyle={styles.label}
                style={{marginRight: 40}}
                checked={!this.state.isNew}
                onPress={this.handlePressCheckedBoxUsed}
                color={'#00c848'}
            />
              <CheckBox
                label={'New'}
                labelStyle={styles.label}
                checked={this.state.isNew}
                onPress={this.handlePressCheckedBoxNew}
                color={'#00c848'}
              />
            </View>
            <Text style={styles.text}>YEAR</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={this.state.year}
              onChangeText={(year) => this.setState({year})}
              style={styles.textInput} />
            <Text style={styles.text}>MAKE</Text>
            <Dropdown
              onChangeText={(make) => this.handleValueChangeMake(make)}
              data={this.state.makes}
              value={this.state.make}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>MODEL</Text>
            <Dropdown
              onChangeText={(model) => this.handleValueChangeModel(model)}
              data={this.state.models}
              value={this.state.model}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>TRIM</Text>
            <Dropdown
              onChangeText={(trim) => this.setState({trim})}
              data={this.state.trims}
              value={this.state.trim}
              valueExtractor={({ TrimID }) => TrimID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>MILLEAGE</Text>
            <Dropdown
              // onChangeText={(make) => this.handleValueChange(make)}
              data={make}
              value={this.state.milleage}
              // valueExtractor={({ ItemID }) => ItemID}
              // labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>BODY STYLE</Text>
            <Dropdown
              onChangeText={(bodyStyle) => this.setState({bodyStyle})}
              data={this.state.bodyStyles}
              value={this.state.bodyStyle}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>EXTERIOR COLOR</Text>
            <Dropdown
              onChangeText={(exteriorColor) => this.setState({exteriorColor})}
              data={this.state.color}
              value={this.state.exteriorColor}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>INTERIOR COLOR</Text>
            <Dropdown
              onChangeText={(interiorColor) => this.setState({interiorColor})}
              data={this.state.color}
              value={this.state.interiorColor}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>INTERIOR SURFACE</Text>
            <Dropdown
              onChangeText={(interiorSurface) => this.setState({interiorSurface})}
              data={this.state.interiorSurfaces}
              value={this.state.interiorSurface}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>WARRANTY</Text>
            <Dropdown
              onChangeText={(make) => this.handleValueChange(make)}
              data={make}
              value={this.state.warranty}
              // valueExtractor={({ ItemID }) => ItemID}
              // labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>ENGINE</Text>
            <Dropdown
              onChangeText={(engine) => this.setState({engine})}
              data={this.state.engines}
              value={this.state.engine}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>TRANSMISSION</Text>
            <Dropdown
              onChangeText={(transmission) => this.setState({transmission})}
              data={this.state.transmissions}
              value={this.state.transmission}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>FUEL TYPE</Text>
            <Dropdown
              onChangeText={(fuelType) => this.setState({fuelType})}
              data={this.state.fuelTypes}
              value={this.state.fuelType}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>DRIVE TYPE</Text>
            <Dropdown
              onChangeText={(driveType) => this.setState({driveType})}
              data={this.state.driveTypes}
              value={this.state.driveType}
              valueExtractor={({ ItemID }) => ItemID}
              labelExtractor={({ Description }) => Description}
            />
            <Text style={styles.text}>DOORS</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={this.state.doors}
              onChangeText={(doors) => this.setState({doors})}
              style={styles.textInput} />
            <Text style={styles.text}>MPG CITY</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={this.state.mpgCity}
              onChangeText={(mpgCity) => this.setState({mpgCity})}
              style={styles.textInput} />
            <Text style={styles.text}>HWY</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={this.state.hwy}
              onChangeText={(hwy) => this.setState({hwy})}
              style={styles.textInput} />
            <Text style={styles.text}>CURB WEIGHT</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={this.state.curbWeight}
              onChangeText={(curbWeight) => this.setState({curbWeight})}
              style={styles.textInput} />
            <TouchableOpacity
              onPress={this._showDateTimePicker}>
              <Text style={styles.text}>IN STOCK</Text>
              <TextInput
                editable={false}
                underlineColorAndroid={'transparent'}
                value={Moment(this.state.inStockDate).format('DD MMMM YYYY')}
                style={styles.textInput} />
            </TouchableOpacity>
            <Text style={styles.text}>LOCATION</Text>
            <Dropdown
              onChangeText={(location) => this.setState({location})}
              value={this.state.location}
            />
            <Text style={styles.text}>Flag</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <CheckBox
                label={'Ready'}
                labelStyle={styles.label}
                style={{marginRight: 40}}
                checked={this.state.isReady}
                onPress={this.handlePressCheckedReady}
                color={'#00c848'}
              />
              <CheckBox
                label={'Caution'}
                labelStyle={styles.label}
                checked={!this.state.isReady && !this.state.isStop}
                onPress={this.handlePressCheckedCaution}
                color={'#00c848'}
              />
              <CheckBox
                label={'Stop'}
                labelStyle={styles.label}
                checked={this.state.isStop}
                onPress={this.handlePressCheckedStop}
                color={'#00c848'}
              />
            </View>
            <Text style={styles.text}>MEMO</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={this.state.memo}
              onChangeText={(memo) => this.setState({memo})}
              style={styles.textInput} />
            <Text style={styles.text}>VEHICLE RECON</Text>
            <Dropdown
              onChangeText={(vehicleRecon) => this.setState({vehicleRecon})}
              value={this.state.vehicleRecon}
            />
            <Text style={styles.text}>SUB TITLE</Text>
            <TextInput underlineColorAndroid={'transparent'}
              value={this.state.subTitle}
              onChangeText={(subTitle) => this.setState({subTitle})}
              style={styles.textInput} />
          </View>
          <View style={{height: 100}} />
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker} />
        </KeyboardAwareScrollView>
        <TouchableOpacity
          onPress={() => this.onSave()}
          style={styles.buttonSave}>
          <Text style={styles.textButton}>SAVE</Text>
        </TouchableOpacity>
        <LoadingSpinnerOverlay
          ref={(component) => { this._modalLoadingSpinnerOverLay = component }} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    make: state.picker.make,
    model: state.picker.model,
    vehicle: state.inventory.vehicle,
    color: state.picker.color,
    id: state.inventory.id,
    trim: state.picker.trim,
    bodyStyle: state.picker.bodyStyle,
    interiorSurface: state.picker.interiorSurface,
    engine: state.picker.engine,
    transmission: state.picker.transmission,
    fuelType: state.picker.fuelType,
    driveType: state.picker.driveType,
    fetching: state.inventory.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getModel: (id) => dispatch(InventoryPickerActions.getModel(id)),
    getTrim: (id) => dispatch(InventoryPickerActions.getTrim(id)),
    saveVehicleDto: (vehicleDTO) => dispatch(InventoryActions.saveVehicleDto(vehicleDTO)),
    getSingleVehicle: bindActionCreators(InventoryActions.getSingleVehicle, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfoScreen)
