import Link from 'next/link'
import db from '../../utils/db';

const Rooms = (props) => {
  const { roomsData } = props;

  return (
    <div>
      <h1>Rooms</h1>
      {roomsData.map(entry => (
        <div key={entry.id}>
          <Link href={`/rooms/${entry.slug}`}>
            <a>{entry.title}</a>
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const rooms = await db.collection('rooms').orderBy('created', 'desc').get();
  const roomsData = rooms.docs.map(room => ({
    id: room.id,
    ...room.data()
  }));
  return {
    props: { roomsData },
    revalidate: 10
  }
}

export default Rooms;