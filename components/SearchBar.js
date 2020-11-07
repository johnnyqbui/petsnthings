import React, { useState } from 'react';

const SearchBar = ({placeholder, onSubmit}) => {
  const [value, setValue] = useState('');

  return (
    <div>
      <input type="search" placeholder={placeholder} onChange={(e) => setValue(e.currentTarget.value)}/>
      <input type="button" value="Submit" onClick={() => {
        onSubmit(value)
      }}/>
      <input type="button" value="Current Location" onClick={() => {
        navigator.geolocation.getCurrentPosition(success, denied);

        function success(info) {
          const coords = info.coords.latitude + "," + info.coords.longitude;
          onSubmit(coords)
        }
      
        function denied(info) {
          console.log(info.message);
        }
      }}/>
    </div>
  )
}

export default SearchBar