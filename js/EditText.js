import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';


var iface = {
  name: 'EditText',
  propTypes: {
    hint: PropTypes.string,
  },
};

module.exports = requireNativeComponent('RTCEditText', iface);
