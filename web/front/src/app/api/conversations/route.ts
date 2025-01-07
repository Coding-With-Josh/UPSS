import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fetch all conversations
    const conversations = await prisma.conversation.findMany({
      include: {
        participants: true,
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
    res.status(200).json(conversations);
  } else if (req.method === 'POST') {
    // Create a new conversation
    const { title, participantIds } = req.body;
    const conversation = await prisma.conversation.create({
      data: {
        title,
        participants: {
          connect: participantIds.map((id: string) => ({ id })),
        },
      },
    });
    res.status(201).json(conversation);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
