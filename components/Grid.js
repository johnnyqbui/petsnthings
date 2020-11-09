import React, { useState } from "react";
import styles from "../styles/Home.module.css";

const Grid = ({ data, isLoading }) => {
  console.log({ data });
  const [isHovering, setIsHovering] = useState(false);
  const [selectedPet, setSelectedPet] = useState("");
  if (!data) return null;

  return (
    <div className={styles.grid}>
      {data.map(({ id, photos, primary_photo_cropped, size, species }) => (
        <div
          key={id}
          className={styles.card}
          onClick={() => {
            console.log("clicked pet");
            setSelectedPet(id);
          }}
          onMouseOver={() => {
            console.log("hover");
            setIsHovering(true);
          }}
          onMouseOut={() => {
            console.log("not hovering");
            setIsHovering(false);
          }}
          onMouseMove={e => {
            console.log("client x", e.clientX);
            console.log("screen x", e.screenX);
            console.log("move", { e });
          }}
        >
          <img
            src={primary_photo_cropped && primary_photo_cropped.medium}
            alt={`${size} ${species}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Grid;
