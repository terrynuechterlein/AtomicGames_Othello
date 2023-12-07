# Overview
This project contains a JavaScript-based client (bot) for playing the game of Othello. The client connects to an Othello game server over TCP sockets and plays the game by sending calculated moves based on the current state of the game board.

## Prerequisites
Before running the game, ensure you have the following installed:

Node.js
Java (Recommended: Java SE 1.8.0 or Java 17 for compatibility with the game server)

## Setting Up the Game
Clone the Repository: Clone this repository to your local machine.

Install Dependencies: run npm install to install the necessary Node.js dependencies.

## Running the Game
The game consists of two parts: the game server (provided as a JAR file) and your JavaScript client.

## 🚀Starting the Game Server

1) Navigate to the Game Server Directory: The othello.jar file should be in the main directory of the cloned repository.
2) Run the Server: Use the following command to start the game server: java -jar othello.jar --p1-type remote --p2-type random --wait-for-ui

This command sets up player one as a remote player (your client) and player two as a random player. The --wait-for-ui flag allows you to follow the game in a web UI.

Access the Game UI (Optional): Once the server is running, you can view the game's progress at http://localhost:8080 in your web browser.

## 🚀Running Your Client

1) Open a New Terminal Window (This should be separate from the one running the game server)

2) Navigate to the JavaScript SDK Directory: Where your client code (client.js) is located (It should be in the main directory of this project if you haven't manually moved it)

3) Run the Client: Execute your client by running: node client.js

Your client will now connect to the game server and start playing Othello.

## How It Works

The client (client.js) connects to the Othello game server, receives the current state of the game board, calculates the best move using util.js, and sends this move back to the server. The util.js file contains the logic for determining valid moves and scoring these moves based on various heuristics to play strategically.
