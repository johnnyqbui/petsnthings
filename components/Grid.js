import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

const Grid = ({ data, onClickItem }) => {
  if (!data) return null;

  return (
    <div className={styles.grid}>
      {data.map(animal => (
        <Image animal={animal} onClickItem={onClickItem} />
      ))}
    </div>
  );
};

export default Grid;

const Image = ({ animal, onClickItem }) => {
  const { id, photos, primary_photo_cropped, size, species } = animal;
  const [hoveringSelectedPhoto, setHoveringSelectedPhoto] = useState({
    count: 0,
    photo: primary_photo_cropped.medium
  });

  const photoCount = Array.from(Array(photos.length).keys());
  return (
    <div
      key={id}
      className={styles.card}
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: 0
      }}
      onClick={() => onClickItem(animal)}
      onMouseMove={({ currentTarget, clientX }) => {
        // Calculate mouse and photo positions
        const { left, width } = currentTarget.getBoundingClientRect();
        const x = clientX - left;
        const photoPosition = width / photos.length;

        photoCount.forEach(
          count =>
            x > photoPosition * count &&
            setHoveringSelectedPhoto({
              photo: photos[count].medium,
              count
            })
        );
      }}
    >
      <img
        style={{ width: "100%", height: "100%" }}
        src={hoveringSelectedPhoto.photo}
        alt={`${size} ${species}`}
      />
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          position: "relative",
          bottom: 40
        }}
      >
        {photoCount.map(count => (
          <span
            style={{
              marginRight: 10,
              border: "10px solid silver",
              borderRadius: 15,
              borderColor:
                hoveringSelectedPhoto.count === count ? "#ff0057" : "silver",
              opacity: "80%"
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};
