import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Platform,
} from 'react-native';

import FingerprintScanner from 'react-native-fingerprint-scanner';
// import styles from './FingerprintPopup.component.styles';
// import ShakingText from './ShakingText.component';

// - this example component supports both the
//   legacy device-specific (Android < v23) and
//   current (Android >= 23) biometric APIs
// - your lib and implementation may not need both
class AndroidTouchId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessageLegacy: undefined,
      biometricLegacy: undefined,
    };

    this.description = null;
  }

  componentDidMount() {
    if (this.requiresLegacyAuthentication()) {
      this.authLegacy();
    } else {
      this.authCurrent();
    }
  }

  componentWillUnmount = () => {
    FingerprintScanner.release();
  };

  requiresLegacyAuthentication() {
    console.log('Platform.Version', Platform.Version);
    return Platform.Version < 23;
  }

  authCurrent() {
    /////안드로이드

    FingerprintScanner.authenticate({title: 'Log in with Biometrics'}).then(
      () => {
        console.log('success');
        console.log('Androidsuccess');
        this.props.onAuthenticate();
      },
    );
  }

  authLegacy() {
    FingerprintScanner.authenticate({
      onAttempt: this.handleAuthenticationAttemptedLegacy,
    })
      .then(() => {
        this.props.handlePopupDismissedLegacy();
      })
      .catch((error) => {
        this.setState({
          errorMessageLegacy: error.message,
          biometricLegacy: error.biometric,
        });
        this.description.shake();
      });
  }

  handleAuthenticationAttemptedLegacy = (error) => {
    this.setState({errorMessageLegacy: error.message});
    this.description.shake();
  };

  renderLegacy() {
    const {errorMessageLegacy, biometricLegacy} = this.state;
    const {handlePopupDismissedLegacy} = this.props;

    return (
      <View>
        <View>
          <Text>Biometric{'\n'}Authentication</Text>
          <ShakingText
            ref={(instance) => {
              this.description = instance;
            }}>
            {errorMessageLegacy ||
              `Scan your ${biometricLegacy} on the\ndevice scanner to continue`}
          </ShakingText>

          <TouchableOpacity onPress={handlePopupDismissedLegacy}>
            <Text>BACK TO MAIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render = () => {
    if (this.requiresLegacyAuthentication()) {
      console.log('2323232');
      return this.renderLegacy();
    }

    // current API UI provided by native BiometricPrompt
    return null;
  };
}

AndroidTouchId.propTypes = {
  // onAuthenticate: PropTypes.func.isRequired,
  handlePopupDismissedLegacy: PropTypes.func,
  style: ViewPropTypes.style,
};

export default AndroidTouchId;
