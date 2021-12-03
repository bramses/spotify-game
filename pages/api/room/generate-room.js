// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
  const uuid = uuidv4();
  
  res.status(200).json({ name: 'John Doe' })
}
