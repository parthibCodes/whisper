import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Message {
  _id: string;
  text: string;
  votes: number;
  createdAt: string;
}

const MessageFeed: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/messages');
      setMessages(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch messages');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (id: string, vote: number) => {
    try {
      await axios.patch(`http://localhost:5001/api/messages/${id}/vote`, { vote });
      fetchMessages();
    } catch (err) {
      setError('Failed to update vote');
      console.error('Error updating vote:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {messages.map((message) => (
        <div
          key={message._id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <p className="text-gray-800 mb-4 whitespace-pre-wrap">{message.text}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleVote(message._id, 1)}
                className="text-gray-500 hover:text-primary"
              >
                👍
              </button>
              <span className="text-gray-600">{message.votes}</span>
              <button
                onClick={() => handleVote(message._id, -1)}
                className="text-gray-500 hover:text-red-500"
              >
                👎
              </button>
            </div>
            <span className="text-sm text-gray-400">
              {new Date(message.createdAt).toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageFeed; 