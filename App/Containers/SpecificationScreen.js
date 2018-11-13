import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, WebView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SpecificationScreenStyle'
const background = require('../Images/AddDeal/background.png')
class SpecificationScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      html: ''
    }
  }
  componentDidMount () {
    if (this.props.id === 1) {
      const item = this.props.vehicle.internetMarketing
      if (item.SellerComment !== undefined && item.SellerComment !== null) {
        this.setState({
          html: `<html xmlns="http://www.w3.org/1999/xhtml">
                <body>${item.SellerComment}</body></html>`
        })
      }
    }
  }
  render () {
    return (
      <WebView source={{html: this.state.html}} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    vehicle: state.inventory.vehicle,
    id: state.inventory.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecificationScreen)
