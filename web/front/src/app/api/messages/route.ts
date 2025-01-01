import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fetch all messages for a conversation
    const { conversationId } = req.query;
    const messages = await prisma.message.findMany({
      where: { conversationId: conversationId as string },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        sender: true,
      },
    });
    res.status(200).json(messages);
  } else if (req.method === 'POST') {
    // Create a new message
    const { conversationId, senderId, content } = req.body;
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId,
        content,
      },
    });
    res.status(201).json(message);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
