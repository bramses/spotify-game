import { useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';
import id from 'uuid-readable';
import {v4 as uuid} from 'uuid';
import { useRouter } from 'next/router'

const JoinWithId = () => {
  const [content, setContent] = useState({
    playerName: undefined,
  })
  const router = useRouter()

  const routeTo = (href) => {
    router.push(href)
  }

  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }
  const onSubmit = async () => {
    const { playerName } = content;
    const shortId = dashify(id.short(uuid()));
    
    if (!playerName) {
      playerName = shortId;
    }

    await axios.post('/api/add-player-to-room', { playerName, slug: shortId, roomId: router.asPath.split('/')[3] });
    // routeTo(`/rooms/${router.asPath.split('/')[3]}`);
  }
  return (
    <div>
      <label htmlFor="playerName">Name</label>
      <input
        type="text"
        name="playerName"
        value={content.playerName}
        onChange={onChange}
      />
      <button onClick={onSubmit}>Join Game</button>
    </div>
  );
};

export default JoinWithId;