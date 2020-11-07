import React, { useState } from 'react';
import styles from "../styles/Home.module.css";

const Grid = ({data}) => {
  const [selectedPet, setSelectedPet] = useState('');
  console.log({data})
  if (!data) return null;

  return (
    <div className={styles.grid}>
      {
        data.map(({id, primary_photo_cropped, size, species}) => 
        <div key={id} className={styles.card} onClick={() => {
          console.log('clicked pet')
        }}>
          <img 
            src={primary_photo_cropped && primary_photo_cropped.medium} 
            alt={`${size} ${species}`} 
          />
        </div>
        )
      }
    </div>
  )
}

export default Grid