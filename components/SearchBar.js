import React, { useState, useEffect } from "react";

const SearchBar = ({
  placeholder,
  value,
  onSubmitInputClick,
  onSubmitLocationClick
}) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(value);
  }, [value]);

  return (
    <div>
      <input
        value={input}
        type="search"
        placeholder={placeholder}
        onChange={e => setInput(e.currentTarget.value)}
      />
      <input
        type="button"
        value="Submit"
        onClick={() => {
          onSubmitInputClick(input);
        }}
      />
      <input
        type="button"
        value="Current Location"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(success, denied);

          async function success(info) {
            const coords = info.coords.latitude + "," + info.coords.longitude;
            onSubmitLocationClick(coords);
          }

          function denied(info) {
            console.log(info.message);
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
