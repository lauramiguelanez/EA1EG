import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
/* import Marker from '../Marker';
import MarkerGroup from './MarkerGroup';
import MarkerCounter from './MarkerCounter'; */
import SemiCircle from './SemiCircle';
import ToolTip from '../ToolTip'

class ClusterMarker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    clusterFaceMarkers: this.props.points.slice(0, 2)
  };

  render() {
    return (
      <div className="tooltip" length={this.props.points.length} onClick={this.props.onClick}>
        <ToolTip indicator={this.props.indicator}/>
        {this.props.points.length > 2 && (
          <SemiCircle><span>{this.props.points.length - 1}</span></SemiCircle>
        )}
      </div>
    );
  }
}

ClusterMarker.propTypes = {
  points: PropTypes.array,
  users: PropTypes.instanceOf(List),
  selected: PropTypes.bool
};

export default ClusterMarker;
