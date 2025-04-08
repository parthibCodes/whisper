# Whispr - Anonymous Message Sharing Platform

A full-stack web application that allows users to share anonymous messages in a sticky-note style interface.

## Features

- Anonymous message sharing (max 200 characters)
- Real-time message feed with auto-refresh (every 5 seconds)
- Upvote/downvote functionality
- Messages automatically expire after 24 hours
- Responsive design with Tailwind CSS
- MongoDB backend with Express server
- React frontend with TypeScript

## Message Visibility and Anonymity

- All messages are publicly visible to anyone who accesses the application
- No authentication required - completely anonymous posting and viewing
- Messages can be viewed through:
  - The web interface (http://localhost:4000)
  - Direct API access (http://localhost:5001/api/messages)
- Messages are only identified by:
  - Creation timestamp
  - Vote count
  - No user information is stored or displayed
- Note: When running locally, only users on your local network can access the messages
- For public access, the application needs to be deployed to a public server

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies for both client and server:

   ```bash
   npm run install-all
   ```

3. Set up MongoDB:

   - Install MongoDB locally or use MongoDB Atlas
   - Create a database named "whispr"

4. Configure environment variables:
   Create a `.env` file in the server directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/whispr
   PORT=5001
   ```

## Running the Application

1. Start the backend server:

   ```bash
   cd server
   npm start
   ```

   The backend will run on http://localhost:5001

2. Start the frontend development server:

   ```bash
   cd client
   npm start
   ```

   The frontend will run on http://localhost:4000

3. Or run both concurrently:
   ```bash
   npm start
   ```

## API Endpoints

- `GET /api/messages` - Get all messages
- `POST /api/messages` - Create a new message
- `PATCH /api/messages/:id/vote` - Update message votes
- `DELETE /api/messages/:id` - Delete a message (admin only)

## Project Structure

```
whispr/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── MessageFeed.tsx
│   │   │   ├── MessageForm.tsx
│   │   │   └── Navbar.tsx
│   │   ├── App.tsx        # Main App component
│   │   └── index.tsx      # Entry point
│   ├── public/            # Static files
│   ├── package.json       # Frontend dependencies
│   └── tailwind.config.js # Tailwind CSS config
├── server/                 # Node.js backend
│   ├── models/            # Mongoose models
│   │   └── Message.js     # Message schema
│   ├── index.js           # Server entry point
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
└── package.json           # Root package.json
```

## Technologies Used

- Frontend:

  - React with TypeScript
  - Tailwind CSS for styling
  - Axios for API calls
  - React Hooks for state management

- Backend:
  - Node.js with Express
  - MongoDB with Mongoose
  - CORS for cross-origin requests

## Features in Detail

### Message Management

- Messages are limited to 200 characters
- Messages automatically expire after 24 hours
- Real-time updates every 5 seconds
- Upvote/downvote system

### User Interface

- Clean, responsive design
- Loading states and error handling
- Character counter for new messages
- Mobile-friendly layout

### Security

- CORS enabled for frontend communication
- Input validation on both frontend and backend
- No user authentication required (anonymous)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
