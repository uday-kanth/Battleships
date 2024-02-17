# BattleShips
## Introduction
Battleships Game is a classic battleship board game implemented as a web application using Node.js, Express.js, and Socket.IO for multiplayer functionality.

## Features
- Single-player mode against a computer opponent.
- Multiplayer mode to play against other players in real-time.
- Room creation and joining for multiplayer battles.
- Email invitation feature to invite friends to join a multiplayer game.
- JWT-based authentication system for user authentication.
- Responsive design for seamless gameplay on both desktop and mobile devices.
 

## Technologies and Framworks Used:

### Backend:

- Node.js: JavaScript runtime for server-side development.

- Express.js: Web application framework for building the backend server.

- Socket.io: Real-time bidirectional event-based communication for enabling multiplayer functionality.

- Nodemailer: To send the mails.

### Frontend:

- React: JavaScript library for building user interfaces.

- HTML & EJS: Templating engines for generating dynamic HTML content.

- jQuery: Fast, small, and feature-rich JavaScript library for frontend interactions.

- Bootstrap: CSS framework for designing responsive and appealing user interfaces.
## Installation

1.Clone the repository:

```bash
  git clone https://github.com/uday-kanth/Battleships.git

```

2.Install dependencies:


```bash
cd Battleships
npm install

```

3.Set up environment variables:

Create a .env file in the root directory and define the following variables:
    

```bash
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4.Start the server:

```bash
npm start

```

5.Open your browser and navigate to http://localhost:3000 to play Battleships Game.

## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Usage
- Upon launching the game, you'll be presented with options to play single-player or multiplayer mode.
- In single-player mode, you'll play against a computer opponent.
- In multiplayer mode, you can either create a room and share the room code with a friend or join an existing room by entering the room code.
- Use the drag-and-drop interface to place your ships on the grid.
- Once both players are ready, the game will begin. Click on enemy squares to fire shots and sink your opponent's ships.
- The game ends when all of one player's ships are sunk.



