import { useState, useEffect } from 'react'
import Image from 'next/image'
import useSWR from 'swr'

import styles from '../../styles/Listen.module.css'
import CenterContainer from '../components/centercontainer'

const Listen = ({ trackId }) => {
  const [imageURL, setImageURL] = useState('')
  const [trackName, setTrackName] = useState('')

  useEffect(() => {
    // Get the Spotify Track
    // set the image from track.album.images[0].url
    // set the name from track.name

    const picsumId = Math.floor(Math.random() * 1000)
    setImageURL(`https://picsum.photos/id/${picsumId}/200`)

    setTrackName('')
  }, [])

  // This all goes away once we have the spotify track
  const { data, error } = useSWR(
    'https://baconipsum.com/api/?type=meat-and-filler&sentences=1',
    (url) => fetch(url).then(_ => _.json())
  )
  const fakeTrackName = data && data[0]
  useEffect(() => {
    if (fakeTrackName) {
      setTrackName(fakeTrackName.slice(0, 24))
    }
  }, [fakeTrackName])

  return (
    <CenterContainer flash>
      <h1 className={styles.h1}>Listen</h1>

      {imageURL && (
        <Image
          src={imageURL}
          className={styles.image}
          width="200"
          height="200"
          alt=""
        />
      )}

      <div style={{ width: '200px' }}>
        <div className={styles.timebar} />
      </div>

      <p>{trackName}</p>
    </CenterContainer>
  );
};

export default Listen;
