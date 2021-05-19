import React from 'react';

// import { Container } from './styles';
interface MarkerProps {
  // children: JSX.Element;
  lat: number;
  lng: number;
  style?: any;
}
const Marker: React.FC<MarkerProps> = ({ children, ...rest }) => {
  return (
    <div {...rest}>
      {children}
    </div>
  );
}

export default Marker;
