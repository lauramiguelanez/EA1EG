import styled from 'styled-components';
import { COLORS, easyMove } from '../style-constants';

const MarkerStyled = styled.div`
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
  transition: transform 0.3s;
  animation: ${easyMove} 0.3s;

  &:hover {
    transform: scale(1.2);
  }
`;

export default MarkerStyled;
