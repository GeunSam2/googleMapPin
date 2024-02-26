import axios from "axios";

// google map api
export const getPosFromAddress = async (address: string) => {
    // 주소 인코딩
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_MAP_API_KEY}&language=ko`;
    const response = await axios.get(url);
    const data = response.data;
    console.log(data)
    if (data.status !== "OK") {
        return null;
    }
    const { lat, lng } = data.results[0].geometry.location;
    const formattedAddress = data.results[0].formatted_address;
    return {
        lat,
        lng,
        address,
        formattedAddress,
    };
}
