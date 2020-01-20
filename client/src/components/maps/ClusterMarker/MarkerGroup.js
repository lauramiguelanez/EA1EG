import styled from 'styled-components';
import { easyMove, MARKER } from '../style-constants';

const MarkerGroup = styled.div`
  display: flex;
  width: ${props => (props.length === 2 ? '55px' : '55px')};
  background: #fff;
  border-radius: 100px;
  animation: ${easyMove} 0.3s;
  background-color: #fff;
  `;

export default MarkerGroup;
