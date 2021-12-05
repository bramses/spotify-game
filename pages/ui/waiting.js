import { useState, useEffect } from 'react'

import styles from '../../styles/Waiting.module.css'
import Player from '../components/player'
import CenterContainer from '../components/centercontainer'
import StyledButton from '../components/styledbutton'

const avatarURL = name => `https://ui-avatars.com/api/?background=random&name=${name}&size=256&length=1`

const playGame = () => {
  console.log('starting the game!!')
}

const Waiting = () => {
  const [whoami, setWhoami] = useState('bram')
  const [amithehost, setAmithehost] = useState(false)

  const [players, setPlayers] = useState([
    { id: 1, name: 'bram', avatar: avatarURL('bram'), status: 'adding songs', isHost: true },
    { id: 2, name: 'melissa', avatar: avatarURL('melissa'), status: 'ready to play' },
    { id: 3, name: 'ryan', avatar: avatarURL('ryan'), status: 'reading the howto' },
    { id: 4, name: 'glenn', avatar: avatarURL('glenn'), status: 'adding songs' },
    { id: 5, name: 'caitlin', avatar: avatarURL('caitlin'), status: 'ready to play' },
    { id: 6, name: 'ben', avatar: avatarURL('ben'), status: 'ready to play' },
  ])

  useEffect(() => {
    const myplayerobj = players.find(p => p.name === whoami)
    if (myplayerobj && myplayerobj.isHost) {
      setAmithehost(true)
    } else {
      setAmithehost(false)
    }
  }, [whoami, players])


  return (
    <CenterContainer>
      <h1 className={styles.h1}>Waiting Room</h1>

      {players.map(p => (
        <Player
          key={p.id}
          name={p.isHost ? `${p.name} (host)` : p.name}
          avatar={p.avatar}
          extras={
            <span
              style={p.status !== 'ready to play' ?
                { color: '#c49000' } :
                { color: 'limegreen' }
              }
            >
              <em>{p.status}</em>
            </span>
          }
        />
      ))}

      <StyledButton
        style={{ marginTop: '16px' }}
        onClick={amithehost ? playGame : null}
        disabled={!amithehost}
      >
        Play Game (Host Only)
      </StyledButton>
    </CenterContainer>
  );
};

export default Waiting;
