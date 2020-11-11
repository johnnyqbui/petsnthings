import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

const Grid = ({ data }) => {
  console.log({ data });
  const [isHovering, setIsHovering] = useState(false);
  const [selectedPet, setSelectedPet] = useState("");
  if (!data) return null;

  return (
    <div className={styles.grid}>
      {data.map(animal => (
        <Image animal={animal} />
      ))}
    </div>
  );
};

export default Grid;

const Image = ({
  animal: { id, photos, primary_photo_cropped, size, species }
}) => {
  const [hoveringSelectedPhoto, setHoveringSelectedPhoto] = useState(
    primary_photo_cropped.medium
  );

  const photoCount = Array.from(Array(photos.length).keys());

  return (
    <div
      key={id}
      className={styles.card}
      style={{
        display: "flex",
        flexWrap: "wrap"
      }}
      onClick={() => {
        console.log("clicked pet");
        setSelectedPet(id);
      }}
      // onMouseOver={() => {
      //   console.log("hover");
      //   setHovering({ photos });
      // }}
      // onMouseOut={() => {
      //   console.log("not hovering");
      //   setHovering({});
      // }}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const divided = width / photos.length;

        photoCount.forEach(count => {
          const photoPosition = divided * count;
          if (x > photoPosition) {
            const selectedPhoto = photos[count].medium;
            setHoveringSelectedPhoto(selectedPhoto);
          }
        });
      }}
    >
      <img src={hoveringSelectedPhoto} alt={`${size} ${species}`} />
      <div>
        {photoCount.map(() => {
          return <span>-</span>;
        })}
      </div>
    </div>
  );
};

// const useHoverImage = (image) => {
//   const [hovering, setHovering] = useState({});
//   return hovering;
// }
