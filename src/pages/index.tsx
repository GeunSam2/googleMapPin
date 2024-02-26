import React, { useState } from 'react';
import Map from '../module/client/main/Map';
import axios from 'axios';

export default function Home() {
  const [address, setAddress] = useState('');
  const [locations, setLocations] = useState([{
    lat: 37.5649867,
    lng: 126.985575,
    address: '서울특별시 중구 을지로 51',
    formattedAddress: '서울특별시 중구 을지로 51'
  }]);

  const handleGeocodeAddress = async () => {
    event?.preventDefault()
    if (!address.trim()) return; // 주소가 비어있는 경우 바로 반환

    console.log(address.split('\n'))

    const payload = {
      addresses: address.split('\n')
    };

    const apiUrl = `/api/address/validate`;
    try {
      const response = await axios.post(apiUrl, payload);
      const { locations } = response.data;
      console.log(locations);
      setLocations(locations);
    } catch (error) {
      console.error('Error fetching location data:', error);
      // 에러 처리 로직 (예: 사용자에게 오류 메시지 표시)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <Map locations={locations} />
      <section className="bg-gray-2 rounded-xl">
        <div className="p-4 shadow-md w-">
          <form className="space-y-4">

            <div className="w-[75rem]">
              <label className="sr-only" htmlFor="message">Message</label>

              <textarea
                className="textarea textarea-solid max-w-full"
                placeholder="Enter an address" rows={10} id="message"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <button
                onClick={handleGeocodeAddress}
                className="rounded-lg btn btn-primary btn-block">
                Search
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
