import styled from 'styled-components';
import { COLORS, MARKER } from '../style-constants';

const size = 20;
const fontSize = 12;
const SemiCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${size * 2}px;
  min-width: ${size * 2}px;
  height: ${size}px;
  min-height: ${size}px;

  text-align: center;
  font-size: ${fontSize}px;

  border-bottom-left-radius: ${size * 2}px;
  border-bottom-right-radius: ${size * 2}px;

  color: #000;
  background-color: #e9521e;
`;

export default SemiCircle;
