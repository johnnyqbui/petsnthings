import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import { Button } from "antd";

// slices
import { authenticate, AuthSelector } from "../slices/auth";
import {
  reverseGeocode,
  setLocation,
  CurrentLocationSelector
} from "../slices/currentLocation";
import { fetchPets, selectPet, PetsSelector } from "../slices/pets";

// components
import Grid from "../components/Grid";

export default function Home() {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const dispatch = useDispatch();
  const {
    loading: authLoading,
    hasErrors: authErrors,
    data: authData
  } = useSelector(AuthSelector);
  const {
    loading: petsLoading,
    hasErrors: petsErrors,
    data: petsData,
    selectedPet
  } = useSelector(PetsSelector);
  const {
    loading: currentLocationLoading,
    hasErrors: currentLocationErrors,
    data: currentLocationData
  } = useSelector(CurrentLocationSelector);

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);

  console.log({ selectedPet });
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to Pets N' Things!</h1>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        <GooglePlacesAutocomplete
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
          autocompletionRequest={{
            componentRestrictions: {
              country: "us"
            },
            types: ["(regions)"]
          }}
          selectProps={{
            isLoading: petsLoading,
            isClearable: true,
            placeholder: "Search by City, State, Zip Code",
            onChange: option => {
              if (option) {
                let searchLocation;
                const isValidZip = option.label.search(/[0-9]{5}/);
                if (isValidZip > 0) {
                  searchLocation = option.label
                    .substring(isValidZip)
                    .replace(", USA", "");
                } else {
                  searchLocation = option.label.replace(", USA", "");
                }

                dispatch(setLocation(searchLocation));
                dispatch(fetchPets(authData, searchLocation));
              }
            },
            styles: {
              container: () => ({
                width: 500,
                position: "relative",
                boxSizing: "border-box"
              })
            }
          }}
        />
        <span style={{ margin: 10 }}>OR</span>
        <Button
          type="primary"
          size="large"
          loading={isLoadingLocation}
          disabled={isLoadingLocation}
          onClick={() => {
            navigator.geolocation.getCurrentPosition(success, denied);

            async function success(info) {
              const coords = info.coords.latitude + "," + info.coords.longitude;
              dispatch(reverseGeocode(coords));
              dispatch(fetchPets(authData, coords));
              setIsLoadingLocation(false);
            }

            function denied(info) {
              console.log(info.message);
              setIsLoadingLocation(false);
            }
            setIsLoadingLocation(true);
          }}
        >
          {`${isLoadingLocation ? "Getting" : "Search By"} Current Location`}
        </Button>
      </div>

      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20
        }}
      >{`Searching from ${currentLocationData}`}</h2>

      <Grid
        data={petsData.animals}
        onClickItem={item => dispatch(selectPet(item))}
      />

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
