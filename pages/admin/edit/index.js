import { useEffect, useState } from 'react';
import Link from 'next/link'
import axios from 'axios';

const List = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        const res = await axios.get('/api/rooms');
        setRooms(res.data.roomsData);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>rooms</h1>
      {rooms.map(room => (
        <div key={room.id}>
          <Link href={`/admin/edit/${room.id}`}>
            <a>{room.title}</a>
          </Link>
          <br/>
        </div>
      ))}
    </div>
  );
};

export default List;