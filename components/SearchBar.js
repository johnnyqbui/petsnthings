import React, { useState, useEffect } from "react";

const SearchBar = ({
  placeholder,
  value,
  onSubmitInputClick,
  onSubmitLocationClick
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(value);
  }, [value]);

  return (
    <div>
      <div>
        <input
          disabled={isLoading}
          style={{
            display: "flex",
            border: "1px solid black",
            padding: 15,
            borderRadius: 5,
            fontSize: 26
          }}
          value={input}
          type="search"
          placeholder={placeholder}
          onChange={e => setInput(e.currentTarget.value)}
        />
      </div>

      <input
        type="button"
        value="Submit"
        onClick={() => {
          onSubmitInputClick(input);
        }}
      />
      <input
        disabled={isLoading}
        type="button"
        value="Current Location"
        onClick={() => {
          setIsLoading(true);
          navigator.geolocation.getCurrentPosition(success, denied);

          async function success(info) {
            const coords = info.coords.latitude + "," + info.coords.longitude;
            onSubmitLocationClick(coords);
            setIsLoading(false);
          }

          function denied(info) {
            console.log(info.message);
            setIsLoading(false);
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
