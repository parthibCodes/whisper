import React, { useState } from 'react';
import axios from 'axios';

const MessageForm: React.FC = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Message cannot be empty');
      return;
    }
    if (text.length > 200) {
      setError('Message cannot exceed 200 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5001/api/messages', { text });
      setText('');
      setError('');
    } catch (err) {
      setError('Failed to submit message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Share Your Whispr</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message here (max 200 characters)..."
            maxLength={200}
          />
          <div className="text-sm text-gray-500 mt-1">
            {text.length}/200 characters
          </div>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default MessageForm; 