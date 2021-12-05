import { useState } from 'react'

import styles from '../../styles/HowTo.module.css'
import CenterContainer from '../components/centercontainer'
import StyledButton from '../components/styledbutton'

const continueToSongSelect = () => {
  console.log('Time to go select some songs!')
}

const HowTo = () => {
  const [roomCode, setRoomCode] = useState('elephant-city-smoke-weed-juice')

  return (
    <CenterContainer noBorder>
      <h1 className={styles.h1}>How To Play</h1>
      <h2>Welcome to the <span className={styles.h2}>Spotify</span> Game!</h2>
      <p className={styles.h1}>Room Code:<br /><em>{roomCode}</em></p>
      <p className={styles.p}>
        The Spotify Game is a collaborative roulette where you attempt
        to see how well you know your friends! You&apos;ll start by adding your
        <b> Top 5 Songs</b> from this year&apos;s Spotify Wrapped.
      </p>
      <p className={styles.p}>
        Once the game
        begins, you&apos;ll get 30 seconds to listen to a song, followed by 30
        seconds to vote on which friend you think added that song to the queue.
      </p>
      <p className={styles.p}>
        There will be a break between each song, and at the end of the game,
        if you&apos;ve collected the most points (the most correct guesses),
        you&apos;ll claim the glory of winning the spotify game!
      </p>

      <StyledButton
        style={{ marginTop: '16px' }}
        onClick={continueToSongSelect}
      >
        Continue
      </StyledButton>
    </CenterContainer>
  );
};

export default HowTo;
