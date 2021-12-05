import db from '../../utils/db';

export default async function handler (req, res) {
  try {
    const rooms = await db.collection('rooms').orderBy('created').get();
    const roomsData = rooms.docs.map(room => ({
      id: room.id,
      ...room.data()
    }));
    res.status(200).json({ roomsData });
  } catch (e) {
    res.status(400).end();
  }
}