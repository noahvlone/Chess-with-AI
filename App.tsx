
import React, { useState, useEffect, useMemo, useCallback } from 'react';
// Import the Chess class for game logic, and Move type for type safety.
import { Chess, type Move } from 'chess.js';
import { Square, BoardPiece } from './types';
import { getGeminiMove } from './services/geminiService';
import Board from './components/Board';

const App: React.FC = () => {
  // The Chess class is now imported and can be instantiated directly.
  const game = useMemo<Chess>(() => new Chess(), []);
  const [board, setBoard] = useState<(BoardPiece | null)[][]>(game.board());
  const [status, setStatus] = useState<string>("Your turn (White)");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [draggedPiece, setDraggedPiece] = useState<BoardPiece | null>(null);
  const [highlightedSquares, setHighlightedSquares] = useState<Square[]>([]);
  const [lastMove, setLastMove] = useState<Move | null>(null);

  const updateBoard = useCallback((move: Move | null = null) => {
    setBoard(game.board());
    if (move) {
      setLastMove(move);
    }
    updateStatus();
  }, [game]);

  const updateStatus = useCallback(() => {
    let newStatus = '';
    const turn = game.turn() === 'w' ? 'White' : 'Black';

    // FIX: Replaced deprecated `in_checkmate()` with `isCheckmate()`
    if (game.isCheckmate()) {
      newStatus = `Checkmate! ${turn === 'White' ? 'Black' : 'White'} wins.`;
    // FIX: Replaced deprecated `in_draw()` with `isDraw()`
    } else if (game.isDraw()) {
      newStatus = 'Draw!';
    } else {
      newStatus = `Your turn (White)`;
      if (game.turn() === 'b') {
        newStatus = `Gemini's turn (Black)`;
      }
      // FIX: Replaced deprecated `in_check()` with `inCheck()`
      if (game.inCheck()) {
        newStatus += ' - Check!';
      }
    }
    setStatus(newStatus);
  }, [game]);

  const handleAiMove = useCallback(async () => {
    // FIX: Replaced deprecated `game_over()` with `isGameOver()`
    if (!game.isGameOver() && game.turn() === 'b') {
      setIsAiThinking(true);
      setStatus("Gemini is thinking...");
      const moveSAN = await getGeminiMove(game.fen(), 'black');
      let moveResult: Move | null = null;
      if (moveSAN) {
        // FIX: Removed invalid `sloppy` option from `game.move()`
        moveResult = game.move(moveSAN);
      }

      if (!moveResult) {
        // Fallback for API error or invalid move
        console.warn("Gemini's move was invalid or API failed. Making a random move.");
        const moves = game.moves({verbose: true});
        const randomMove = moves[Math.floor(Math.random() * moves.length)];
        moveResult = game.move(randomMove.san);
      }
      
      updateBoard(moveResult);
      setIsAiThinking(false);
    }
  }, [game, updateBoard]);

  useEffect(() => {
    updateStatus();
    // FIX: Replaced deprecated `game_over()` with `isGameOver()`
    if (game.turn() === 'b' && !isAiThinking && !game.isGameOver()) {
      const timer = setTimeout(() => {
        handleAiMove();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [board, game, handleAiMove, isAiThinking, updateStatus]);
  
  const onDragStart = (e: React.DragEvent<HTMLDivElement>, piece: BoardPiece) => {
    // FIX: Replaced deprecated `game_over()` with `isGameOver()`
    if (game.turn() !== piece.color || isAiThinking || game.isGameOver()) {
      e.preventDefault();
      return;
    }
    setDraggedPiece(piece);
    const possibleMoves = game.moves({ square: piece.square, verbose: true });
    setHighlightedSquares(possibleMoves.map((move: Move) => move.to));
  };
  
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, toSquare: Square) => {
    e.preventDefault();
    setHighlightedSquares([]);
    if (!draggedPiece) return;

    const move = game.move({
      from: draggedPiece.square,
      to: toSquare,
      promotion: 'q', // auto-promote to queen for simplicity
    });

    if (move) {
      updateBoard(move);
    }
    
    setDraggedPiece(null);
  };
  
  const handleNewGame = () => {
    game.reset();
    setLastMove(null);
    setIsAiThinking(false);
    updateBoard();
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gray-800 font-sans">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-white mb-1">Gemini Chess</h1>
        <p className="text-lg text-gray-300">Play against a powerful AI opponent</p>
      </div>
      
      <Board
        board={board}
        highlightedSquares={highlightedSquares}
        lastMove={lastMove}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />

      <div className="mt-4 text-center p-4 rounded-lg bg-gray-700 shadow-lg min-w-[300px] w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white h-8 flex items-center justify-center">
          {isAiThinking ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{status}</span>
            </div>
          ) : (
            <span>{status}</span>
          )}
        </h2>
      </div>

      <button
        onClick={handleNewGame}
        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200"
      >
        New Game
      </button>
    </main>
  );
};

export default App;
