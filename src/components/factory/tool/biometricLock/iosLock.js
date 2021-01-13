import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import {AlertIOS} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

class IOSTouchID extends Component {
  componentDidMount() {
    FingerprintScanner.authenticate({
      description: 'Scan your fingerprint on the device scanner to continue',
    })
      .then(() => {
        this.props.handlePopupDismissed();
        // AlertIOS.alert('Authenticated successfully');
        console.log('sucsess');
        console.log('IOSsucsess');
      })
      .catch((error) => {
        console.log('IOSfail');
        this.props.handlePopupDismissed();
        // AlertIOS.alert(error.message);
        console.log(error.message);
      });
  }

  render() {
    return false;
  }
}

IOSTouchID.propTypes = {
  handlePopupDismissed: PropTypes.func.isRequired,
};

export default IOSTouchID;
