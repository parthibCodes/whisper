import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">Whispr</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Share your thoughts anonymously</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 