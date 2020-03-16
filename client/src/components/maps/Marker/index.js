import React from 'react';
import PropTypes from 'prop-types';

import MarkerStyled from './MarkerStyled';
import MarkerInGroupStyled from './MarkerInGroupStyled';

class Marker extends React.PureComponent {
  static defaultProps = {
    inGroup: false
  };

  render() {
    const { info, onClick } = this.props;
    console.log('info', info);
    return (
      <button
        onClick={onClick}
        style={{ width: '0px', height: '0px', border: 'none', backgroundColor: 'transparent' }}
      >
        {this.props.inGroup ? (
          <MarkerInGroupStyled />
        ) : (
          <MarkerStyled tooltip={(info && info.indicator) || 'tooltip'} />
        )}
      </button>
    );
  }
}

Marker.propTypes = {
  inGroup: PropTypes.bool
};

export default Marker;
