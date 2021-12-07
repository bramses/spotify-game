import db from "../../../utils/db";

export default async function handler(req, res) {
    try {
      const { slug } = req.body;
      const players = await db.collection('players').get();
      const playersData = players.docs.map(player => player.data());
  
      if (playersData.some(player => player.slug === slug)) {
        res.status(400).end();
      } else {
        const { id } = await db.collection('players').add({
          ...req.body,
          created: new Date().toISOString(),
        });
        res.status(200).json({ id });
      }
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  }