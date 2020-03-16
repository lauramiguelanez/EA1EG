import styled from 'styled-components';
import { COLORS,MARKER } from '../style-constants';

const MarkerCounter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10px;
  min-width: 10px;
  height: 10px;
  min-height: 10px;
  padding: 8px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  background-color: ${COLORS.gray64};
  `;
  // margin-left: -10px;
  
export default MarkerCounter;
