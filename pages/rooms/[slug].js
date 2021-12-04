import { useRouter } from 'next/router'
import db from '../../utils/db';

const Room = (props) => {
  const { room } = props;
  const router = useRouter()
  if (router.isFallback) {
    return (
      <div>loading</div>
    )
  } else {
    if (room) {
      return (
        <div>
          <h1>{room.title}</h1>
          <h4>{room.created}</h4>
          <p>{room.body}</p>
        </div>
      );
    } else {
      return (
        <div>not found</div>
      )
    }
  }
};

export const getStaticPaths = async () => {
  const rooms = await db.collection("rooms").get()
  const paths = rooms.docs.map(room => ({
    params: {
      slug: room.data().slug
    }
  }));
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const res = await db.collection("rooms").where("slug", "==", slug).get()
  const room = res.docs.map(room => room.data());
  if (room.length) {
    return {
      props: {
        room: room[0]
      }
    }
  } else {
    return {
      props: {}
    }
  }
}

export default Room;