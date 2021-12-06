import { useState, useEffect } from 'react'
import Image from 'next/image'

import styles from '../../styles/SongPersonReveal.module.css'
import CenterContainer from '../components/centercontainer'

const SongPersonReveal = () => {
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

  const [votes, setVotes] = useState([
    { id: 1, name: 'bram', votedFor: 3 },
    { id: 2, name: 'melissa', votedFor: 2 },
    { id: 3, name: 'ryan', votedFor: 2 },
    { id: 4, name: 'glenn', votedFor: 2 },
    { id: 5, name: 'caitlin', votedFor: 1 },
    { id: 6, name: 'ben', votedFor: 5 },
  ])
  const votedFors = votes.reduce((accumulator, voter) => {
    if (voter.votedFor in accumulator) {
      accumulator[voter.votedFor].push(voter.name)
    } else {
      accumulator[voter.votedFor] = [voter.name]
    }
    return accumulator
  }, {})

  return (
    <CenterContainer>
      {imageURL && (
        <div className={styles.imageshadow}>
          <Image
            src={imageURL}
            className={styles.image}
            width="200"
            height="200"
            alt=""
          />
        </div>
      )}

      <h3 className={styles.namecontainer}>
        This song was added by <span className={styles.name}>{who}</span>!
      </h3>

      {Object.entries(votedFors)
        .sort((a, b) => (b[1].length - a[1].length))
        .map(([selection, voters]) => {
          const selectedPlayer = votes.find(p => `${p.id}` === selection)
          const selectedPlayerName = selectedPlayer ? selectedPlayer.name : selection
          return (
            <div key={selection} className={styles.votercontainer}>
              <div className={styles.voterselection}>
                {voters.length} vote{voters.length !== 1 ? 's': ''} for <b>{selectedPlayerName}</b>
              </div>
              <div className={styles.voters}>{voters.join(', ')}</div>
            </div>
          )
        }
      )}
    </CenterContainer>
  );
};

export default SongPersonReveal;
