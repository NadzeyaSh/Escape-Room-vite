import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {BookingCard, City} from '../../types/types';
import 'leaflet/dist/leaflet.css';

enum MarkerIcon {
  Default = 'markup/img/svg/pin-default.svg',
  Current = 'markup/img/svg/pin-active.svg',
}

type MapProps = {
  city: City;
  points?: BookingCard[];
  selectedPoint?: string | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: MarkerIcon.Default,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: MarkerIcon.Current,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

function Map(props: MapProps): JSX.Element {
  const {city, points, selectedPoint} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  useEffect(() => {
    if (map) {
      map.flyTo([city.coords[0], city.coords[1]], city.zoom);
    }
  }, [city, map]);


  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points?.forEach((point) => {
        const marker = new Marker({
          lat: point.location.coords[0],
          lng: point.location.coords[1]
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
