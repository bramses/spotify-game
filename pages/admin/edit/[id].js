import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import dashify from 'dashify';
import axios from 'axios';

const EditRoom = () => {
    const router = useRouter()
    const [content, setContent] = useState({
        title: undefined,
        body: undefined,
        players: undefined,
    })

    useEffect(() => {
        const fetchData = async () => {
            const { id } = router.query;
            if (id) {
                const res = await axios.get(`/api/room/${id}`);
                const { title, body } = res.data;
                setContent({
                    title,
                    body,
                    players
                })
            }
        }
        fetchData();
    }, [router])

    const onChange = (e) => {
        const { value, name } = e.target;
        setContent(prevState => ({ ...prevState, [name]: value }));
    }

    const onSubmit = async (e) => {
        const { id } = router.query
        const { title, body } = content;
        console.log(id, title, body);
        await axios.put(`/api/room/${id}`, {
            slug: dashify(title),
            title,
            body,
            players
        });
    }

    const onDelete = async () => {
        const { id } = router.query;
        await axios.delete(`/api/room/${id}`);
        router.back();
    }

    // TODO players is broken
    return (
        <div>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                name="title"
                value={content.title}
                onChange={onChange}
            />
            <label htmlFor="body">Body</label>
            <textarea
                name="body"
                value={content.body}
                onChange={onChange}
            />
        
            <label htmlFor="players">Players</label>
            <ul>
                {content.players.map(player => (
                    <li key={player.id}>
                        {player.name}
                    </li>
                ))}
            </ul>
            <button
                type="button"
                onClick={onSubmit}
            >
                Submit
            </button>
            <button
                type="button"
                onClick={onDelete}
            >
                Delete
            </button>
        </div>
    );
};

export default EditRoom;