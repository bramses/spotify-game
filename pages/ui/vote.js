import { useState, useEffect } from 'react'

import styles from '../../styles/Vote.module.css'
import Player from '../components/player'
import CenterContainer from '../components/centercontainer'

const avatarURL = name => `https://ui-avatars.com/api/?background=random&name=${name}&size=256&length=1`

const Vote = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: 'bram', avatar: avatarURL('bram') },
    { id: 2, name: 'melissa', avatar: avatarURL('melissa') },
    { id: 3, name: 'ryan', avatar: avatarURL('ryan') },
    { id: 4, name: 'glenn', avatar: avatarURL('glenn') },
    { id: 5, name: 'caitlin', avatar: avatarURL('caitlin') },
    { id: 6, name: 'ben', avatar: avatarURL('ben') },
  ])

  const [selectedPlayer, setSelectedPlayer] = useState(0)

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

      {players.map(p => (
        <div key={p.id} onClick={() => setSelectedPlayer(p.id)}>
          <Player
            key={p.id}
            name={p.name}
            avatar={p.avatar}
            extras={selectedPlayer === p.id ? '✓' : null}
            hoverable
          />
        </div>
      ))}
    </CenterContainer>
  );
};

export default Vote;
