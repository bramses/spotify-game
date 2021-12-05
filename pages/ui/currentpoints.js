import { useState, useEffect } from 'react'
import Image from 'next/image'

import styles from '../../styles/CurrentPoints.module.css'
import Player from '../components/player'
import CenterContainer from '../components/centercontainer'
import StyledButton from '../components/styledbutton'

const avatarURL = name => `https://ui-avatars.com/api/?background=random&name=${name}&size=256&length=1`

const nextSong = () => {
  console.log('trigerring the next song!!')
}

const CurrentPoints = () => {
  const [whoami, setWhoami] = useState('ben')
  const [amithehost, setAmithehost] = useState(false)

  const [players, setPlayers] = useState([
    { id: 1, name: 'bram', isHost: true, avatar: avatarURL('bram'), score: 40, scoreChange: 10 },
    { id: 2, name: 'melissa', avatar: avatarURL('melissa'), score: 69, scoreChange: 19 },
    { id: 3, name: 'ryan', avatar: avatarURL('ryan'), score: 100, scoreChange: 30 },
    { id: 4, name: 'glenn', avatar: avatarURL('glenn'), score: 10.16, scoreChange: -420.69 },
    { id: 5, name: 'caitlin', avatar: avatarURL('caitlin'), score: 23, scoreChange: 3 },
    { id: 6, name: 'ben', avatar: avatarURL('ben'), score: 55, scoreChange: -5 },
  ])

  useEffect(() => {
    const myplayerobj = players.find(p => p.name === whoami)
    if (myplayerobj && myplayerobj.isHost) {
      setAmithehost(true)
    } else {
      setAmithehost(false)
    }
  }, [whoami, players])

  const [imageURL, setImageURL] = useState('')
  useEffect(() => {
    const picsumId = Math.floor(Math.random() * 1000)
    setImageURL(`https://picsum.photos/id/${picsumId}/200`)
  }, [])

  const [who, setWho] = useState('')
  useEffect(() => {
    const names = ['bram', 'melissa', 'ryan', 'glenn', 'caitlin', 'ben']
    setWho(
      names[Math.floor(Math.random() * names.length)]
    )
  }, [])

  return (
    <CenterContainer>
      <h1 className={styles.h1}>Current Scores</h1>

      {players.sort((a, b) => (b.score - a.score)).map(p => (
        <Player
          key={p.id}
          name={p.isHost ? `${p.name} (host)` : p.name}
          avatar={p.avatar}
          extras={
            <span>
              {p.score} (
              <span style={p.scoreChange > 0 ? { color: 'limegreen' } : { color: 'red' }}>
                {p.scoreChange > 0 ? '+' : ''}
                {p.scoreChange}
              </span>
              )
            </span>
          }
        />
      ))}

      <StyledButton
        style={{ marginTop: '16px' }}
        onClick={amithehost ? nextSong : null}
        disabled={!amithehost}
      >
        Next Song (Host Only)
      </StyledButton>

      <h1 className={styles.h1}>Previous Song</h1>

      {imageURL && (
        <Image
          src={imageURL}
          className={styles.image}
          width="200"
          height="200"
          alt=""
        />
      )}

      <h3 className={styles.namecontainer}>
        This song was added by <span className={styles.name}>{who}</span>!
      </h3>
    </CenterContainer>
  );
};

export default CurrentPoints;
