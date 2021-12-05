import { useState, useEffect, useCallback } from 'react'
import throttle from 'lodash.throttle'

import styles from '../../styles/SongSearch.module.css'
import CenterContainer from '../components/centercontainer'
import StyledButton from '../components/styledbutton'

// This all goes away once we have the spotify api integration
const get5RandomSongNames = () => (
  fetch('https://baconipsum.com/api/?type=meat-and-filler&sentences=5')
    .then(_ => _.json())
    .then(([paragraph]) => {
      const sentences = paragraph.split('.').filter(s => s)
      return sentences.map(sentence => sentence.slice(0, 24))
    })
)

const SongSearch = () => {
  const [inputValue, setInputValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedSongs, setSelectedSongs] = useState([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAndSetSearchResults = useCallback(throttle((value) => {
    console.log(`getting search results for ${value}`)
    get5RandomSongNames().then((results) => {
      setSearchResults(results)
    })
  }, 500), [])

  const handleKeystrokes = (event) => {
    const { value } = event.target
    setInputValue(value)
    getAndSetSearchResults(value)
  }

  const handleAdd = (song) => {
    setInputValue('')
    setSearchResults([])
    setSelectedSongs([...selectedSongs, song])
  }

  const handleRemove = (song) => {
    setSelectedSongs(selectedSongs.filter(asong => asong !== song))
  }

  const handleSubmit = () => {
    console.log('submitting your list of songs to the server!')
    console.log(selectedSongs)
  }

  return (
    <CenterContainer greyBorder>
      <h1>Enter Your <span style={{ color: "#1DB954" }}>Top 5</span> Songs</h1>

      {selectedSongs.map((song, index) => (
        <div key={btoa(song)} className={styles.resultcontainer}>
          <span className={styles.result}>
            {index + 1}. {song}<br />
            <span className={styles.artist}>some artist name</span>
          </span>
          <button className={styles.rmvbtn} onClick={() => handleRemove(song)}>
            - remove
          </button>
        </div>
      ))}

      {selectedSongs.length < 5 && (
        <input
          className={styles.input}
          placeholder="search for a song..."
          value={inputValue}
          onChange={handleKeystrokes}
        />
      )}

      {selectedSongs.length >= 5 && (
        <StyledButton onClick={handleSubmit}>
          Let&apos;s get this started!
        </StyledButton>
      )}

      {searchResults.map((result) => (
        <div key={btoa(result)} className={styles.resultcontainer}>
          <span className={styles.result}>
            {result}<br />
            <span className={styles.artist}>some artist name</span>
          </span>
          <button className={styles.addbtn} onClick={() => handleAdd(result)}>
            + add
          </button>
        </div>
      ))}
    </CenterContainer>
  );
};

export default SongSearch;
