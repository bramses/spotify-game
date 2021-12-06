import { useState, useCallback } from 'react'
import throttle from 'lodash.throttle'
import axios from 'axios'

import styles from '../../styles/SongSearch.module.css'
import CenterContainer from '../components/centercontainer'
import StyledButton from '../components/styledbutton'

const SongSearch = () => {
  const [inputValue, setInputValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedSongs, setSelectedSongs] = useState([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAndSetSearchResults = useCallback(throttle((value) => {
    if (value) {
      axios.post('/api/spotify/search', { query: value })
        .then((results) => {
          setSearchResults(results.data)
        })
    }
  }, 500), [])

  const handleKeystrokes = (event) => {
    const { value } = event.target
    setInputValue(value)
    getAndSetSearchResults(value)
  }

  const handleAdd = (songObj) => {
    setInputValue('')
    setSearchResults([])
    setSelectedSongs([...selectedSongs, songObj])
  }

  const handleRemove = (songId) => {
    setSelectedSongs(selectedSongs.filter(aSongObj => aSongObj.id !== songId))
  }

  const handleSubmit = () => {
    console.log('submitting your list of songs to the server!')
    const selectedSongIds = selectedSongs.map(songObj => songObj.id)
    console.log(selectedSongIds)
  }

  return (
    <CenterContainer greyBorder>
      <h1>Enter Your <span style={{ color: "#1DB954" }}>Top 5</span> Songs</h1>

      {selectedSongs.map((songObj, index) => (
        <div key={songObj.id} className={styles.resultcontainer}>
          <span className={styles.result}>
            {index + 1}. {songObj.name}<br />
            <span className={styles.artist}>{songObj.artist}</span>
          </span>
          <button className={styles.rmvbtn} onClick={() => handleRemove(songObj.id)}>
            -
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
        <div key={result.id} className={styles.resultcontainer}>
          <span className={styles.result}>
            {result.name}<br />
            <span className={styles.artist}>{result.artist}</span>
          </span>
          <button className={styles.addbtn} onClick={() => handleAdd(result)}>
            +
          </button>
        </div>
      ))}
    </CenterContainer>
  );
};

export default SongSearch;
