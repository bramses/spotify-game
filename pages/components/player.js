import Image from 'next/image'

import styles from '../../styles/Player.module.css'

const Player = ({ avatar, name, extras, hoverable = false }) => {
  return (
    <div
      className={hoverable ? (
        `${styles.container} ${styles.containerhover}`
      ) : (
        styles.container
      )}
    >
      <Image
        className={styles.avatar}
        width="48"
        height="48"
        src={avatar}
        alt={`avatar of ${name}`}
      />
      <div className={styles.name}>{name}</div>
      <div className={styles.extras}>{extras}</div>
    </div>
  );
};

export default Player;
