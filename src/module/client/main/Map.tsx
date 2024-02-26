import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { info } from 'console';

const containerStyle = {
  width: '1200px',
  height: '650px'
};

interface MapProps {
  locations: {
    lat: number
    lng: number
    address: string
    formattedAddress: string
  }[]
};

const OPTIONS = {
  minZoom: 12,
  maxZoom: 18,
}

function Map({ locations }: MapProps) {
  console.log(locations)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB3_AOveKP0EkGTUzwWjLi2r_LMPkP7kWo',
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(locations[0]);
    map.fitBounds(bounds);

    setMap(map)
  }, [locations])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={locations[0]}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={OPTIONS}
    >
      {locations.map((location, index) => {
        const infoWindow = new google.maps.InfoWindow({
          content: `<div>
          입력한 주소 : ${location.address}<br>
          계산된 주소 : ${location.formattedAddress}<br>
          </div>`,
          pixelOffset: new google.maps.Size(0, -30)
        });
        return (
          <Marker key={index} position={location}
            onClick={(e) => {
              infoWindow.close()
              infoWindow.setPosition({ lat: location.lat, lng: location.lng });
              infoWindow.open(map);
            }}
          />
        )
      })}
    </GoogleMap>
  ) : <></>
}

export default React.memo(Map)