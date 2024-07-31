// components/LocationFetcher.js
import { useState } from 'react';


const LocationFetcher = () => {
 const [location, setLocation] = useState(null);


 const fetchLocation = () => {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(position => {
       const { latitude, longitude } = position.coords;


       // Fetch city and pincode based on latitude and longitude
       fetchCityAndPincode(latitude, longitude);
     });
   } else {
     alert('Geolocation is not supported by this browser.');
   }
 };


 const fetchCityAndPincode = async (latitude, longitude) => {
   try {
     const response = await fetch(
       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
     );
     const data = await response.json();
     setLocation({
       city: data.city || data.locality,
       pincode: data.postcode
     });
   } catch (error) {
     console.error('Error fetching city and pincode:', error);
   }
 };


 return (
   <div>
     <button onClick={fetchLocation}> Get Current Location,</button>
     {location && (
       <div >
         <p className='mx-3'>City: {location.city} ,Goa 403001 </p>
       </div>
     )}
   </div>
 );
};


export default LocationFetcher;


