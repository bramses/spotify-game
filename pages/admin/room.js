import { useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';
import id from 'uuid-readable';
import {v4 as uuid} from 'uuid';
import { useRouter } from 'next/router'

const Room = () => {
  const [content, setContent] = useState({
    title: undefined,
    body: undefined,
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
    const { title, body } = content;
    const shortId = dashify(id.short(uuid()));
    await axios.post('/api/room', { title, slug: shortId, body, players: [] });
    routeTo(`/rooms/${shortId}`);
  }
  return (
    <div>
      <label htmlFor="title">Title of Room</label>
      <input
        type="text"
        name="title"
        value={content.title}
        onChange={onChange}
      />
      <label htmlFor="body">Host Name</label>
      <textarea
        name="body"
        value={content.body}
        onChange={onChange}
      />
      <button onClick={onSubmit}>Start New Game</button>
    </div>
  );
};

export default Room;