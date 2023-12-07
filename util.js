function getMove(player, board) {
  //ternary operator to determine opponent player number. if client is player 1, opponent is defined as player 2. If the condition is false, opponent is defined as player 1
  const opponent = player === 1 ? 2 : 1;
  let validMovesArr = [];
  let bestScore = -1;
  let bestMove = null;

  //iterate over each cell, check if cell is empty check if placing a piece at the location is a valid move
  //to get the best move, I will score potential moves based on their value in relation to the game.
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (
        board[row][col] === 0 &&
        isValidMove(row, col, player, opponent, board)
      ) {
        validMovesArr.push([row, col]);
        let score = scoreMove(row, col, board, player, opponent);

        if (score > bestScore) {
          bestScore = score;
          bestMove = [row, col];
        }
      }
    }
  }

  return bestMove;
}

function isValidMove(row, col, player, opponent, board) {
  //array to store the 8 possible directions a player can flank an opponent (north, south, west, east, northwest, northeast, southwest, southeast)
  const possibleFlankArr = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  //dr = delta row
  //dc = delta col
  for (let [dr, dc] of possibleFlankArr) {
    if (checkDirection(row, col, dr, dc, player, opponent, board)) {
      return true;
    }
  }
  return false;
}

function checkDirection(row, col, dr, dc, player, opponent, board) {
  let hasOpponent = false;
  let r = row + dr; //sets starting row index for checking
  let c = col + dc; //sets starting col index for checking

  //while the indices are withing the bounds of the board, keep checking.
  while (r >= 0 && r < board.length && c >= 0 && c < board[r].length) {
    if (board[r][c] === opponent) {
      hasOpponent = true;
    } else if (board[r][c] === player && hasOpponent) {
      return true;
    } else {
      return false;
    }

    //increment
    r += dr;
    c += dc;
  }
  return false;
}

function scoreMove(row, col, board, player, opponent) {
  let score = 0;

  // Corner capture
  if (
    (row === 0 || row === board.length - 1) &&
    (col === 0 || col === board[0].length - 1)
  ) {
    score += 100; // Highest score for corners
  }

  // Edge control
  if (
    row === 0 ||
    row === board.length - 1 ||
    col === 0 ||
    col === board[0].length - 1
  ) {
    score += 10; // Lower score for edges
  }

  // Penalize moves that give the opponent potential access to corners
  score -= penalizeCornerRisk(row, col, board, player, opponent);

  return score;
}

function penalizeCornerRisk(row, col, board, player, opponent) {
  let penalty = 0;

  // List of corner coordinates
  const corners = [
    [0, 0],
    [0, board[0].length - 1],
    [board.length - 1, 0],
    [board.length - 1, board[0].length - 1],
  ];

  for (let [cornerRow, cornerCol] of corners) {
    // Check if the corner is empty
    if (board[cornerRow][cornerCol] === 0) {
      // Check adjacent cells to the corner for potential risk
      if (isAdjacentToCorner(row, col, cornerRow, cornerCol)) {
        penalty += 50; // Apply a penalty if the move is adjacent to an empty corner
      }
    }
  }

  return penalty;
}

function isAdjacentToCorner(row, col, cornerRow, cornerCol) {
  // Calculate the distance from the move to the corner
  const rowDistance = Math.abs(row - cornerRow);
  const colDistance = Math.abs(col - cornerCol);

  // Adjacency is when it's within 1 cell distance
  if (rowDistance <= 1 && colDistance <= 1) {
    return true;
  }

  return false;
}

function prepareResponse(move) {
  const response = `${JSON.stringify(move)}\n`;
  console.log(`Sending response ${response}`);
  return response;
}

module.exports = {getMove, prepareResponse};
