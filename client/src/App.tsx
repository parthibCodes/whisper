import React from 'react';
import MessageFeed from './components/MessageFeed';
import MessageForm from './components/MessageForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MessageForm />
          <MessageFeed />
        </div>
      </main>
    </div>
  );
}

export default App;
