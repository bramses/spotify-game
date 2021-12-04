import { useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';
import id from 'uuid-readable';
import {v4 as uuid} from 'uuid';

const Player = () => {
  const [content, setContent] = useState({
    title: undefined,
    body: undefined,
  })

  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }
  const onSubmit = async () => {
    const { title, body } = content;
    const shortId = dashify(id.short(uuid()));
    await axios.post('/api/player', { title, slug: shortId });
  }
  return (
    <div>
      <label htmlFor="title">Player Name</label>
      <input
        type="text"
        name="title"
        value={content.title}
        onChange={onChange}
      />
      <button onClick={onSubmit}>Join Game</button>
    </div>
  );
};

export default Player;