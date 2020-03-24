import React from 'react';
import PropTypes from 'prop-types';

import MarkerStyled from './MarkerStyled';
import MarkerInGroupStyled from './MarkerInGroupStyled';
import ToolTip from '../ToolTip';

class Marker extends React.PureComponent {
  static defaultProps = {
    inGroup: false
  };

  render() {
    const { onClick, id } = this.props;
    // console.log('info', this.props);
    return (
      <button
        className="tooltip"
        onClick={() => onClick(id)}
        style={{ width: '0px', height: '0px', border: 'none', backgroundColor: 'transparent' }}
      >
      <ToolTip indicator={this.props.indicator}/>
        {this.props.inGroup ? <MarkerInGroupStyled /> : <MarkerStyled />}
      </button>
    );
  }
}

Marker.propTypes = {
  inGroup: PropTypes.bool
};

export default Marker;
