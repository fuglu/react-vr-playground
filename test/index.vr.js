import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Image,
  VrButton,
} from 'react-vr';
import {Endpoint} from 'react-native-pjsip';


export default class test extends React.Component {
  constructor(props) {
    super(props);

    let configuration = {
        "name": "John",
        "username": "xxxxxxxx",
        "domain": "tls01.sipgate.de",
        "password": "xxxxxxxxx",

    };
    let endpoint = new Endpoint();
    console.log(endpoint);
    endpoint.start().then(() => {
      endpoint.createAccont(configuration).then(() => {
        this.state = {
          account,
          number: '',

        }
      })
    });


  }

  initCall = () => {
    this.state.ua.call(
      `sip:${this.state.number}@sipgate.de`,
      mediaConstraints: { audio: true, video: false },
    );
  }

  dial = number => () => {
    this.setState({
      number: this.state.number + number,
    });
  }

  renderCallButton = number => {
    return (
        <VrButton
          onClick={this.initCall}
        >
          <Text
            style={{
              width: 0.2,
              height: 0.2,
              borderRadius: 1,
              backgroundColor: '#777879',
              layoutOrigin: [0.5, 0.5],
              textAlign: 'center',
              textAlignVertical: 'center',
              transform: [{translate: [0, 0, -3]}],
            }}>
            {'Call'}
          </Text>
        </VrButton>
    )
  }

  renderDialpadButton = (number) => {
    return (
        <VrButton
          onClick={this.dial(number)}
          onClickSound={{
            wav: asset('dtmf-' + number + '.wav')
          }}>
          <Text
            style={{
              width: 0.2,
              height: 0.2,
              borderRadius: 1,
              backgroundColor: '#777879',
              layoutOrigin: [0.5, 0.5],
              textAlign: 'center',
              textAlignVertical: 'center',
              transform: [{translate: [0, 0, -3]}],
            }}>
            {number}
          </Text>
        </VrButton>
    )
  }
  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              height: 0.2,
              backgroundColor: '#777879',
              layoutOrigin: [0.5, 0.5],
              textAlign: 'center',
              textAlignVertical: 'center',
              transform: [{translate: [0, 0, -3]}],
            }}>
            {this.state.number}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          {this.renderDialpadButton(1)}
          {this.renderDialpadButton(2)}
          {this.renderDialpadButton(3)}
        </View>
        <View style={{flexDirection: 'row'}}>
          {this.renderDialpadButton(4)}
          {this.renderDialpadButton(5)}
          {this.renderDialpadButton(6)}
        </View>
        <View style={{flexDirection: 'row'}}>
          {this.renderDialpadButton(7)}
          {this.renderDialpadButton(8)}
          {this.renderDialpadButton(9)}
        </View>
        <View style={{flexDirection: 'row'}}>
          {this.renderDialpadButton(0)}
          {this.renderCallButton()}
        </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('test', () => test);
