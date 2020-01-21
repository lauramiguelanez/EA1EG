import { keyframes } from 'styled-components';

export const COLORS = {
  gray64: '#ea0032',
};

export const MARKER = {
  size: 30,
  sizeGroup: 50,
  fontSize: 14,
  border: '2px solid #fff',
  color: '#fff',
  padding: 0,
};

export const easyMove = keyframes`
  from {
    transform: translateY(-20%);
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
