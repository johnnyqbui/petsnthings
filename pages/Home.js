import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// slices
import { authenticate, AuthSelector } from "../slices/auth";
import {
  reverseGeocode,
  setLocation,
  CurrentLocationSelector
} from "../slices/currentLocation";
import { fetchPets, PetsSelector } from "../slices/pets";

// components
import SearchBar from "../components/SearchBar";
import Grid from "../components/Grid";

export default function Home() {
  const dispatch = useDispatch();
  const {
    loading: authLoading,
    hasErrors: authErrors,
    data: authData
  } = useSelector(AuthSelector);
  const {
    loading: petsLoading,
    hasErrors: petsErrors,
    data: petsData
  } = useSelector(PetsSelector);
  const {
    loading: currentLocationLoading,
    hasErrors: currentLocationErrors,
    data: currentLocationData
  } = useSelector(CurrentLocationSelector);

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);

  console.log({ currentLocationData, currentLocationLoading });

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to Pets N' Things!</h1>
      <SearchBar
        placeholder="Search by City, State, Zip Code"
        value={currentLocationData}
        onSubmitLocationClick={coords => {
          dispatch(reverseGeocode(coords));
          dispatch(setLocation(coords));
          dispatch(fetchPets(authData, coords));
        }}
        onSubmitInputClick={input => {
          dispatch(setLocation(input));
          dispatch(fetchPets(authData, input));
        }}
      />
      <Grid data={petsData.animals} loading={currentLocationLoading} />

      <p className={styles.description}>
        Get started by editing{" "}
        <code className={styles.code}>pages/index.js</code>
      </p>

      <div className={styles.grid}>
        <ul>
          {/* {petsData.organizations.map(
              ({
                address,
                adoption,
                distance,
                email,
                hours,
                id,
                mission_statement,
                name,
                phone,
                photos,
                social_media,
                url,
                website,
                _links,
              }) => {
                return <li key={id}>{name}</li>;
              }
            )} */}
        </ul>
        <a href="https://nextjs.org/docs" className={styles.card}>
          <h3>Documentation &rarr;</h3>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a href="https://nextjs.org/learn" className={styles.card}>
          <h3>Learn &rarr;</h3>
          <p>Learn about Next.js in an interactive course with quizzes!</p>
        </a>

        <a
          href="https://github.com/vercel/next.js/tree/master/examples"
          className={styles.card}
        >
          <h3>Examples &rarr;</h3>
          <p>Discover and deploy boilerplate example Next.js projects.</p>
        </a>

        <a
          href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
        >
          <h3>Deploy &rarr;</h3>
          <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
        </a>
      </div>
    </main>
  );
}
