import db from '../../utils/db';
import axios from 'axios';

export default async function handler(req, res) {
    try {

        const { roomId } = req.body;
        const rooms = await db.collection('rooms').get();
        const roomsData = rooms.docs.map(room => ({
            id: room.id,
            ...room.data()
          }));

        if (roomsData.some(room => room.slug === roomId)) {
            console.log('room exists -- creating player');
            const room = roomsData.find(room => room.slug === roomId);
            const player = {
                name: req.body.playerName,
                score: 0,
                isReady: false,
                isHost: false,
                songs: [],
                roomId: room.id,
                created: new Date().toISOString(),
            };

            const players = await db.collection('players').get();
            const playersData = players.docs.map(player => player.data());

            if (playersData.some(player => player.slug === req.body.slug)) {
                res.status(400).end();
            } else {
                const { id } = await db.collection('players').add({
                    ...player,
                    created: new Date().toISOString(),
                });
                room.players.push(id);
                await db.collection('rooms').doc(room.id).update({
                ...room,
                updated: new Date().toISOString(),
                });
            }

        } else {
            console.log('room does not exist');
            res.status(400).end();
        }

        res.status(200).json({ message: 'ok' });
    } catch (e) {
        console.log(e);
        res.status(400).end();
    }
}