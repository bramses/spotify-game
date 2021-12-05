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
    </CenterContainer>
  );
};

export default SongPersonReveal;
