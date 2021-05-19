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

  const [places, setPlaces] = useState<Coordinates[]>([]);

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  const getData = () => {
    fetch('poi copy.json', options)
      .then(function (response) {
        console.log(response)
        return response.json();
      })
      .then(function (myJson) {
        myJson.map((place: Coordinates) => {
          const { latitude, longitude } = place;
          delete place.latitude;
          delete place.longitude;
          return Object.assign(place, { lat: latitude, lng: longitude })
        })
        setPlaces(myJson)
      });
  }

  useEffect(() => {
    // getData()
  }, [])

  return (

    <ClusterMap />

  )
};

export default App;
