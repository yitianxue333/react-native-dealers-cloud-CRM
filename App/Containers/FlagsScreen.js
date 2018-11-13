import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Switch, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/FlagsScreenStyle'
import { Actions } from 'react-native-router-flux'
const background = require('../Images/AddDeal/background.png')
class FlagsScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      switchValue: false
    }
  }
  _handleToggleSwitch = () => this.setState(state => ({
    switchValue: !state.switchValue
  }));
  render () {
    return (
      <View style={styles.allView}>
        <Image
          style={styles.background}
          source={background} />
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView behavior='position'>
            <View style={[styles.viewItem, {marginTop: 20}]}>
              <View style={{flexDirection: 'row', marginBottom: 5}}>
                <Text style={{flex: 2}}>FLAG</Text>
                <Text style={{flex: 1}}>INCLUDE</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <Text style={{flex: 2}}>Published</Text>
                <View style={{flex: 1}}>
                  <Switch
                    onValueChange={this._handleToggleSwitch}
                    value={this.state.switchValue} />
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <Text style={{flex: 2}}>SpotLight</Text>
                <View style={{flex: 1}}>
                  <Switch
                    onValueChange={this._handleToggleSwitch}
                    value={this.state.switchValue} />
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <Text style={{flex: 2}}>Featured</Text>
                <View style={{flex: 1}}>
                  <Switch
                    onValueChange={this._handleToggleSwitch}
                    value={this.state.switchValue} />
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <Text style={{flex: 2}}>Certified</Text>
                <View style={{flex: 1}}>
                  <Switch
                    onValueChange={this._handleToggleSwitch}
                    value={this.state.switchValue} />
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <Text style={{flex: 2}}>Low Mileage</Text>
                <View style={{flex: 1}}>
                  <Switch
                    onValueChange={this._handleToggleSwitch}
                    value={this.state.switchValue} />
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <Text style={{flex: 2}}>Sold Published</Text>
                <View style={{flex: 1}}>
                  <Switch
                    onValueChange={this._handleToggleSwitch}
                    value={this.state.switchValue} />
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <Text style={{flex: 2}}>Show HighLights</Text>
                <View style={{flex: 1}}>
                  <Switch
                    onValueChange={this._handleToggleSwitch}
                    value={this.state.switchValue} />
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <Text style={{flex: 2}}>Show Car Fax</Text>
                <View style={{flex: 1}}>
                  <Switch
                    onValueChange={this._handleToggleSwitch}
                    value={this.state.switchValue} />
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <Text style={{flex: 2}}>Hide Car Fax Snapshot</Text>
                <View style={{flex: 1}}>
                  <Switch
                    onValueChange={this._handleToggleSwitch}
                    value={this.state.switchValue} />
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <Text style={{flex: 2}}>Frame Damage</Text>
                <View style={{flex: 1}}>
                  <Switch
                    onValueChange={this._handleToggleSwitch}
                    value={this.state.switchValue} />
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <Text style={{flex: 2}}>Reduced Price</Text>
                <View style={{flex: 1}}>
                  <Switch
                    onValueChange={this._handleToggleSwitch}
                    value={this.state.switchValue} />
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <Text style={{flex: 2}}>Local Trade</Text>
                <View style={{flex: 1}}>
                  <Switch
                    onValueChange={this._handleToggleSwitch}
                    value={this.state.switchValue} />
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <Text style={{flex: 2}}>No Haggle Pricing</Text>
                <View style={{flex: 1}}>
                  <Switch
                    onValueChange={this._handleToggleSwitch}
                    value={this.state.switchValue} />
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <Text style={{flex: 2}}>Show CarGurus Link</Text>
                <View style={{flex: 1}}>
                  <Switch
                    onValueChange={this._handleToggleSwitch}
                    value={this.state.switchValue} />
                </View>
              </View>
            </View>
            <View style={{height: 100}} />
          </KeyboardAvoidingView>
        </ScrollView>
        <TouchableOpacity
          onPress={() => Actions.pop()}
          style={styles.buttonSave}>
          <Text style={styles.textButton}>SAVE</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlagsScreen)
