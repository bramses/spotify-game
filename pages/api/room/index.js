import db from "../../../utils/db";

export default async function handler(req, res) {
    try {
      const { slug } = req.body;
      const rooms = await db.collection('rooms').get();
      const roomsData = rooms.docs.map(room => room.data());
  
      if (roomsData.some(room => room.slug === slug)) {
        res.status(400).end();
      } else {
        const { id } = await db.collection('rooms').add({
          ...req.body,
          created: new Date().toISOString(),
        });
        res.status(200).json({ id });
      }
    } catch (e) {
      res.status(400).end();
    }
  }