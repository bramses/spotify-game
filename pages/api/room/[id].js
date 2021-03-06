import db from '../../../utils/db';

export default async function handler (req, res) {
  const { id } = req.query;

  try {
    if (req.method === 'PUT') {
      await db.collection('rooms').doc(id).update({
        ...req.body,
        updated: new Date().toISOString(),
      });
    } else if (req.method === 'GET') {
      const doc = await db.collection('rooms').doc(id).get();
      if (!doc.exists) {
        res.status(404).end();
      } else {
        res.status(200).json(doc.data());
      }
    } else if (req.method === 'DELETE') {
      await db.collection('rooms').doc(id).delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}


/*
a room has:
  - name
  - slug
  - players
  - created

a player has:
  - name
  - slug
  - created
  - isHost
  - points
*/