import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FingerprintScanner from 'react-native-fingerprint-scanner';

class IOSTouchID extends Component {
  componentDidMount() {
    FingerprintScanner.authenticate({
      description: 'Scan your fingerprint on the device scanner to continue',
    })
      .then(() => {
        this.props.handlePopupDismissed();
      })
      .catch((error) => {
        this.props.handlePopupDismissed();
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
