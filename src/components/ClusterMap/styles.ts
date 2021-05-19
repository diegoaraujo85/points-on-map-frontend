import styled from 'styled-components';

import { Icon } from '@iconify/react';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

export const ClusterMarker = styled.div`
  color: #fff;
  background: #1978c8;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const LocationPin = styled(Icon)`
 color: #EA4335;
 width: 24px;
 height: 24px;
 display: flex;
 justify-content: center;
 align-items: center;
`;

export const Point = styled.div`
  background: none;
  border: none;
`
export const PointImage = styled.img`
  width: 25px;
  `
