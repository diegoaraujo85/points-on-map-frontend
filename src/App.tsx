import React, { useEffect, useState } from 'react';

import ClusterMap from './components/ClusterMap';

interface Coordinates {
  name: string;
  latitude?: number;
  longitude?: number;
  lat: number;
  lng: number;
}

interface Coords {
  lat: number;
  lng: number;
}

const App: React.FC = () => {


  return (

    <ClusterMap />

  )
};

export default App;
