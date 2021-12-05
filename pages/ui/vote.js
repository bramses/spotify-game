import { useState, useEffect } from 'react'

import styles from '../../styles/Vote.module.css'
import Player from '../components/player'
import CenterContainer from '../components/centercontainer'

const Vote = () => {
  const [secondsLeft, setSecondsLeft] = useState(30)

  useEffect(() => {
    setTimeout(() => {
      setSecondsLeft(Math.max(secondsLeft - 1, 0))
    }, 1000)
  }, [secondsLeft])


  return (
    <CenterContainer flash>
      <h1 className={styles.h1}>Who&apos;s Song?</h1>
      <p
        className={styles.subtitle}
        style={
          secondsLeft > 10 ? {} : (
            secondsLeft > 3 ? { color: '#fff263' } : { color: 'red' }  
          )
        }
      >
        {secondsLeft} seconds remain
      </p>
    </CenterContainer>
  );
};

export default Vote;
