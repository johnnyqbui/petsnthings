import React, { useState } from "react";
import Loader from "react-loader-spinner";
import styles from "../styles/Home.module.css";

const Grid = ({ data, loading }) => {
  const [selectedPet, setSelectedPet] = useState("");
  if (!data) return null;

  return (
    <div className={styles.grid}>
      {loading ? (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          // timeout={3000} //3 secs
        />
      ) : (
        data.map(({ id, primary_photo_cropped, size, species }) => (
          <div
            key={id}
            className={styles.card}
            onClick={() => {
              console.log("clicked pet");
              setSelectedPet(id);
            }}
          >
            <img
              src={primary_photo_cropped && primary_photo_cropped.medium}
              alt={`${size} ${species}`}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Grid;
