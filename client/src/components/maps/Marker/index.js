import React from 'react';
import PropTypes from 'prop-types';

import MarkerStyled from './MarkerStyled';
import MarkerInGroupStyled from './MarkerInGroupStyled';
import MarkerIcon from '../MarkerIcon';

class Marker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    inGroup: false,
  };

  render() {
    return (
      <div>
        {this.props.inGroup
          ? <MarkerInGroupStyled>
              {/* <MarkerIcon scale="1.0" /> */}
            </MarkerInGroupStyled>
          : <MarkerStyled>
              {/* <MarkerIcon scale="0.05" /> */}
            </MarkerStyled>}
      </div>
    );
  }
}

Marker.propTypes = {
  inGroup: PropTypes.bool,
};

export default Marker;
