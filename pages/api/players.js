import db from '../../utils/db';

export default async function handler (req, res) {
  try {
    const players = await db.collection('players').orderBy('created').get();
    const playersData = players.docs.map(player => ({
      id: player.id,
      ...player.data()
    }));
    res.status(200).json({ playersData });
  } catch (e) {
    res.status(400).end();
  }
}