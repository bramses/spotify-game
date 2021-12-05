import styles from '../../styles/Player.module.css'

const Player = ({ avatar, name, extras }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>{avatar}</div>
      <div className={styles.name}>{name}</div>
      <div className={styles.extras}>{extras}</div>
    </div>
  );
};

export default Player;
