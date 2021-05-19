import GoogleMapReact, {
  ChangeEventValue,
  ChildComponentProps,
  ClickEventValue,
  Coords,
  Heatmap,
  MapOptions,
  MapTypeStyle,
  Point,
  Props
} from 'google-map-react';
import React, { useRef, useState } from 'react';
import useSwr from 'swr';
import useSupercluster from 'use-supercluster';

import { ClusterMarker, Container } from './styles';

const url = "http://localhost:3333/points";
const options = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}
const fetcher = () => fetch(url, options).then(response => response.json());

interface MarkerProps {
  children: JSX.Element;
  lat: number;
  lng: number;
}

const Marker = ({ children }: MarkerProps) => children;

interface Coordinates {
  name: string;
  latitude: number;
  longitude: number;
}

interface Map {
  setZoom(): void;
  panTo(): void;
}

const ClusterMap: React.FC = () => {

  const mapRef = useRef<GoogleMapReact>();
  const [bounds, setBounds] = useState([0, 0, 0, 0]);
  const [zoom, setZoom] = useState(10);
  const [map, setMap] = useState(null);

  const [center, setCenter] = useState({
    lat: -23.6646431,
    lng: -46.6395025
  });

  const numberOfPointsToLoad = 50000;

  const { data, error } = useSwr(url, { fetcher });
  const coords = data && !error ? data.slice(0, numberOfPointsToLoad) : [];
  // console.log(coords)

  const points = coords.map((coord: Coordinates, index: number) => ({
    type: "Feature",
    properties: { cluster: false, pointId: index },
    geometry: {
      type: "Point",
      coordinates: [
        (coord.longitude),
        (coord.latitude)
      ]
    }
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  return (
    <Container>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDO-L-E0pIejkcxb9BNCU0G_CPRBg_nKKc' }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
          // console.log(map)
          setMap(map);
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat
          ]);
        }}
      >
        {clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                <ClusterMarker
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    setZoom(expansionZoom);
                    // mapRef.current.panTo({ lat: latitude, lng: longitude }) : null;
                  }}
                >
                  {pointCount}
                </ClusterMarker>
              </Marker>
            );
          }

          return (
            <Marker
              key={`point-${cluster.properties.pointId}`}
              lat={latitude}
              lng={longitude}
            >
              <></>
            </Marker>
          );
        })}
      </GoogleMapReact>
    </Container>
  );
}

export default ClusterMap;
