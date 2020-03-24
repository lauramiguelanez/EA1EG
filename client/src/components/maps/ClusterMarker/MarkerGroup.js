import styled from 'styled-components';
import { easyMove, MARKER } from '../style-constants';

const MarkerGroup = styled.div`
  display: flex;
  width: '0px';
  background: #fff;
  border-radius: 100px;
  animation: ${easyMove} 0.3s;
  background-color: #fff;
  &:hover {
    transform: scale(1.2);
    transform-origin: 50% 50%;
  }
  `;

export default MarkerGroup;
