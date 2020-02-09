import React from 'react';
import PropTypes from 'prop-types';

import MarkerStyled from './MarkerStyled';
import MarkerInGroupStyled from './MarkerInGroupStyled';

class Marker extends React.PureComponent {
  static defaultProps = {
    inGroup: false
  };

  render() {
    const { info,onClick } = this.props;
    return (
      <button onClick={onClick}>
        {this.props.inGroup ? (
          <MarkerInGroupStyled />
        ) : (
          <MarkerStyled tooltip={(info && info.indicator )|| 'tooltip'} />
        )}
      </button>
    );
  }
}

Marker.propTypes = {
  inGroup: PropTypes.bool
};

export default Marker;
