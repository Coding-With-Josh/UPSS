import React from 'react';

const mockMessages: Message[] = [
    {
        id: '1',
        content: 'Hey, how are you?',
        sender: 'user1',
        timestamp: new Date('2023-06-10T10:00:00'),
    },
    {
        id: '2',
        content: "I'm doing great, thanks!",
        sender: 'user2',
        timestamp: new Date('2023-06-10T10:01:00'),
    },
    {
        id: '3',
        content: 'What are you working on?',
        sender: 'user1',
        timestamp: new Date('2023-06-10T10:02:00'),
    },
    {
        id: '4',
        content: 'Just coding some React components',
        sender: 'user2',
        timestamp: new Date('2023-06-10T10:03:00'),
    },
    {
        id: '5',
        content: 'Sounds cool!',
        sender: 'user1',
        timestamp: new Date('2023-06-10T10:04:00'),
    },
    {
        id: '6',
        content: 'Yeah, it is!',
        sender: 'user2',
        timestamp: new Date('2023-06-10T10:05:00'),
    },
];

const currentUserId = 'user1';

const messages = mockMessages;

interface Message {
    id: string;
    content: string;
    sender: string;
    timestamp: Date;
}

interface MessageListProps {
    messages?: Message[];
    currentUserId?: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto">
            {messages?.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${
                        message.sender === currentUserId ? 'justify-end' : 'justify-start'
                    }`}
                >
                    <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === currentUserId
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                        }`}
                    >
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs text-muted-foreground mt-1 block">
                            {message.timestamp.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;