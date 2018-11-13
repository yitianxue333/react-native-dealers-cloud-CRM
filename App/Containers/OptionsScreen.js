import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions, ActionConst } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import InventoryActions from '../Redux/InventoryRedux'
// Styles
import styles from './Styles/OptionsScreenStyle'
import CustomNavBar from '../Components/CustomNavBar'
import SectionedMultiSelect from '../Vendor/SelectionedMultiSelect'

const background = require('../Images/AddDeal/background.png')

class OptionsScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedItems: [],
      exterior: [],
      interior: [],
      mechanical: [],
      safety: [],
      entertainment: [],
      other: [],
      feed: [],
      options: []
    }
    this.onSelectedItemsChange = this.onSelectedItemsChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  async componentWillMount () {
    if (this.props.id === 1) {
      await this.props.getVehicleOptions(
        this.props.vehicle._Vehicle.DealershipID
      )
    }
  }

  async componentWillReceiveProps (nextProps) {
    if (!nextProps.fetching && nextProps.vehicleOptions !== []) {
      this.filterVehicleOptions(nextProps.vehicleOptions)
    }
    if (!nextProps.fetching && this.props.vehicle.options) {
      this.setState({selectedItems: this.props.vehicle.options})
    }
  }

  filterVehicleOptions (vehicleOptions) {
    let exterior = []
    let interior = []
    let mechanical = []
    let safety = []
    let entertainment = []
    let other = []
    let feed = []
    let feedChecked = []
    const {vehicle} = this.props
    for (let i = 0; i <= vehicleOptions.length - 1; i++) {
      if (vehicleOptions[i].OptionTypeID === 1) {
        exterior.push(vehicleOptions[i])
      }
      if (vehicleOptions[i].OptionTypeID === 2) {
        interior.push(vehicleOptions[i])
      }
      if (vehicleOptions[i].OptionTypeID === 3) {
        mechanical.push(vehicleOptions[i])
      }
      if (vehicleOptions[i].OptionTypeID === 4) {
        safety.push(vehicleOptions[i])
      }
      if (vehicleOptions[i].OptionTypeID === 5) {
        entertainment.push(vehicleOptions[i])
      }
      if (vehicleOptions[i].OptionTypeID === 6) {
        other.push(vehicleOptions[i])
      }
      if (vehicleOptions[i].OptionTypeID === 7) {
        feed.push(vehicleOptions[i])
      }
    }
    feed.forEach((e1) => vehicle.options.forEach((e2) => {
      if (e1.OptionID === e2) {
        feedChecked.push(e1)
      }
    }))
    this.setState({
      options: [
        {
          Description: 'Exterior',
          OptionID: 1,
          children: exterior
        },
        {
          Description: 'Interior',
          OptionID: 2,
          children: interior
        },
        {
          Description: 'Mechanical',
          OptionID: 3,
          children: mechanical
        },
        {
          Description: 'Safety',
          OptionID: 4,
          children: safety
        },
        {
          Description: 'Entertainment',
          OptionID: 5,
          children: entertainment
        },
        {
          Description: 'Other',
          OptionID: 6,
          children: other
        },
        {
          Description: 'Feed',
          OptionID: 7,
          children: feedChecked
        }
      ]
    })
  }

  onSelectedItemsChange (selectedItems) {
    this.setState({ selectedItems: selectedItems })
  }

  render () {
    console.log(this.state)
    console.log(this.props)
    const {
      options
    } = this.state
    return (
      <View style={styles.allView}>
        <Image style={styles.background} source={background} />
        <CustomNavBar title={'Options'} />
        <KeyboardAwareScrollView style={[styles.container, {marginBottom: 80}]}>
          <View style={[styles.viewItem, { marginTop: 20 }]}>
            <Text style={[styles.text, { marginTop: 0 }]}>OPTIONS:</Text>
            {
              options !== []
              ? <SectionedMultiSelect
                items={options}
                uniqueKey='OptionID'
                subKey='children'
                displayKey='Description'
                readOnlyHeadings
                showCancelButton
                alwaysShowSelectText
                hideSelect={false}
                itemNumberOfLines={1}
                showRemoveAll
                expandDropDowns
                showChips={false}
                hideSearch
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={this.state.selectedItems}
              />
              : null
            }
          </View>
        </KeyboardAwareScrollView>
        <TouchableOpacity
          onPress={() => console.log('save')}
          style={styles.buttonSave}>
          <Text style={styles.textButton}>SAVE</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  userID: state.auth.userID,
  vehicle: state.inventory.vehicle,
  id: state.inventory.id,
  vehicleOptions: state.inventory.vehicleOptions
})

const mapDispatchToProps = (dispatch) => ({
  getVehicleOptions: (dealershipId) =>
    dispatch(InventoryActions.getVehicleOptions(dealershipId)),
  saveVehicleDto: (vehicleDTO, userID) => {
    dispatch(InventoryActions.saveVehicleDto(vehicleDTO, userID))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionsScreen)
