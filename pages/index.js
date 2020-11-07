import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'  

import { authenticate, AuthSelector } from '../slices/auth'	
import { setCurrentLocation, CurrentLocationSelector } from '../slices/currentLocation'	
import { getPets, PetsSelector } from '../slices/pets'	

import SearchBar from '../components/SearchBar'

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
  

//   // console.log({auth, authLoading})
//   // console.log({petsData, petsLoading})
//   return {
//     props: {
//       petsData
//     }
//   }
// }

export default function Home() {
  const dispatch = useDispatch()
  const {loading, hasErrors, authData} = useSelector(AuthSelector)	
  const {currentLocation} = useSelector(CurrentLocationSelector)	
  
  console.log({loading, hasErrors, authData})
  console.log({currentLocation})
  // const { petsData, petsLoading } = useSelector(PetsSelector)	

  // console.log(petsData.animals);

  useEffect(() => {
    dispatch(authenticate())
}, [dispatch])


  return (
    <div className={styles.container}>
      <Head>
        <title>Pets N' Things</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Pets N' Things!
        </h1>
        <SearchBar 
          placeholder="Search by City, State, Zip Code" 
          onSubmit={(submittedLocation) => {
            console.log('submit', submittedLocation)
            dispatch(setCurrentLocation(submittedLocation))
          }}
        />
{/* 
        <div className={styles.grid}>
          {
            petsData.animals.map(({primary_photo_cropped, size, species}) => 
            <div className={styles.card} onClick={() => {

            }}>
              <img 
                src={primary_photo_cropped && primary_photo_cropped.medium} 
                alt={`${size} ${species}`} 
              />
            </div>
            )
          }
        </div> */}


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
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
