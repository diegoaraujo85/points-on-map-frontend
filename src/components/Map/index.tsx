import GoogleMapReact from 'google-map-react';
import React from 'react';

import LocationPin from './LocationPin';

interface Coordinates {
  address: string;
  lat: number;
  lng: number;
}

interface Props {
  location: Coordinates;
  zoomLevel: number;

}

const Map: React.FC<Props> = ({ location, zoomLevel, ...rest }) => (
  <div className="map">
    <h2 className="map-h2">Come Visit Us At Our Campus</h2>

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDO-L-E0pIejkcxb9BNCU0G_CPRBg_nKKc' }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
        style={{ height: '100%' }}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div>
  </div>
)
export default Map;
