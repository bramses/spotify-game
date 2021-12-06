import { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'

import styles from '../../styles/Listen.module.css'
import CenterContainer from '../components/centercontainer'

const voidAudio = (typeof Audio !== "undefined" && new Audio())

const randomTrackIds = [
  '3USxtqRwSYz57Ewm6wWRMp',
  '5J6rTmMjF9DVIAF8G3M9n4',
  '4ZtFanR9U6ndgddUvNcjcG',
  '3Vi5XqYrmQgOYBajMWSvCi',
  '4iN16F8JtVxG2UTzp3avGl',
  '50nfwKoDiSYg8zOCREWAm5',
  '3Kkjo3cT83cw09VJyrLNwX',
  '3QPBocWfIcOCdFFvmqn60F',
  '5GzpstdtupjJcu0JR5j3v6',
  '00Blm7zeNqgYLPtW6zg8cj',
]

const Listen = () => {
  const [trackId, setTrackId] = useState('')
  useEffect(() => {
    const trackIndex = Math.floor(Math.random() * 10)
    setTrackId(randomTrackIds[trackIndex])
  }, [])

  const [imageURL, setImageURL] = useState('')
  const [trackName, setTrackName] = useState('')
  const [audioURL, setAudioURL] = useState('')
  const [embedInstead, setEmbedInstead] = useState('')

  useEffect(() => {
    // Get the Spotify Track
    if (trackId) {
      axios.post('/api/spotify/track', { id: trackId })
        .then((response) => {
          const track = response.data
          // setTrackName(track.name)
          // setImageURL(track.album.images[0].url)
          // setAudioURL(track.preview_url)
          setEmbedInstead(track.id)
        })
    }
  }, [trackId])

  useEffect(() => {
    if (!embedInstead) return
    const iframe = document.createElement('iframe')
    iframe.src=`https://open.spotify.com/embed/track/${embedInstead}`
    iframe.width="300"
    iframe.height="80"
    iframe.frameBorder="0"
    iframe.allowtransparency="true"
    iframe.allow="encrypted-media"
    const embedContainer = document.getElementById('embed-container')
    embedContainer.appendChild(iframe)
    return () => {
      iframe.remove()
    }
  }, [embedInstead])

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

      <div id="embed-container" />

      <div style={{ width: '200px' }}>
        <div className={styles.timebar} />
      </div>

      <p>{trackName}</p>
    </CenterContainer>
  );
};

export default Listen;
