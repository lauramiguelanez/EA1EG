import styled from 'styled-components';
import { COLORS, MARKER } from '../style-constants';

const MarkerInGroupStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10px;
  min-width: 10px;
  height: 10px;
  min-height: 10px;
  font-size: 12px;
  color: #fff;
  text-transform: uppercase;
  border: 2px solid #fff;
  border-radius: 50%;
  background-color: ${COLORS.gray64};
  background-size: cover;
  background-position: center;
`;
// margin-left: -7px;

export default MarkerInGroupStyled;
