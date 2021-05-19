import locationIcon from '@iconify/icons-mdi/map-marker';
import { Icon } from '@iconify/react';

interface Props {
  text: string;
  lat: number;
  lng: number;
}

const LocationPin: React.FC<Props> = ({ text, ...rest }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

export default LocationPin
